import { supabase } from '@/services/supabase/client';
import { Profile } from '@/types';

export async function getMyProfile(): Promise<Profile> {
  const { data, error } = await supabase.from('profiles').select('*').single();

  if (error) throw error;
  return data;
}
