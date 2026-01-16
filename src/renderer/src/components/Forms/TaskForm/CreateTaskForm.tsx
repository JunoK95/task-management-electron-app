import { useNavigate } from 'react-router-dom';

import { useCreateTask } from '@/queries/tasks/useCreateTask';
import type { CreateTaskInput, Project, Workspace } from '@/types';
import { dateToString } from '@/utils/dateToString';

import { TaskFormBase } from './TaskFormBase';

export function CreateTaskForm(props: {
  workspaceId: string;
  workspaces: Workspace[];
  projects: Project[];
}) {
  const navigate = useNavigate();
  const createTask = useCreateTask({});

  const toInsert = (v: CreateTaskInput) => ({
    ...v,
    workspace_id: props.workspaceId,
    project_id: v.project_id || undefined,
    start_at: dateToString(v.start_at) ?? null,
    due_at: dateToString(v.due_at) ?? null,
    remind_at: dateToString(v.remind_at) ?? null
  });

  const onSubmit = (values: CreateTaskInput) => {
    createTask.mutate(toInsert(values), {
      onSuccess: () => {
        alert('Task created successfully');
        navigate(-1);
      },
      onError: (error) => {
        console.error('Failed to create task:', error);
        alert('Failed to create task. Please try again.');
      }
    });
  };

  return (
    <TaskFormBase
      workspaces={props.workspaces}
      projects={props.projects}
      isLoading={createTask.isPending}
      onCancel={() => navigate(-1)}
      onSubmit={onSubmit}
    />
  );
}
