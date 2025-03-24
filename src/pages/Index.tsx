
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, ArrowRight, Clock, ChevronRight } from 'lucide-react';

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
      
      {/* Blog Section */}
      <div className="container mx-auto py-16 px-4" id="blog">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-flex-text mb-4">Latest from Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover tips, strategies, and insights to help you build better habits and boost your productivity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Blog Post 1 */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                alt="Blog Post" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="inline-block px-3 py-1 bg-flex-green/10 text-flex-green rounded-full text-xs font-medium">
                  Productivity
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>5 min read</span>
                </div>
              </div>
              <CardTitle className="text-xl">How to Build Habits That Last</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">
                Learn the science behind habit formation and discover techniques to build lasting habits that stick.
              </p>
              <Link to="/blog" className="text-flex-green hover:text-flex-green/90 flex items-center text-sm font-medium">
                Read Article <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Blog Post 2 */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                alt="Blog Post" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="inline-block px-3 py-1 bg-flex-yellow/10 text-flex-yellow-dark rounded-full text-xs font-medium">
                  Focus
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>7 min read</span>
                </div>
              </div>
              <CardTitle className="text-xl">The Power of the Pomodoro Technique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">
                Discover how working in focused bursts can dramatically improve your productivity and mental clarity.
              </p>
              <Link to="/blog" className="text-flex-green hover:text-flex-green/90 flex items-center text-sm font-medium">
                Read Article <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          {/* Blog Post 3 */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                alt="Blog Post" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="inline-block px-3 py-1 bg-flex-orange/10 text-flex-orange rounded-full text-xs font-medium">
                  Mindfulness
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>6 min read</span>
                </div>
              </div>
              <CardTitle className="text-xl">Mindfulness for Better Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">
                How practicing mindfulness can help you stay focused, reduce stress, and accomplish more of what matters.
              </p>
              <Link to="/blog" className="text-flex-green hover:text-flex-green/90 flex items-center text-sm font-medium">
                Read Article <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/blog">
            <Button variant="outline" className="rounded-full px-6">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
