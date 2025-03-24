
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
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Handle general errors, no special handling for "Email not confirmed"
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
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

  // Sign up function - updated to login immediately after signup
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // First, check if the user already exists
      const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('id', email);
      
      // Alternative way to check if user exists
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1,
        search: email
      });
      
      if (countError) {
        console.error("Error checking existing user:", countError);
      } else if (authUsers && authUsers.users.length > 0) {
        // User exists, throw a descriptive error
        toast({
          title: "Email already registered",
          description: "This email address is already registered. Please sign in instead.",
          variant: "destructive",
        });
        throw new Error("Email already registered");
      }
      
      // Create the user without waiting for email confirmation
      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          },
          // Remove emailRedirectTo to bypass email confirmation
          emailRedirectTo: undefined
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
      
      // Immediately sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("Auto sign-in failed:", signInError);
        toast({
          title: "Account created",
          description: "Your account was created but we couldn't sign you in automatically. Please sign in manually.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Account created!",
        description: "You've been successfully signed in."
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
