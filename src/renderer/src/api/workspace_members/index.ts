import { supabase } from '@/services/supabase/client';

export async function getWorkspaceMembers(workspaceId: string) {
  const { data: memberIds, error: linkError } = await supabase
    .from('workspace_members')
    .select('*')
    .eq('workspace_id', workspaceId);

  if (linkError) throw linkError;
  if (!memberIds || memberIds.length === 0) return [];

  const userIds = memberIds.map((m) => m.user_id);

  const { data: users, error: userError } = await supabase
    .from('profiles')
    .select('*')
    .in('id', userIds);

  if (userError) throw userError;

  const combinedData = memberIds.map((member) => {
    const user = users?.find((u) => u.id === member.user_id);
    return user ? { ...member, ...user } : member;
  });

  return combinedData;
}
