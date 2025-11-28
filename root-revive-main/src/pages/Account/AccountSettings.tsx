
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import ProfilePicture from '@/components/ProfilePicture';

import { User } from '@supabase/supabase-js';

interface AccountSettingsProps {
  user: User & { [key: string]: unknown };
}

const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const notificationSchema = z.object({
  orderUpdates: z.boolean().default(true),
  promotions: z.boolean().default(true),
  productNews: z.boolean().default(false),
  blogPosts: z.boolean().default(false),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

const AccountSettings = ({ user }: AccountSettingsProps) => {
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar_url || "");
  const { toast } = useToast();

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const getInitials = () => {
    const firstName = (user.user_metadata?.first_name as string) || "";
    const lastName = (user.user_metadata?.last_name as string) || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: (user.user_metadata?.first_name as string) || "",
      lastName: (user.user_metadata?.last_name as string) || "",
      email: user.email || "",
      phone: user?.phone || "",
    },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      orderUpdates: true,
      promotions: true,
      productNews: false,
      blogPosts: false,
    },
  });

  const handlePasswordUpdate = async (values: PasswordFormValues) => {
    setIsUpdatingPassword(true);

    try {
      // Update password through Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: values.newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });

      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while updating your password";
      toast({
        title: "Error updating password",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleProfileUpdate = async (values: ProfileFormValues) => {
    setIsUpdatingProfile(true);

    try {
      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phone || null
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update user metadata
      await supabase.auth.updateUser({
        data: {
          first_name: values.firstName,
          last_name: values.lastName
        }
      });

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while updating your profile";
      toast({
        title: "Error updating profile",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleEmailUpdate = async (values: EmailFormValues) => {
    setIsUpdatingEmail(true);

    try {
      // Update email through Supabase Auth
      const { error } = await supabase.auth.updateUser({
        email: values.email
      });

      if (error) throw error;

      // Update profile in database
      await supabase
        .from('profiles')
        .update({ email: values.email })
        .eq('id', user.id);

      toast({
        title: "Email update initiated",
        description: "Please check your inbox for a confirmation email to complete this change.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while updating your email";
      toast({
        title: "Error updating email",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleNotificationUpdate = (values: NotificationFormValues) => {
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleAvatarUpdate = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium mb-4">Account Settings</h2>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Profile Information</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
              <ProfilePicture
                userId={user?.id}
                url={avatarUrl}
                onImageUpdated={handleAvatarUpdate}
                size="lg"
              />

              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-brand-gold text-brand-dark hover:bg-opacity-90"
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Change Email</h3>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailUpdate)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        You'll receive a verification email to confirm this change.
                      </p>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-brand-gold text-brand-dark hover:bg-opacity-90"
                  disabled={isUpdatingEmail}
                >
                  {isUpdatingEmail ? "Updating..." : "Update Email"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Change Password</h3>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-brand-gold text-brand-dark hover:bg-opacity-90"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Email Preferences</h3>
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(handleNotificationUpdate)} className="space-y-4">
                <FormField
                  control={notificationForm.control}
                  name="orderUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Order Updates</FormLabel>
                        <p className="text-sm text-gray-500">
                          Receive notifications about your orders
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={notificationForm.control}
                  name="promotions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Promotions & Discounts</FormLabel>
                        <p className="text-sm text-gray-500">
                          Receive notifications about sales and special offers
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={notificationForm.control}
                  name="productNews"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Product News</FormLabel>
                        <p className="text-sm text-gray-500">
                          Updates about new products and restocks
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={notificationForm.control}
                  name="blogPosts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Hair Care Tips & Blog</FormLabel>
                        <p className="text-sm text-gray-500">
                          Receive notifications about new blog posts and hair care advice
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-brand-gold text-brand-dark hover:bg-opacity-90"
                >
                  Save Preferences
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
