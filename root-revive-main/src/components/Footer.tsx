
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-12 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold tracking-tighter uppercase mb-4">Root<span className="text-primary">Revive</span></h3>
            <p className="text-muted-foreground mb-4 font-light">
              Advanced hair and scalp care products backed by machine learning analysis.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-transparent">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-transparent">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-transparent">
                <Twitter size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=Shampoo" className="text-muted-foreground hover:text-primary transition-colors">Shampoos</Link></li>
              <li><Link to="/shop?category=Conditioner" className="text-muted-foreground hover:text-primary transition-colors">Conditioners</Link></li>
              <li><Link to="/shop?category=Treatment" className="text-muted-foreground hover:text-primary transition-colors">Treatments</Link></li>
              <li><Link to="/shop?category=Oil" className="text-muted-foreground hover:text-primary transition-colors">Oils & Serums</Link></li>
              <li><Link to="/shop?category=Tools" className="text-muted-foreground hover:text-primary transition-colors">Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="text-muted-foreground hover:text-primary transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4 font-light">
              Subscribe to get special offers, free giveaways, and hair care tips.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground rounded-none focus-visible:ring-primary"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} RootRevive. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
