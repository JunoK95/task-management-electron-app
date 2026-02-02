import type { TaskRow, WorkspaceRow } from './db';

export interface CreateWorkspaceInput {
  name: string;
}

export interface CreateWorkspaceResponse {
  id: string;
}

export interface TasksByProject {
  projectId: string;
  tasks: TaskRow[];
}

export interface WorkspaceSummary {
  workspace: WorkspaceRow;
  taskCount: number;
}
