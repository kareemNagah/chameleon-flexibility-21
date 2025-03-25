
import { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithGoogle, isDarkMode } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 gap-0 border-none max-w-4xl overflow-hidden rounded-2xl">
        <div className="flex flex-col md:flex-row h-full min-h-[600px]">
          {/* Left panel - Illustration */}
          <div className={`md:w-1/2 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-flex-green/20 to-flex-yellow/20'} p-8 flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute h-full w-full opacity-20">
                <path 
                  fill={isDarkMode ? "#2E7D32" : "#4CAF50"} 
                  d="M40,-51.2C50.8,-43.1,58.2,-29.7,62.8,-14.9C67.5,-0.1,69.3,16.2,63.4,28.8C57.5,41.5,43.8,50.6,29.4,55.5C15,60.5,-0.1,61.4,-14.4,57.7C-28.7,54,-42.1,45.7,-50.8,33.8C-59.5,21.9,-63.5,6.5,-62.5,-9.8C-61.5,-26.1,-55.5,-43.2,-43.4,-51.4C-31.4,-59.6,-13.5,-58.9,1.1,-60.2C15.7,-61.5,29.3,-59.3,40,-51.2Z" 
                  transform="translate(100 100) scale(1.5)" 
                />
              </svg>
            </div>
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/lovable-uploads/73e4c415-eb5f-48db-a438-94ea38c84838.png" 
                  alt="Flex Logo" 
                  className="h-20 w-auto mx-auto mb-6"
                />
                <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-flex-text'} mb-4`}>
                  Welcome to Flex
                </h2>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Sign in with Google to continue your journey towards better productivity.
                </p>
              </motion.div>
            </div>
            
            <div className={`absolute -left-10 -bottom-10 w-40 h-40 ${isDarkMode ? 'bg-yellow-700/15' : 'bg-flex-yellow/15'} rounded-full filter blur-xl`} />
            <div className={`absolute -right-10 -top-10 w-40 h-40 ${isDarkMode ? 'bg-green-700/15' : 'bg-flex-green/15'} rounded-full filter blur-xl`} />
          </div>
          
          {/* Right panel - Auth form */}
          <div className={`md:w-1/2 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} p-8 md:p-10 relative`}>
            <button 
              onClick={onClose} 
              className={`absolute top-4 right-4 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            <div className="h-full flex flex-col justify-center">
              <div className="mb-8">
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-flex-text'} mb-2`}>
                  Sign In with Google
                </h3>
                <p className={isDarkMode ? "text-gray-300 text-sm" : "text-gray-600 text-sm"}>
                  Use your Google account to access Flex
                </p>
              </div>
              
              <div className="space-y-6">
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className={`w-full py-6 ${isDarkMode ? 'bg-white text-gray-800' : 'bg-white text-gray-700'} hover:bg-gray-50 border border-gray-300 flex items-center justify-center gap-2 rounded-xl`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                  </svg>
                  <span className="ml-2 font-medium">
                    {isSubmitting ? "Processing..." : "Continue with Google"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
