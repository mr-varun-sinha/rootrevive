
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

// Mock cart items for demonstration
const initialCartItems = [
  { ...products[0], quantity: 1 },
  { ...products[2], quantity: 2 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const { toast } = useToast();
  
  const updateItemQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const applyPromoCode = () => {
    if (!promoCode) {
      toast({
        title: "No promo code entered",
        description: "Please enter a promo code.",
        variant: "destructive",
      });
      return;
    }
    
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setIsPromoApplied(true);
      toast({
        title: "Promo code applied",
        description: "Your discount has been applied to the order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.onSale && item.salePrice ? item.salePrice : item.price;
    return sum + price * item.quantity;
  }, 0);
  
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-medium mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50">
                  <div className="col-span-6">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium">Subtotal</span>
                  </div>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => {
                    const price = item.onSale && item.salePrice ? item.salePrice : item.price;
                    const subtotal = price * item.quantity;
                    
                    return (
                      <div key={item.id} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Mobile: Product + Remove */}
                          <div className="md:hidden flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <X size={18} />
                            </Button>
                          </div>
                          
                          {/* Product */}
                          <div className="md:col-span-6 flex items-center space-x-4">
                            <Link to={`/product/${item.id}`}>
                              <img 
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                            </Link>
                            <div className="hidden md:block">
                              <Link to={`/product/${item.id}`}>
                                <h3 className="font-medium">{item.name}</h3>
                              </Link>
                              <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="md:col-span-2 text-center">
                            <div className="md:hidden text-sm text-gray-500">Price:</div>
                            {item.onSale && item.salePrice ? (
                              <div>
                                <span className="font-medium text-red-500">${item.salePrice.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            )}
                          </div>
                          
                          {/* Quantity */}
                          <div className="md:col-span-2 flex flex-col items-center">
                            <div className="md:hidden text-sm text-gray-500">Quantity:</div>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <Button 
                                variant="ghost"
                                size="icon"
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="ghost"
                                size="icon"
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Subtotal + Remove */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                            <div>
                              <div className="md:hidden text-sm text-gray-500">Subtotal:</div>
                              <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="hidden md:flex"
                            >
                              <X size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-4">
                <Link 
                  to="/shop" 
                  className="text-brand-gold hover:underline font-medium flex items-center"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isPromoApplied}
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      disabled={isPromoApplied}
                    >
                      Apply
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-green-600 text-sm mt-1">
                      WELCOME10 applied! 10% discount.
                    </p>
                  )}
                  {!isPromoApplied && (
                    <p className="text-gray-500 text-sm mt-1">
                      Try "WELCOME10" for 10% off
                    </p>
                  )}
                </div>
                
                {/* Checkout Button */}
                <Button className="w-full bg-brand-gold text-brand-dark hover:bg-opacity-90" size="lg">
                  Proceed to Checkout
                </Button>
                
                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">We accept</p>
                  <div className="flex justify-center space-x-2">
                    {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                      <div 
                        key={method} 
                        className="bg-gray-100 rounded px-2 py-1 text-xs"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm p-12 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Browse our catalog to find the perfect hair and scalp care products for you.
            </p>
            <Button asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
