
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProfilePicture from "@/components/ProfilePicture";
import { supabase } from "@/lib/supabase";

import { User } from '@supabase/supabase-js';

interface AccountOverviewProps {
  user: User & { [key: string]: unknown };
}

const AccountOverview = ({ user }: AccountOverviewProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // Fetch profile data including avatar_url
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.id) {
        console.log("Fetching profile data for user:", user.id);

        try {
          // First, check if avatar_url exists in user metadata
          const avatarFromMeta = user?.user_metadata?.avatar_url || "";
          if (avatarFromMeta) {
            console.log("Found avatar in user metadata:", avatarFromMeta);
            setAvatarUrl(avatarFromMeta);
            return; // Return early if we have an avatar from metadata
          }

          // Then check profiles table
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
          } else if (data?.avatar_url) {
            console.log("Found avatar in profiles table:", data.avatar_url);
            setAvatarUrl(data.avatar_url);
          }
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
    };

    fetchProfileData();
  }, [user?.id, user?.user_metadata]);

  // Update avatar URL when it changes
  const handleAvatarUpdate = (url: string) => {
    console.log("Avatar updated:", url);
    setAvatarUrl(url);
  };

  // Mock data
  const recentOrders = [
    {
      id: "ORD-12345",
      date: "April 5, 2025",
      status: "Delivered",
      total: "$89.97",
    },
    {
      id: "ORD-12344",
      date: "March 28, 2025",
      status: "Processing",
      total: "$125.50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <ProfilePicture
                  userId={user?.id || ""}
                  url={avatarUrl}
                  onImageUpdated={handleAvatarUpdate}
                  size="md"
                />

                <div>
                  <h3 className="font-medium mb-3">Account Details</h3>
                  <p className="text-gray-600 mb-1">{user?.email}</p>
                  <div className="mt-4 space-y-2">
                    <Button variant="link" className="text-brand-gold hover:text-brand-gold/80 p-0 h-auto" asChild>
                      <Link to="/account?tab=settings">Edit profile</Link>
                    </Button>
                    <br />
                    <Button variant="link" className="text-brand-gold hover:text-brand-gold/80 p-0 h-auto" asChild>
                      <Link to="/account?tab=settings">Change password</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Default Shipping Address</h3>
              <p className="text-gray-600">No shipping address saved yet.</p>
              <div className="mt-4">
                <Button variant="link" className="text-brand-gold hover:text-brand-gold/80 p-0 h-auto" asChild>
                  <Link to="/account?tab=addresses">Add address</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Recent Orders</h2>
          <Button variant="link" className="text-brand-gold hover:text-brand-gold/80 p-0 h-auto" asChild>
            <Link to="/account?tab=orders">View all orders</Link>
          </Button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 md:mb-0">
                      <div>
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p>{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p>{order.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p>{order.total}</p>
                      </div>
                    </div>
                    <Button variant="link" className="text-brand-gold hover:text-brand-gold/80 p-0 h-auto">
                      View order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
              <Button variant="link" className="text-brand-gold hover:text-brand-gold/80" asChild>
                <Link to="/shop">Start shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AccountOverview;
