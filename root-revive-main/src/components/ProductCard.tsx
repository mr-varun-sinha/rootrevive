
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  onSale?: boolean;
  salePrice?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="product-card group border border-border bg-card hover:border-primary transition-colors duration-200">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden border-b border-border">
          <img
            src={product.image}
            alt={product.name}
            className="product-image transition-transform duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1">
              SALE
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{product.category}</div>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">{product.name}</h3>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2 font-mono">
              {product.onSale ? (
                <>
                  <span className="font-bold text-destructive">${product.salePrice?.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            <Button
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity rounded-none"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
