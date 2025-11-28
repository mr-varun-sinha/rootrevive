
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <div className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
              {user && (
                <p className="text-muted-foreground">Welcome back, {profile?.first_name || user.email}</p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="mt-4 md:mt-0 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1 space-y-2 animate-fade-in [animation-delay:100ms]">
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-2 shadow-sm">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'orders', label: 'Orders', icon: '📦' },
                  { id: 'addresses', label: 'Addresses', icon: '📍' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      navigate(`/account?tab=${item.id}`, { replace: true });
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3 animate-fade-in [animation-delay:200ms]">
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-sm min-h-[500px]">
                {activeTab === 'overview' && <AccountOverview user={combinedUserData} />}
                {activeTab === 'orders' && <OrderHistory />}
                {activeTab === 'addresses' && <AddressBook />}
                {activeTab === 'settings' && <AccountSettings user={combinedUserData} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountPage;
