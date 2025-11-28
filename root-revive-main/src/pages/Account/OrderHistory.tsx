
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface Order {
  id: string;
  created_at: string;
  status: string;
  items_count: number;
  total: number;
}

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">Order History</h2>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9 rounded-full bg-background/50 border-border/50 focus:bg-background transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <Card className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50 bg-muted/30">
                    <TableHead className="font-semibold uppercase text-xs tracking-wider py-4">Order Number</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider py-4">Date</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider py-4">Status</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider py-4">Items</TableHead>
                    <TableHead className="font-semibold uppercase text-xs tracking-wider py-4">Total</TableHead>
                    <TableHead className="text-right font-semibold uppercase text-xs tracking-wider py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium font-mono py-4">{order.id}</TableCell>
                      <TableCell className="py-4">{format(new Date(order.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.status === "Delivered"
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50"
                          }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">{order.items_count}</TableCell>
                      <TableCell className="font-medium py-4">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right py-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary">
                          <span className="sr-only">View details</span>
                          →
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              {searchQuery
                ? "We couldn't find any orders matching your search criteria."
                : "You haven't placed any orders yet. Start shopping to see your orders here."}
            </p>
            {!searchQuery && (
              <Button className="rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderHistory;
