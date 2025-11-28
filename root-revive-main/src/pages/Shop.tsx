
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import BreadcrumbNav from '@/components/BreadCrumb';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(() => {
    if (categoryParam) {
      return products.filter(p => 
        p.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    return products;
  });
  
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase())?.name || ''] : []
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const applyFilters = () => {
    let result = [...products];
    
    // Apply search query filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const price = product.onSale ? (product.salePrice || 0) : product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    setFilteredProducts(result);
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 100]);
    setSearchQuery('');
    setSelectedCategories([]);
    setFilteredProducts(products);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Determine breadcrumbs based on selected category
  const breadcrumbItems = selectedCategories.length === 1 
    ? [{ label: 'Shop', href: '/shop' }, { label: selectedCategories[0] }]
    : [{ label: 'Shop' }];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-brand-dark text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-medium">
            {selectedCategories.length === 1 ? selectedCategories[0] : 'Shop All Products'}
          </h1>
          <p className="text-gray-300 mt-2">Find the perfect solution for your hair and scalp needs.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        {/* Search and Filter Controls - Mobile */}
        {isMobile && (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-grow">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Button
                variant="outline"
                className="flex-shrink-0"
                onClick={toggleFilters}
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </Button>
            </div>
            
            {isFilterOpen && (
              <div className="bg-white p-4 rounded-md shadow-md mb-4 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={toggleFilters}>
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryChange(category.name)}
                        />
                        <label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          {!isMobile && (
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-20">
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <h3 className="font-medium text-lg mb-6">Filters</h3>
                  
                  <div className="mb-6">
                    <div className="relative">
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => handleCategoryChange(category.name)}
                          />
                          <label htmlFor={`category-${category.id}`} className="text-sm">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
                    <Button variant="outline" onClick={resetFilters} className="w-full">Reset Filters</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-md shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
