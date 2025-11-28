
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: April 7, 2025</p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using our website, making a purchase, or using any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">2. Products and Services</h2>
            <p className="mb-4">
              RootRevive offers a range of hair and scalp care products and services, including personalized hair analysis technology. We reserve the right to modify, discontinue, or update our products and services at any time.
            </p>
            <p className="mb-4">
              Our hair analysis results and product recommendations are based on the information you provide and our proprietary algorithms. While we strive for accuracy, we cannot guarantee specific results from using our products or services.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">3. Purchases and Payment</h2>
            <p className="mb-4">
              All prices are listed in USD unless otherwise specified and are subject to change without notice. We accept major credit cards and other payment methods as indicated during checkout.
            </p>
            <p className="mb-4">
              By making a purchase, you represent that you are authorized to use the payment method provided. We reserve the right to refuse or cancel orders at our discretion, including if we suspect fraudulent activity.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">4. Shipping and Returns</h2>
            <p className="mb-4">
              Please review our <Link to="/shipping" className="text-brand-gold hover:underline">Shipping Policy</Link> and <Link to="/returns" className="text-brand-gold hover:underline">Returns & Exchanges Policy</Link> for detailed information on shipping methods, delivery times, and return procedures.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">5. User Accounts</h2>
            <p className="mb-4">
              When you create an account, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
            <p className="mb-4">
              We reserve the right to terminate accounts, remove content, or cancel transactions if we believe you have violated these terms or engaged in fraudulent or illegal activities.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              All content on our website, including text, graphics, logos, images, product designs, and software, is the property of RootRevive and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from our website without our express written permission.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">7. User Content</h2>
            <p className="mb-4">
              By submitting reviews, comments, or other content to our website, you grant us a non-exclusive, royalty-free, perpetual, irrevocable right to use, reproduce, modify, adapt, publish, translate, and distribute such content.
            </p>
            <p className="mb-4">
              You represent that you own or have the necessary permissions to use and authorize us to use your content.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, RootRevive shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products, services, or website.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">9. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless RootRevive, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of our website or violation of these terms.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">10. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed by and construed in accordance with the laws of the state of [State], without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">11. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. The updated version will be effective as soon as it is posted on our website.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mb-4">
              Email: legal@rootrevive.com<br />
              Address: 123 Hair Care Lane, Suite 100, Beauty City, BC 12345<br />
              Phone: (555) 123-4567
            </p>
            <p className="mb-4">
              Or visit our <Link to="/contact" className="text-brand-gold hover:underline">Contact Us</Link> page.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
