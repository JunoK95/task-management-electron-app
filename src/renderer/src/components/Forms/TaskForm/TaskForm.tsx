// src/components/TaskForm/TaskForm.tsx
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import Select from '@/components/Select/Select';
import { useCreateTask } from '@/queries/useCreateTask';
import { useUpdateTask } from '@/queries/useUpdateTask';
import type { Workspace, Project, TaskFormValues, TaskInsert, TaskUpdate } from '@/types';

import styles from './TaskForm.module.scss';

type Props = {
  mode: 'create' | 'update';
  initialValues?: Partial<TaskFormValues> & { id?: string };
  workspaceId?: string;
  workspaces?: Workspace[];
  projects?: Project[];
};

export function TaskForm({
  mode,
  initialValues = {},
  workspaceId,
  workspaces = [],
  projects = []
}: Props) {
  const navigate = useNavigate();
  const createTask = useCreateTask({});
  const updateTask = useUpdateTask({});
  const isLoading = createTask.isPending || updateTask.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskFormValues>({
    defaultValues: initialValues
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error('Form errors:', errors);
    }
  }, [errors]);

  const successCallback = () => navigate(-1);
  const errorCallback = (error: unknown) => {
    console.error('Failed to save task:', error);
    alert('Failed to save task. Please try again.');
  };

  /** Convert Date → string for Supabase */
  const dateToString = (date?: Date | null): string | null => (date ? date.toISOString() : null);

  /** Map form values → Supabase insert/update input */
  const toTaskInsert = (values: TaskFormValues): TaskInsert => ({
    title: values.title,
    description: values.description,
    priority: values.priority,
    status: values.status,
    workspace_id: workspaceId,
    project_id: values.project_id || undefined,
    start_at: dateToString(values.start_at),
    due_at: dateToString(values.due_at),
    remind_at: dateToString(values.remind_at)
  });

  /** Submit handler */
  const onSubmit: SubmitHandler<TaskFormValues> = (values) => {
    if (mode === 'create') {
      const payload: TaskInsert = toTaskInsert(values);
      createTask.mutate(payload, { onSuccess: successCallback, onError: errorCallback });
    } else {
      if (!initialValues.id) throw new Error('Task ID is required for update');

      const payload: TaskUpdate = {
        id: initialValues.id, // now TS knows it's a string
        ...toTaskInsert(values)
      };

      updateTask.mutate(payload, { onSuccess: successCallback, onError: errorCallback });
    }
  };

  const onCancel = () => navigate(-1);

  /** ---------- Options ---------- */
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const workspaceOptions = workspaces.map((w) => ({ value: w.id, label: w.name }));

  const projectOptions = [
    { value: '', label: 'No Project' },
    ...projects.map((p) => ({ value: p.id, label: p.name }))
  ];

  /** ---------- Render ---------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className={styles['input-wrapper']}>
        <input
          placeholder="What needs to be done?"
          className={clsx(styles.title, errors.title && styles.error)}
          {...register('title', { required: true })}
        />
      </div>

      {/* Description */}
      <div className={styles['input-wrapper']}>
        <textarea placeholder="Description" {...register('description')} />
      </div>

      {/* Workspace / Project */}
      <div className={styles['select-row']}>
        <div className={styles['select-wrapper']}>
          <Select
            id="workspace_id"
            label="Workspace"
            options={workspaceOptions}
            {...register('workspace_id', { required: true })}
          />
        </div>

        <div className={styles['select-wrapper']}>
          <Select
            id="project_id"
            label="Project"
            options={projectOptions}
            {...register('project_id')}
          />
        </div>
      </div>

      {/* Priority / Status / Due */}
      <div className={styles['select-row']}>
        <div className={styles['select-wrapper']}>
          <Select
            id="priority"
            label="Priority"
            options={priorityOptions}
            {...register('priority')}
          />
        </div>

        <div className={styles['select-wrapper']}>
          <Select id="status" label="Status" options={statusOptions} {...register('status')} />
        </div>

        <div className={styles['select-wrapper']}>
          <DatePicker type="datetime-local" label="Due Date" id="due_at" {...register('due_at')} />
        </div>
      </div>

      {/* Dates */}
      <div className={styles['select-row']}>
        <div className={styles['select-wrapper']}>
          <DatePicker
            type="datetime-local"
            label="Start Date"
            id="start_at"
            {...register('start_at')}
          />
        </div>

        <div className={styles['select-wrapper']}>
          <DatePicker
            type="datetime-local"
            label="Reminder At"
            id="remind_at"
            {...register('remind_at')}
          />
        </div>
      </div>

      {/* Footer */}
      <div className={styles['form-footer']}>
        <div className={styles.left} />
        <div className={styles.right}>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? mode === 'create'
                ? 'Adding...'
                : 'Updating...'
              : mode === 'create'
                ? 'Add task'
                : 'Update task'}
          </Button>
        </div>
      </div>
    </form>
  );
}
