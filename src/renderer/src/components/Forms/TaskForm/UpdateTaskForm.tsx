import { useNavigate } from 'react-router-dom';

import { useUpdateTask } from '@/queries/useUpdateTask';
import type { TaskUpdate, Task, Workspace, Project } from '@/types';
import { isTaskPriority, isTaskStatus } from '@/types/guards';
import { dateToString } from '@/utils/dateToString';

import { TaskFormBase } from './TaskFormBase';

import type { TaskFormValues } from './types';

export function UpdateTaskForm(props: {
  task: Task;
  workspaces: Workspace[];
  projects: Project[];
}) {
  const navigate = useNavigate();
  const updateTask = useUpdateTask({});

  const defaultValues: TaskFormValues = {
    title: props.task.title,
    description: props.task.description ?? '',
    workspace_id: props.task.workspace_id!,
    project_id: props.task.project_id ?? '',
    priority: isTaskPriority(props.task.priority) ? props.task.priority : 'medium',
    status: isTaskStatus(props.task.status) ? props.task.status : 'pending',
    start_at: props.task.start_at ? new Date(props.task.start_at) : null,
    due_at: props.task.due_at ? new Date(props.task.due_at) : null,
    remind_at: props.task.remind_at ? new Date(props.task.remind_at) : null
  };

  const toUpdate = (v: TaskFormValues): TaskUpdate => ({
    id: props.task.id,
    ...v,
    project_id: v.project_id || undefined,
    start_at: dateToString(v.start_at) ?? null,
    due_at: dateToString(v.due_at) ?? null,
    remind_at: dateToString(v.remind_at) ?? null
  });

  return (
    <TaskFormBase
      defaultValues={defaultValues}
      workspaces={props.workspaces}
      projects={props.projects}
      isLoading={updateTask.isPending}
      onCancel={() => navigate(-1)}
      onSubmit={(values) => updateTask.mutate(toUpdate(values))}
    />
  );
}
