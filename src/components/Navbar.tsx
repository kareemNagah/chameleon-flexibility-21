
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="relative h-10 w-10 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-chameleon-gradient animate-color-shift"></div>
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div className="absolute inset-[10px] rounded-full bg-chameleon-green"></div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-chameleon-gradient">
            Flex
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/features" className="nav-link">
            Features
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Link 
            to="/login" 
            className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
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
            to="/features" 
            className="text-xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className="text-xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-xl nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col items-center space-y-4 pt-6 w-full">
            <Link 
              to="/login" 
              className="w-full text-center px-4 py-2 rounded-full text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-full text-center cta-button"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Your Journey
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
