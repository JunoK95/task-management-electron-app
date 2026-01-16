import type { Database } from './supabase';

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];
export type Functions = Database['public']['Functions'];

// Raw DB rows (use sparingly)
export type WorkspaceRow = Tables['workspaces']['Row'];
export type ProjectRow = Tables['projects']['Row'];
export type TagRow = Tables['tags']['Row'];
export type TaskRow = Tables['tasks']['Row'];
export type ProfileRow = Tables['profiles']['Row'];

// Raw DB inserts/updates (DO NOT USE IN FORMS)
export type WorkspaceInsert = Tables['workspaces']['Insert'];
export type TaskInsert = Tables['tasks']['Insert'];
export type TaskUpdate = Tables['tasks']['Update'];
