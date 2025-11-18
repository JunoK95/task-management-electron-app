import type { Session } from '@supabase/supabase-js';

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
