
import { useState, useEffect } from 'react';
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Order History</h2>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9 rounded-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <Card className="border border-border shadow-none rounded-none">
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="font-bold uppercase text-xs tracking-wider">Order Number</TableHead>
                  <TableHead className="font-bold uppercase text-xs tracking-wider">Date</TableHead>
                  <TableHead className="font-bold uppercase text-xs tracking-wider">Status</TableHead>
                  <TableHead className="font-bold uppercase text-xs tracking-wider">Items</TableHead>
                  <TableHead className="font-bold uppercase text-xs tracking-wider">Total</TableHead>
                  <TableHead className="text-right font-bold uppercase text-xs tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-muted/20">
                    <TableCell className="font-medium font-mono">{order.id}</TableCell>
                    <TableCell>{format(new Date(order.created_at), 'MMMM d, yyyy')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-none text-xs font-medium uppercase tracking-wide border ${order.status === "Delivered"
                          ? "bg-green-50 text-green-800 border-green-200"
                          : order.status === "Processing"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-yellow-50 text-yellow-800 border-yellow-200"
                        }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.items_count}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" className="text-primary h-auto p-0 font-medium hover:no-underline hover:text-primary/80">
                        View details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border shadow-none rounded-none">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No orders matching your search criteria."
                : "You haven't placed any orders yet."}
            </p>
            {!searchQuery && (
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                Start Shopping
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderHistory;
