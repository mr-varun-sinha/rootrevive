
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Truck, Package, Info, Clock, Globe, AlertCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

const ShippingPolicy = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const faqItems = [
    {
      question: "How can I track my package?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account or using our Order Tracking page."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to Canada, UK, Australia, and select European countries. International shipping typically takes 7-14 business days, depending on customs processing times."
    },
    {
      question: "How long does order processing take?",
      answer: "All orders are processed within 1-2 business days (Monday-Friday, excluding holidays). Orders placed after 2:00 PM EST will be processed the following business day."
    },
    {
      question: "Are there any shipping restrictions?",
      answer: "Some products containing certain active ingredients may have shipping restrictions to specific countries due to regulatory requirements. These restrictions will be noted on the product page."
    },
    {
      question: "What if my package arrives damaged?",
      answer: "If your package arrives damaged or is lost during transit, please contact our customer service team within 7 days of the expected delivery date. We'll work with the shipping carrier to resolve the issue promptly."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center border-b pb-6">
            <Truck className="mx-auto h-12 w-12 text-brand-gold mb-2" />
            <CardTitle className="text-3xl">Shipping Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                <Package className="h-8 w-8 text-brand-gold mb-2" />
                <h3 className="text-lg font-medium mb-1">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $50</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-brand-gold mb-2" />
                <h3 className="text-lg font-medium mb-1">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">Ships within 1-2 business days</p>
              </div>
            </div>
            
            <h2 className="text-xl font-medium flex items-center mb-3 mt-6">
              <Truck className="h-5 w-5 mr-2 text-brand-gold" /> 
              Shipping Methods & Timeframes
            </h2>
            <div className="rounded-md border mb-6">
              <div className="px-4 py-3 bg-muted/30 flex justify-between font-medium">
                <span>Shipping Option</span>
                <span>Delivery Time</span>
                <span>Cost</span>
              </div>
              <div className="divide-y">
                <div className="px-4 py-3 flex justify-between">
                  <span>Standard Shipping</span>
                  <span>3-5 business days</span>
                  <span>$5.99 (FREE over $50)</span>
                </div>
                <div className="px-4 py-3 flex justify-between">
                  <span>Express Shipping</span>
                  <span>2-3 business days</span>
                  <span>$9.99</span>
                </div>
                <div className="px-4 py-3 flex justify-between">
                  <span>Priority Shipping</span>
                  <span>1-2 business days</span>
                  <span>$14.99</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-medium flex items-center mb-3">
              <Globe className="h-5 w-5 mr-2 text-brand-gold" /> 
              International Shipping
            </h2>
            <p>
              We currently ship to Canada, UK, Australia, and select European countries. International shipping typically takes 7-14 business days, depending on customs processing times.
            </p>
            <p>
              International shipping rates are calculated at checkout based on destination and package weight.
            </p>
            
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-brand-gold" /> 
                  Important Shipping Information
                </h2>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-brand-gold">
                    {isOpen ? "Show Less" : "Read More"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="border rounded-md p-4 bg-muted/30">
                  <h3 className="font-medium mb-2">Order Processing</h3>
                  <p className="mb-4">
                    All orders are processed within 1-2 business days (Monday-Friday, excluding holidays). Orders placed after 2:00 PM EST will be processed the following business day.
                  </p>
                  
                  <h3 className="font-medium mb-2">Tracking Your Order</h3>
                  <p className="mb-4">
                    Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account or using our <a href="/orders" className="text-brand-gold hover:underline">Order Tracking</a> page.
                  </p>
                  
                  <h3 className="font-medium mb-2">Shipping Restrictions</h3>
                  <p>
                    Some products containing certain active ingredients may have shipping restrictions to specific countries due to regulatory requirements. These restrictions will be noted on the product page.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <h2 className="text-xl font-medium flex items-center mb-3">
              <Info className="h-5 w-5 mr-2 text-brand-gold" /> 
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="bg-brand-gold/10 p-4 rounded-md mt-8 border border-brand-gold/20">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-brand-gold" />
                Need Help?
              </h3>
              <p>
                If you have any questions about our shipping policy or the status of your order, please don't hesitate to <a href="/contact" className="text-brand-gold hover:underline">contact us</a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
