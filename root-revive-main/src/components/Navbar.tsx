
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, User as UserIcon, Menu, X, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Session } from '@supabase/supabase-js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoggedIn(!!user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(session?.user || null);
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Hair Analysis', path: '/analysis' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });

      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while logging out.";
      toast({
        title: "Error logging out",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 w-full z-50 sticky top-0 transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 font-sans text-2xl font-bold tracking-tighter text-foreground flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-primary"></div>
            </div>
            ROOT REVIVE
          </Link>

          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary rounded-full">
              <Link to="/search">
                <Search size={20} className="text-foreground" />
              </Link>
            </Button>

            {isLoggedIn ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-transparent rounded-full">
                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground ring-2 ring-background">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 border-border/50 bg-card/95 backdrop-blur-xl rounded-xl shadow-xl">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Account</h4>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="flex justify-between gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1 border-primary/20 hover:bg-primary/5">
                        <Link to="/account">My Account</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleLogout}
                        className="flex items-center gap-1"
                      >
                        <LogOut size={16} />
                        Log out
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary rounded-full">
                <Link to="/auth/login">
                  <UserIcon size={20} className="text-foreground" />
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary rounded-full">
              <Link to="/cart">
                <ShoppingCart size={20} className="text-foreground" />
              </Link>
            </Button>

            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden rounded-full">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-fade-in shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div className="border-t border-border/50 my-2 pt-2">
                  <Link
                    to="/account"
                    className="block px-3 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                  >
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
