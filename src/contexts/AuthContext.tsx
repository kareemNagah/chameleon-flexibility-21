
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Define context types
type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Provider component that wraps the app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check if user has a preference in localStorage
    const savedMode = localStorage.getItem('darkMode');
    // Check if user's system prefers dark mode
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedMode ? savedMode === 'true' : systemPreference;
  });
  const navigate = useNavigate();

  // Set dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Google sign in function
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        }
      });
      
      if (error) {
        toast({
          title: "Error signing in with Google",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Note: No need for a toast here as the page will redirect
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out."
      });
      
      navigate('/');
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signInWithGoogle,
    signOut,
    isDarkMode,
    toggleDarkMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
