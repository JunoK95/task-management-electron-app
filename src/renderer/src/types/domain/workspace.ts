import type { Workspace } from '../db';

export interface WorkspaceWithRole extends Workspace {
  role: 'owner' | 'admin' | 'member' | 'viewer';
}
