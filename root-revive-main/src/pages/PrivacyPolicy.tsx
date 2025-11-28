
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: April 7, 2025</p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              At RootRevive, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, including our hair analysis technology.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
            <p className="mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Create an account</li>
              <li>Place an order</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our customer service</li>
              <li>Complete surveys or questionnaires</li>
              <li>Participate in our hair analysis service</li>
            </ul>
            <p className="mb-4">
              This information may include your name, email address, mailing address, phone number, payment information, and hair and scalp data if you use our analysis service.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Time spent on pages</li>
              <li>Pages visited</li>
              <li>Referring website</li>
              <li>Other browsing data</li>
            </ul>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We may use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Provide and improve our hair analysis service</li>
              <li>Send you marketing communications</li>
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Protect against fraud and unauthorized transactions</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Service providers who help us operate our business</li>
              <li>Payment processors to complete transactions</li>
              <li>Marketing partners with your consent</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p className="mb-4">
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">5. Your Privacy Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to delete your personal information</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">6. Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and will be effective as soon as it is accessible.
            </p>
            
            <h2 className="text-2xl font-medium mt-8 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email: privacy@rootrevive.com<br />
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

export default PrivacyPolicy;
