import { supabase } from '@/services/supabase/client';
import type { AddTagToTaskInput, CreateTagInput, RemoveTagFromTaskInput, Tag } from '@/types';

/**
 * Get all tags for a workspace
 */
export async function getTagsByWorkspaceId(workspaceId: string): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('name');

  if (error) throw error;
  return data;
}

/**
 * Get all tags attached to a task
 */
export async function getTagsByTask(taskId: string): Promise<Tag[]> {
  // 1️⃣ Fetch tag IDs
  const { data: tagLinks, error: linkError } = await supabase
    .from('task_tags')
    .select('tag_id')
    .eq('task_id', taskId);

  if (linkError) throw linkError;
  if (!tagLinks || tagLinks.length === 0) return [];

  const tagIds = tagLinks.map((t) => t.tag_id);

  // 2️⃣ Fetch tags
  const { data: tags, error: tagError } = await supabase.from('tags').select('*').in('id', tagIds);

  if (tagError) throw tagError;

  return tags ?? [];
}

/**
 * Create a new tag
 */
export async function createTag(input: CreateTagInput): Promise<Tag> {
  const { data, error } = await supabase.from('tags').insert(input).select().single();

  if (error) throw error;
  return data;
}

/**
 * Attach an existing tag to a task
 */
export async function addTagToTask(input: AddTagToTaskInput): Promise<void> {
  const { error } = await supabase.from('task_tags').insert(input);

  if (error) throw error;
}

/**
 * Delete a tag entirely
 * (will cascade remove from tasks/projects)
 */
export async function deleteTag(tagId: string): Promise<void> {
  const { error } = await supabase.from('tags').delete().eq('id', tagId);

  if (error) throw error;
}

/**
 * Remove a tag from a task (unlink only)
 */
export async function removeTagFromTask(input: RemoveTagFromTaskInput): Promise<void> {
  const { error } = await supabase
    .from('task_tags')
    .delete()
    .eq('task_id', input.task_id)
    .eq('tag_id', input.tag_id);

  if (error) throw error;
}
