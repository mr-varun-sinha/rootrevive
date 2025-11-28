
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import BreadcrumbNav from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const product = products.find(p => p.id === productId);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);
  
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Product not found</h2>
            <Link to="/shop" className="text-brand-gold hover:underline">
              Return to shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop?category=${encodeURIComponent(product.category.toLowerCase())}` },
    { label: product.name }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="bg-white rounded-md overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-medium">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.onSale ? (
                <>
                  <span className="text-2xl font-medium text-red-500">${product.salePrice?.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-700">
              A premium {product.category.toLowerCase()} specially formulated to address various hair and scalp needs. 
              Our advanced formula is enriched with essential nutrients and natural ingredients to improve 
              hair health and maintain a balanced scalp environment.
            </p>
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus size={16} />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              className="bg-brand-gold text-brand-dark hover:bg-opacity-90 w-full md:w-auto"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>
            
            {/* Product Details */}
            <div className="pt-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="ingredients">
                  <AccordionTrigger>Ingredients</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, 
                      Panthenol, Sodium Chloride, Citric Acid, Sodium Benzoate, 
                      Potassium Sorbate, Parfum.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-use">
                  <AccordionTrigger>How to Use</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Apply to wet hair, massage gently into scalp and hair, and rinse thoroughly. 
                      For best results, use 2-3 times per week.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Free shipping on orders over $50. Returns accepted within 30 days of purchase.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-16">
          <h2 className="section-title">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="section-title">Customer Reviews</h2>
          
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-md shadow-sm">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-gray-500 text-sm">Verified Purchase</div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-4 h-4 ${j < 5 - i ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  This product worked wonders for my dry scalp issues. I've been using it for about a month, 
                  and the flakiness has significantly reduced. Would definitely recommend!
                </p>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">Load More Reviews</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
