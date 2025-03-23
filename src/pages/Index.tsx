
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ListChecks } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Todo List CTA Section */}
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-flex-green/5 to-flex-yellow/5 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/73e4c415-eb5f-48db-a438-94ea38c84838.png" 
              alt="Flex Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-flex-text">Ready to organize your tasks?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our intuitive To-Do List helps you track your habits and stay on top of your commitments.
          </p>
          <div className="flex justify-center">
            <Link to="/todo">
              <Button className="cta-button flex items-center justify-center gap-2 bg-flex-gradient hover:opacity-90 text-white font-semibold px-8 py-6 rounded-full text-lg shadow-md">
                <ListChecks className="h-5 w-5" />
                Check My To-Do List
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
