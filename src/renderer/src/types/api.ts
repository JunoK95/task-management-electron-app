import type { Task, Workspace } from './db';

export interface CreateWorkspaceInput {
  name: string;
}

export interface CreateWorkspaceResponse {
  id: string;
}

export interface TasksByProject {
  projectId: string;
  tasks: Task[];
}

export interface WorkspaceSummary {
  workspace: Workspace;
  taskCount: number;
}
