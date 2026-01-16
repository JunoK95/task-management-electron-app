import { WorkspaceRole } from '../enums';

import type { Tables } from '../db';

export type Workspace = Tables['workspaces']['Row'];

export interface WorkspaceWithRole extends Workspace {
  role: WorkspaceRole;
}
