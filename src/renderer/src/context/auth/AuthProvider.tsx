import { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { JSX, ReactNode, useEffect, useState } from 'react';

import { supabase } from '@/services/supabase/client';

import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async (): Promise<void> => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

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

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { error: error.message };
    return {};
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) return { error: error.message };
    return {};
  };

  const signInWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple'
    });

    if (error) return { error: error.message };
    return {};
  };

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, signIn, signInWithApple, signInWithGoogle, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
