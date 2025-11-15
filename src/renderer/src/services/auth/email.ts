// auth.js
import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';

// Sign Up
export async function signUp(
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: Session | null;
}> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// Sign In
export async function signIn(
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword;
}> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Sign Out
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
