import { supabase } from '@/services/supabase/client';

export async function getMyProfile() {
  const { data, error } = await supabase.from('profiles').select('*').single();

  if (error) throw error;
  return data;
}
