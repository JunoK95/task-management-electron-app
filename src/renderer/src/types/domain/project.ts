import { Project } from '../db';

export type ProjectRoles = 'owner' | 'admin' | 'member' | 'viewer';

export type ProjectFormValues = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
