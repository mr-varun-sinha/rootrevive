
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const faqItems = [
    {
      question: "How often should I wash my hair?",
      answer: "It depends on your hair type and lifestyle. Generally, washing 2-3 times a week is recommended for most hair types. Oily hair may need more frequent washing, while dry or curly hair may benefit from less frequent washing to retain natural oils."
    },
    {
      question: "What products are best for damaged hair?",
      answer: "For damaged hair, look for products with repairing ingredients like keratin, biotin, argan oil, or protein treatments. Our RootRevive Repair series is specifically formulated with these ingredients to strengthen and restore damaged hair."
    },
    {
      question: "How does the hair analysis technology work?",
      answer: "Our machine learning technology analyzes photos of your hair and scalp to identify specific concerns like dryness, damage, dandruff, or thinning. Based on the analysis, we recommend personalized products and routines tailored to your unique hair needs."
    },
    {
      question: "Are your products sulfate and paraben-free?",
      answer: "Yes, all RootRevive products are formulated without harsh sulfates, parabens, silicones, and artificial colors. We believe in clean, effective haircare that's gentle on your hair and the environment."
    },
    {
      question: "How long will it take to see results?",
      answer: "Most customers notice improvements within 2-3 weeks of consistent use. However, more significant results typically become apparent after 4-6 weeks as hair completes its growth cycle. For optimal results, follow the complete routine recommended by our analysis tool."
    },
    {
      question: "Can I use RootRevive products on color-treated hair?",
      answer: "Absolutely! Our products are specifically formulated to be safe for color-treated hair. In fact, many of our formulations contain ingredients that help preserve color vibrancy and prevent fading."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return the products for a full refund within 30 days of purchase. Please see our Returns & Exchanges page for more details."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website and viewing your order history."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl mb-2">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-lg">
              Find answers to common questions about our products and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
