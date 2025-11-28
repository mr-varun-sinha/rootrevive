
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-8">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] uppercase">
                Science<br />Backed<br /><span className="text-primary">Hair Care</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light tracking-tight">
                Personalized hair and scalp solutions powered by advanced analysis technology. Precision formulas for your unique biology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-lg"
                  asChild
                >
                  <Link to="/shop">START SHOPPING</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none h-14 px-8 text-lg font-bold"
                  asChild
                >
                  <Link to="/analysis">GET ANALYSIS</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Model"
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12 border-b border-border pb-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Selected<br />Products</h2>
            <Link
              to="/shop"
              className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              VIEW ALL &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-background p-6 hover:bg-muted/30 transition-colors">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Promo */}
      <section className="py-0 border-b border-border bg-foreground text-background overflow-hidden">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 md:p-24 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-mono uppercase tracking-widest">Technology</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  AI-POWERED<br />ANALYSIS
                </h2>
              </div>
              <p className="text-xl text-muted-foreground font-light">
                Upload a photo of your hair or scalp and receive instant analysis with personalized product recommendations based on 15+ biomarkers.
              </p>
              <Button
                className="bg-background text-foreground hover:bg-background/90 rounded-none h-14 px-8 text-lg w-fit"
                asChild
              >
                <Link to="/analysis">ANALYZE NOW</Link>
              </Button>
            </div>
            <div className="relative aspect-square md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Hair analysis"
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-16 text-center">Client<br />Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="space-y-6">
                <div className="flex space-x-1 text-primary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-2xl font-serif italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-mono uppercase tracking-widest text-sm text-muted-foreground">{testimonial.name}</p>
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
