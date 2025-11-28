
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
        <h2 className="text-xl font-medium">Address Book</h2>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-none border-border">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm onSubmit={handleAddAddress} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className="border border-border shadow-none rounded-none">
              <CardContent className="p-6">
                <div className="flex justify-between mb-3">
                  <div className="font-medium">{address.name}</div>
                  {address.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-none font-medium uppercase tracking-wider">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground space-y-1 mb-4 text-sm">
                  <p>{address.address}</p>
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  <p>{address.country}</p>
                  <p className="pt-1">{address.phone}</p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none h-8"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none h-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-primary h-8"
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
        <Card className="border border-border shadow-none rounded-none">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't added any addresses yet.</p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add your first address
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md rounded-none border-border">
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
