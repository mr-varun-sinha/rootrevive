
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import AccountOverview from './AccountOverview';
import OrderHistory from './OrderHistory';
import AddressBook from './AddressBook';
import AccountSettings from './AccountSettings';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

import { User } from '@supabase/supabase-js';
// Define Profile interface locally to match current schema including phone
interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
}

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for tab parameter in URL
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    if (tabParam && ['overview', 'orders', 'addresses', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          throw new Error("Not authenticated");
        }

        // Get user data
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData) {
          throw new Error("Could not fetch user data");
        }

        setUser(userData.user);

        // Get profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();

        if (!profileError && profileData) {
          setProfile(profileData as Profile);
        } else {
          // Create profile if it doesn't exist
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([
              {
                id: userData.user.id,
                email: userData.user.email,
                first_name: userData.user.user_metadata?.first_name || null,
                last_name: userData.user.user_metadata?.last_name || null,
                avatar_url: userData.user.user_metadata?.avatar_url || null
              }
            ])
            .select();

          if (newProfile) {
            setProfile(newProfile[0] as Profile);
          }
        }
      } catch (error) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access your account.",
          variant: "destructive",
        });
        navigate('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [navigate, toast]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });

      navigate('/');
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to log out. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
        </div>
        <Footer />
      </div>
    );
  }

  // Combine user auth data with profile data
  const combinedUserData = {
    ...user,
    ...profile
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif">My Account</h1>
              {user && (
                <p className="text-gray-600">Welcome back, {profile?.first_name || user.email}</p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="mt-4 md:mt-0"
            >
              Sign Out
            </Button>
          </div>

          <Card className="border border-border shadow-none rounded-none">
            <CardContent className="p-0">
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value);
                  // Update URL without reloading the page
                  navigate(`/account?tab=${value}`, { replace: true });
                }}
                className="w-full"
              >
                <div className="border-b border-border">
                  <div className="pl-6">
                    <TabsList className="h-auto p-0 bg-transparent">
                      <TabsTrigger
                        value="overview"
                        className="py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-medium uppercase tracking-wide text-sm"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="orders"
                        className="py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-medium uppercase tracking-wide text-sm"
                      >
                        Orders
                      </TabsTrigger>
                      <TabsTrigger
                        value="addresses"
                        className="py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-medium uppercase tracking-wide text-sm"
                      >
                        Addresses
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="py-3 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent font-medium uppercase tracking-wide text-sm"
                      >
                        Settings
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <div className="p-6">
                  <TabsContent value="overview" className="mt-0 p-0">
                    <AccountOverview user={combinedUserData} />
                  </TabsContent>

                  <TabsContent value="orders" className="mt-0 p-0">
                    <OrderHistory />
                  </TabsContent>

                  <TabsContent value="addresses" className="mt-0 p-0">
                    <AddressBook />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-0 p-0">
                    <AccountSettings user={combinedUserData} />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountPage;
