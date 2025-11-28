
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Users, Award, Leaf, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return <div className="flex flex-col min-h-screen">
    <Navbar />

    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">About RootRevive</h1>
            <p className="text-xl text-gray-300">
              Advanced hair and scalp solutions backed by science and driven by a passion for healthy hair.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif mb-6">Our Story</h2>
              <p className="mb-4 text-gray-700">
                RootRevive began with a simple observation: most hair care products weren't addressing the root causes of hair health. Founded in 2018, our team of dermatologists, trichologists, and cosmetic chemists came together with a mission to revolutionize hair care.
              </p>
              <p className="mb-4 text-gray-700">
                We believe that healthy hair starts with a healthy scalp. This philosophy guides our approach to product development, using only the finest natural ingredients combined with cutting-edge science to create solutions that work from the roots up.
              </p>
              <p className="text-gray-700">
                Today, RootRevive has helped thousands of people worldwide transform their hair health through our personalized analysis technology and targeted treatment formulations.
              </p>
            </div>
            <div className="md:w-1/2">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="bg-gray-100 h-80 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Our research laboratory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-6 text-center">Our Values</h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
            At RootRevive, our values guide everything we do - from product development to customer experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-16 w-16 bg-brand-gold/20 rounded-full mb-6 mx-auto">
                  <Leaf size={30} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-center">Sustainability</h3>
                <p className="text-gray-700 text-center">
                  We're committed to environmentally friendly practices, from our recyclable packaging to our ethically sourced ingredients.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-16 w-16 bg-brand-gold/20 rounded-full mb-6 mx-auto">
                  <BookOpen size={30} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-center">Science-Based</h3>
                <p className="text-gray-700 text-center">
                  Every formula is backed by rigorous research and clinical testing to ensure effectiveness and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-16 w-16 bg-brand-gold/20 rounded-full mb-6 mx-auto">
                  <Users size={30} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-center">Inclusivity</h3>
                <p className="text-gray-700 text-center">
                  Our solutions are designed for all hair types, textures, and concerns, because everyone deserves healthy hair.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-6 text-center">Meet Our Experts</h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Our team of specialists brings decades of experience in dermatology, trichology, and cosmetic chemistry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-64 w-64 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Sarah Kim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">Dr. Sarah Kim</h3>
                <p className="text-brand-gold mb-4">Chief Trichologist</p>
                <p className="text-gray-700 px-6">
                  With over 15 years of experience in hair and scalp disorders, Dr. Kim leads our research and product development.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-64 w-64 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1594824476969-51c44d7e618a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Elena Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">Dr. Elena Rodriguez</h3>
                <p className="text-brand-gold mb-4">Dermatologist</p>
                <p className="text-gray-700 px-6">
                  Dr. Chen specializes in scalp health and ensures our formulations are gentle yet effective for all skin types.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-64 w-64 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Michael Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">Dr. Michael Chen</h3>
                <p className="text-brand-gold mb-4">Cosmetic Chemist</p>
                <p className="text-gray-700 px-6">
                  Elena combines natural ingredients with innovative technology to create our signature formulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Experience the RootRevive Difference</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Ready to transform your hair health? Start with our personalized hair analysis or browse our complete range of products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand-gold text-brand-dark hover:bg-brand-gold/90 font-medium">
              <Link to="/analysis" className="flex items-center">
                Try Hair Analysis <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white bg-brand-dark/80 text-white hover:bg-white/10 font-medium">
              <Link to="/shop" className="flex items-center">
                Shop Products <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>;
};

export default About;
