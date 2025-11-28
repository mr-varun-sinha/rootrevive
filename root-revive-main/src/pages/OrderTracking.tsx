
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Package2, 
  Search, 
  CheckCircle2, 
  Truck, 
  ShoppingBag,
  AlarmClock 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

interface OrderStatus {
  status: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

interface TrackingResult {
  orderNumber: string;
  email: string;
  orderDate: string;
  estimatedDelivery: string;
  status: string;
  items: { name: string; quantity: number }[];
  trackingStatus: OrderStatus[];
}

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        setEmail(data.session.user.email || "");
      }
    };
    
    checkAuth();
  }, []);

  const mockTrackingData = (orderNum: string, userEmail: string): TrackingResult => {
    // Mock tracking statuses with timestamps and descriptions
    const statuses: OrderStatus[] = [
      {
        status: "Order Placed",
        date: "April 5, 2025, 10:23 AM",
        description: "Your order has been received and is being processed",
        icon: <ShoppingBag className="h-8 w-8 text-green-500" />
      },
      {
        status: "Processing",
        date: "April 5, 2025, 2:45 PM",
        description: "Your order is being prepared for shipping",
        icon: <AlarmClock className="h-8 w-8 text-blue-500" />
      },
      {
        status: "Shipped",
        date: "April 6, 2025, 9:30 AM",
        description: "Your order has been shipped and is on its way",
        icon: <Truck className="h-8 w-8 text-purple-500" />
      },
      {
        status: "Out for Delivery",
        date: "April 7, 2025, 8:15 AM",
        description: "Your order is out for delivery today",
        icon: <Truck className="h-8 w-8 text-orange-500" />
      },
      {
        status: "Delivered",
        date: "April 7, 2025, 2:30 PM",
        description: "Your order has been delivered successfully",
        icon: <CheckCircle2 className="h-8 w-8 text-green-500" />
      }
    ];

    // For demonstration, show different statuses based on the order number
    const lastDigit = parseInt(orderNum.slice(-1));
    const activeStatusCount = Math.min(Math.max(lastDigit % 6, 1), 5);
    
    return {
      orderNumber: orderNum,
      email: userEmail,
      orderDate: "April 5, 2025",
      estimatedDelivery: "April 7, 2025",
      status: statuses[activeStatusCount - 1].status,
      items: [
        { name: "Revitalizing Hair Serum", quantity: 1 },
        { name: "Daily Moisturizing Shampoo", quantity: 2 }
      ],
      trackingStatus: statuses.slice(0, activeStatusCount)
    };
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Simple validation
      if (orderNumber.length < 5) {
        setError("Please enter a valid order number");
        setTrackingResult(null);
        setIsSearching(false);
        return;
      }
      
      // In a real app, we would fetch this data from the database
      const result = mockTrackingData(orderNumber, email);
      setTrackingResult(result);
      setIsSearching(false);
      
      toast({
        title: "Order found",
        description: `Tracking information for order ${orderNumber} has been loaded.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <Package2 className="mx-auto h-12 w-12 text-brand-gold mb-2" />
            <CardTitle className="text-3xl">Order Tracking</CardTitle>
            <CardDescription>
              Enter your order details to track your package
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!trackingResult ? (
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
                    Order Number
                  </label>
                  <Input 
                    id="orderNumber"
                    placeholder="e.g. RR-12345678"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Enter the email used for your order"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoggedIn}
                  />
                  {isLoggedIn && (
                    <p className="text-xs text-gray-500 mt-1">Using your account email address</p>
                  )}
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-gold text-brand-dark hover:bg-opacity-90"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>Searching...</>
                  ) : (
                    <>
                      <Search size={18} className="mr-2" />
                      Track Order
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>
                    Don't have your order number? <Link to="/account" className="text-brand-gold hover:underline">Check your order history</Link>
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Order #{trackingResult.orderNumber}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTrackingResult(null)}
                  >
                    Track another order
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{trackingResult.orderDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-medium">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Items in this order</h4>
                  <ul className="space-y-2">
                    {trackingResult.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">Tracking Status</h4>
                  <div className="relative">
                    {/* Vertical line connecting status icons */}
                    <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-200 z-0"></div>
                    
                    <div className="space-y-8 relative z-10">
                      {trackingResult.trackingStatus.map((status, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0">
                            {status.icon}
                          </div>
                          <div className="ml-4">
                            <h5 className="font-medium">{status.status}</h5>
                            <p className="text-sm text-gray-500">{status.date}</p>
                            <p className="text-sm">{status.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Link to="/contact">
                    <Button variant="link" className="text-brand-gold">
                      Need help with your order?
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
