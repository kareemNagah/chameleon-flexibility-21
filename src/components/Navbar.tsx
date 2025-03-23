
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/73e4c415-eb5f-48db-a438-94ea38c84838.png" 
            alt="Flex Logo" 
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-flex-gradient">
            Flex
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/ai-planner" className="nav-link flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-flex-yellow-dark" />
            AI Agent
          </Link>
          <Link to="/todo" className="nav-link">
            Tasks
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <button 
            onClick={openAuthModal}
            className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground transition-colors"
          >
            Login
          </button>
          <Link
            to="/ai-planner"
            className="cta-button"
          >
            Start Your Journey
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="animate-scale" />
          ) : (
            <Menu size={24} className="animate-scale" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white transform ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        } transition-all duration-300 ease-in-out pt-20`}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          <Link 
            to="/" 
            className="text-xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="text-xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/ai-planner" 
            className="text-xl nav-link flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Sparkles className="h-5 w-5 text-flex-yellow-dark" />
            AI Agent
          </Link>
          <Link 
            to="/todo" 
            className="text-xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Tasks
          </Link>
          <div className="flex flex-col items-center space-y-4 pt-6 w-full">
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                openAuthModal();
              }}
              className="w-full text-center px-4 py-2 rounded-full text-foreground/80 hover:text-foreground transition-colors"
            >
              Login
            </button>
            <Link
              to="/ai-planner"
              className="w-full text-center cta-button"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Your Journey
            </Link>
          </div>
        </nav>
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
