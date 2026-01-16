import { WorkspaceRole } from '../enums';

import type { WorkspaceRow } from '../db';

export type Workspace = WorkspaceRow;

export interface WorkspaceWithRole extends Workspace {
  role: WorkspaceRole;
}
