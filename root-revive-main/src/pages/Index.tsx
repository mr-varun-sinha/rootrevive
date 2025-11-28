
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  const testimonials = [
    {
      id: 1,
      content: "The hair analysis was spot on! I've struggled with dandruff for years, and the recommended shampoo has finally given me relief.",
      name: "Sarah J."
    },
    {
      id: 2,
      content: "My curls have never looked better. The personalized routine has completely transformed my hair texture and reduced frizz significantly.",
      name: "Michael T."
    },
    {
      id: 3,
      content: "After years of hair loss concerns, the hair growth serum recommended by Root Revive's analysis has made a noticeable difference in just 2 months!",
      name: "Priya K."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse-soft"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            New AI Analysis Feature Available
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 animate-fade-in [animation-delay:200ms]">
            Science-Backed <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Hair Intelligence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:400ms]">
            Unlock personalized hair care solutions with our advanced AI analysis.
            Precision formulas tailored to your unique biology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:600ms]">
            <Button
              size="lg"
              className="rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <Link to="/analysis">Start Free Analysis</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-14 px-8 text-lg border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl animate-fade-in [animation-delay:800ms]">
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                alt="Dashboard Preview"
                className="rounded-lg w-full object-cover aspect-[16/9]"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -left-12 top-1/3 hidden lg:block animate-fade-in [animation-delay:1000ms]">
              <div className="bg-card/80 backdrop-blur-md border border-border/50 p-4 rounded-xl shadow-xl max-w-xs text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold">Analysis Complete</div>
                    <div className="text-xs text-muted-foreground">98% Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-12 bottom-1/3 hidden lg:block animate-fade-in [animation-delay:1200ms]">
              <div className="bg-card/80 backdrop-blur-md border border-border/50 p-4 rounded-xl shadow-xl max-w-xs text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    ★
                  </div>
                  <div>
                    <div className="font-bold">Custom Formula</div>
                    <div className="text-xs text-muted-foreground">Ready for shipment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Why Root Revive?</h2>
            <p className="text-lg text-muted-foreground">
              We combine cutting-edge technology with premium ingredients to deliver results you can see and feel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analysis",
                description: "Our proprietary algorithm analyzes 15+ biomarkers to understand your unique hair profile.",
                icon: "🔬"
              },
              {
                title: "Custom Formulations",
                description: "Products mixed fresh specifically for your needs, targeting your specific goals.",
                icon: "✨"
              },
              {
                title: "Progress Tracking",
                description: "Monitor your improvements over time with our digital health dashboard.",
                icon: "📈"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Trending Now</h2>
              <p className="text-muted-foreground">Curated favorites from our community</p>
            </div>
            <Button variant="ghost" className="hidden md:flex gap-2" asChild>
              <Link to="/shop">View All Products &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full rounded-full" asChild>
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-center mb-16">Real Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                <div className="flex space-x-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6 text-white/90">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-xs text-white/50">Verified Buyer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
