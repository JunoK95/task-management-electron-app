import { supabase } from '@renderer/services/supabase/client';
import { Session } from '@supabase/supabase-js';
import { JSX, ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async (): Promise<void> => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      console.log('Initial session:', session);
      setSession(session);
      setLoading(false);
    };

    getInitialSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}
