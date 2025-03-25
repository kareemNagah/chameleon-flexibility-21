
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./auth/AuthModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isTransparent ? "bg-transparent" : "bg-gray-900 border-b border-gray-800"}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img 
            src="/lovable-uploads/73e4c415-eb5f-48db-a438-94ea38c84838.png" 
            alt="Flex Logo" 
            className="h-8 w-auto" 
          />
          <span className="font-bold text-xl text-white">Flex</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="nav-link text-gray-300 hover:text-flex-green">About</Link>
          <Link to="/blog" className="nav-link text-gray-300 hover:text-flex-green">Blog</Link>
          <Link to="/focus" className="nav-link text-gray-300 hover:text-flex-green">Focus</Link>
          
          {user ? (
            <>
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  Dashboard
                </Button>
              </Link>
              <Button 
                onClick={() => signOut()}
                className="bg-flex-gradient hover:opacity-90 text-white"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-flex-gradient hover:opacity-90 text-white"
            >
              Get Started
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden p-4 pt-0 bg-gray-900">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/about" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded-md"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded-md"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link 
              to="/focus" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded-md"
              onClick={closeMenu}
            >
              Focus
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="p-2 text-gray-200 hover:bg-gray-800 rounded-md"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Button 
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="bg-flex-gradient hover:opacity-90 text-white w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setIsAuthModalOpen(true);
                  closeMenu();
                }}
                className="bg-flex-gradient hover:opacity-90 text-white w-full"
              >
                Get Started
              </Button>
            )}
          </div>
        </nav>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
