
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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

// Provider component that wraps the app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Handle the email not confirmed error specifically
        if (error.message === "Email not confirmed") {
          toast({
            title: "Email not confirmed",
            description: "Please check your email for verification instructions or contact support.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error signing in",
            description: error.message,
            variant: "destructive",
          });
        }
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in."
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  // Sign up function - updated to set autoconfirm
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // For development purposes, we're setting emailRedirectTo but not waiting for confirmation
      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          },
          emailRedirectTo: window.location.origin + '/auth'
        }
      });
      
      if (signUpError) {
        toast({
          title: "Error signing up",
          description: signUpError.message,
          variant: "destructive",
        });
        throw signUpError;
      }
      
      // If auto-confirm is enabled in Supabase, this will work directly
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("Auto sign-in failed:", signInError);
        
        // If email confirmation is required
        if (signInError.message === "Email not confirmed") {
          toast({
            title: "Account created!",
            description: "Please check your email for verification instructions before signing in.",
          });
          return;
        }
        
        toast({
          title: "Account created!",
          description: "Please sign in with your credentials.",
        });
        return;
      }
      
      toast({
        title: "Account created!",
        description: "You've been automatically signed in."
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Sign up error:", error);
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
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
