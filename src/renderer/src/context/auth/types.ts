import type { Session } from '@supabase/supabase-js';

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithApple: () => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
