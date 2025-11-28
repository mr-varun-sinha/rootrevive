
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import AddressForm from './AddressForm';
import { supabase } from '@/lib/supabase';

export interface Address {
  id: string;
  user_id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

const AddressBook = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchAddresses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Map DB columns to frontend interface if needed, or just use the interface matching DB
        // The DB has postal_code and is_default. The interface above matches this.
        // However, the AddressForm might expect camelCase. Let's check AddressForm later.
        // For now, assuming AddressForm can handle the data or we map it.
        // Actually, let's map it to be safe and consistent with the previous mock data structure if AddressForm relies on it.
        // Previous mock: postalCode, isDefault.
        // DB: postal_code, is_default.
        // Let's stick to the DB structure for the state to avoid constant mapping, 
        // BUT we might need to update AddressForm.
        // Let's check AddressForm content first? 
        // No, I'll update this component to handle the mapping to/from DB.

        const mappedAddresses = data.map(addr => ({
          ...addr,
          postalCode: addr.postal_code,
          isDefault: addr.is_default
        }));
        setAddresses(mappedAddresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        title: "Error",
        description: "Failed to load addresses.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (newAddressData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // If this is the first address, make it default
      const isFirst = addresses.length === 0;
      const isDefault = isFirst || newAddressData.isDefault;

      // If setting as default, unset others first (optimistic update or sequential)
      if (isDefault && addresses.length > 0) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert([
          {
            user_id: user.id,
            name: newAddressData.name,
            address: newAddressData.address,
            city: newAddressData.city,
            state: newAddressData.state,
            postal_code: newAddressData.postalCode,
            country: newAddressData.country,
            phone: newAddressData.phone,
            is_default: isDefault
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      });

      setIsAddDialogOpen(false);
      fetchAddresses(); // Refresh list
    } catch (error) {
      console.error('Error adding address:', error);
      toast({
        title: "Error",
        description: "Failed to add address.",
        variant: "destructive",
      });
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAddress = async (updatedAddressData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // If setting as default, unset others
      if (updatedAddressData.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .neq('id', updatedAddressData.id);
      }

      const { error } = await supabase
        .from('addresses')
        .update({
          name: updatedAddressData.name,
          address: updatedAddressData.address,
          city: updatedAddressData.city,
          state: updatedAddressData.state,
          postal_code: updatedAddressData.postalCode,
          country: updatedAddressData.country,
          phone: updatedAddressData.phone,
          is_default: updatedAddressData.isDefault
        })
        .eq('id', updatedAddressData.id);

      if (error) throw error;

      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });

      setIsEditDialogOpen(false);
      fetchAddresses();
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error",
        description: "Failed to update address.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Address deleted",
        description: "The address has been removed.",
      });

      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Error",
        description: "Failed to delete address.",
        variant: "destructive",
      });
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Unset all
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);

      // Set new default
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Default address updated",
        description: "Your default address has been updated.",
      });

      fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
      toast({
        title: "Error",
        description: "Failed to update default address.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Address Book</h2>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-xl border-border/50 bg-background/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm onSubmit={handleAddAddress} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${address.isDefault ? 'bg-primary' : 'bg-transparent'}`} />
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="font-bold text-lg">{address.name}</div>
                  {address.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wider border border-primary/20">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground space-y-1.5 mb-6 text-sm leading-relaxed">
                  <p>{address.address}</p>
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  <p>{address.country}</p>
                  <p className="pt-2 flex items-center gap-2 text-foreground/80">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Phone:</span>
                    {address.phone}
                  </p>
                </div>
                <div className="flex space-x-2 pt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full hover:bg-primary/10 hover:text-primary"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 ml-auto rounded-full hover:bg-primary/10 hover:text-primary"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-6">You haven't added any addresses yet.</p>
            <Button
              className="rounded-full shadow-lg hover:shadow-primary/25 transition-all"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add your first address
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md rounded-xl border-border/50 bg-background/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          {editingAddress && (
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleUpdateAddress}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressBook;
