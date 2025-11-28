
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  RotateCcw, 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  AlertCircle,
  Clock,
  PackageOpen
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const ReturnsExchanges = () => {
  const faqItems = [
    {
      question: "How do I start a return?",
      answer: "Log into your account, go to your order history, and select the order you wish to return. Click the 'Return Items' button and follow the instructions. Alternatively, you can contact our customer service team for assistance."
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer: "Yes! During the return process, you'll have the option to select 'Exchange' instead of 'Return'. You can then select the replacement item you'd like to receive."
    },
    {
      question: "Do I have to pay for return shipping?",
      answer: "For returns due to our error (wrong item, defective product, etc.), return shipping is free. For preference-based returns, a flat fee of $5.99 will be deducted from your refund to cover return shipping costs. This fee is waived for VIP members."
    },
    {
      question: "How long will it take to process my refund?",
      answer: "Once we receive your return, it typically takes 3-5 business days to process. After processing, it may take an additional 3-5 business days for the refund to appear on your original payment method."
    },
    {
      question: "Can I return a gift?",
      answer: "Yes, gifts can be returned within 60 days of purchase. You'll need the order number from the gift receipt. Refunds for gifts will be issued as store credit to the gift recipient."
    }
  ];

  const returnSteps = [
    "Start your return through your account or by contacting customer service",
    "Print the prepaid return shipping label",
    "Package the item securely with all original packaging",
    "Drop off the package at any authorized shipping location",
    "Once received and inspected, your refund will be processed within 3-5 business days"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center border-b pb-6">
            <RotateCcw className="mx-auto h-12 w-12 text-brand-gold mb-2" />
            <CardTitle className="text-3xl">Returns & Exchanges</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-brand-gold/20 p-2 mr-3">
                    <RotateCcw className="h-5 w-5 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-medium">Returns</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Return any unused product within 30 days for a full refund.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>30-Day Satisfaction Guarantee</span>
                </div>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-brand-gold/20 p-2 mr-3">
                    <ArrowLeftRight className="h-5 w-5 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-medium">Exchanges</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Exchange any product for another of equal or lesser value.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <PackageOpen className="h-4 w-4 mr-1" />
                  <span>Easy product exchanges</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-medium flex items-center mb-3">
              <CheckCircle2 className="h-5 w-5 mr-2 text-brand-gold" /> 
              Return Policy
            </h2>
            <p>
              At RootRevive, we stand behind the quality of our products. If you're not completely satisfied with your purchase, we offer a simple returns and exchanges process.
            </p>
            
            <div className="mt-4 space-y-3">
              <div className="flex gap-2 items-start">
                <Checkbox id="unused" className="mt-1" />
                <div>
                  <label htmlFor="unused" className="font-medium cursor-pointer">Unused/Unopened Products</label>
                  <p className="text-sm text-muted-foreground">
                    Return any unused and unopened product within 30 days of delivery for a full refund of the purchase price (excluding shipping costs).
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <Checkbox id="used" className="mt-1" />
                <div>
                  <label htmlFor="used" className="font-medium cursor-pointer">Used/Opened Products</label>
                  <p className="text-sm text-muted-foreground">
                    If you've tried one of our products and are not satisfied with the results, you may return it within 30 days, even if it's partially used. Used/opened products are eligible for a refund of up to 80% of the purchase price, depending on how much product has been used.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-medium flex items-center mb-3 mt-6">
              <ArrowLeftRight className="h-5 w-5 mr-2 text-brand-gold" /> 
              Exchange Policy
            </h2>
            <p>
              Prefer to exchange instead of return? No problem! You can exchange any product for another of equal or lesser value within 30 days of delivery. If you choose a more expensive product, you'll simply pay the difference.
            </p>
            
            <h2 className="text-xl font-medium flex items-center mb-3 mt-6">
              <AlertCircle className="h-5 w-5 mr-2 text-brand-gold" /> 
              Return Process
            </h2>
            <div className="space-y-3 mb-6">
              {returnSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-brand-gold/20 h-6 w-6 flex-shrink-0 mr-3 mt-0.5">
                    <span className="text-xs font-medium text-brand-gold">{index + 1}</span>
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-xl font-medium flex items-center mb-3">
              <XCircle className="h-5 w-5 mr-2 text-brand-gold" /> 
              Non-Returnable Items
            </h2>
            <p>
              The following items cannot be returned:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-6">
              <li>Gift cards</li>
              <li>Downloadable products</li>
              <li>Personal care items where the hygiene seal has been broken (unless defective)</li>
              <li>Clearance items marked as "Final Sale"</li>
            </ul>
            
            <h2 className="text-xl font-medium flex items-center mb-3">
              <HelpCircle className="h-5 w-5 mr-2 text-brand-gold" /> 
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full mb-8">
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
                <HelpCircle className="h-5 w-5 mr-2 text-brand-gold" />
                Need Help?
              </h3>
              <p>
                If you have any questions about our return policy or need assistance with a return or exchange, please contact our customer service team at <a href="mailto:support@rootrevive.com" className="text-brand-gold hover:underline">support@rootrevive.com</a> or call us at (800) 555-HAIR.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnsExchanges;
