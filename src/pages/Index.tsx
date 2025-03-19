
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

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
      <div className="container mx-auto text-center py-12">
        <Link to="/todo" className="cta-button inline-flex items-center">
          Check out our To-Do List
        </Link>
      </div>
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
