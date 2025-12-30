import type { Database } from './supabase';

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];
export type Functions = Database['public']['Functions'];

// Tables
export type Workspace = Tables['workspaces']['Row'];
export type Project = Tables['projects']['Row'];
export type Task = Tables['tasks']['Row'];
export type Profile = Tables['profiles']['Row'];

// Inserts / Updates
export type WorkspaceInsert = Tables['workspaces']['Insert'];
export type TaskInsert = Tables['tasks']['Insert'];
export type TaskUpdate = Tables['tasks']['Update'];
