import { ProjectRow } from '../db';

export type ProjectFormValues = Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>;
