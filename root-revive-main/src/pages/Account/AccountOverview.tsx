
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
        <h2 className="text-xl font-bold mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <ProfilePicture
                  userId={user?.id || ""}
                  url={avatarUrl}
                  onImageUpdated={handleAvatarUpdate}
                  size="md"
                />

                <div>
                  <h3 className="font-bold mb-1">Account Details</h3>
                  <p className="text-muted-foreground text-sm mb-4">{user?.email}</p>
                  <div className="space-y-2 flex flex-col items-start">
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-medium" asChild>
                      <Link to="/account?tab=settings">Edit profile</Link>
                    </Button>
                    <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-medium" asChild>
                      <Link to="/account?tab=settings">Change password</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">Default Shipping Address</h3>
              <p className="text-muted-foreground text-sm mb-4">No shipping address saved yet.</p>
              <div>
                <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-medium" asChild>
                  <Link to="/account?tab=addresses">Add address</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-medium" asChild>
            <Link to="/account?tab=orders">View all orders</Link>
          </Button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Card key={order.id} className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex-1">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Order Number</p>
                        <p className="font-medium font-mono">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Date</p>
                        <p className="font-medium">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Status</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                          order.status === "Processing" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total</p>
                        <p className="font-medium">{order.total}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
              <Button className="rounded-full" asChild>
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
