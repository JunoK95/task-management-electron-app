import type { Session } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
