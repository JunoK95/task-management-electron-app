import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import styles from './TaskForm.module.scss';
import { TaskFormSchema, TaskFormValues } from './taskSchema';
import { useCreateTask } from '../../../queries/useCreateTask';
import { useUpdateTask } from '../../../queries/useUpdateTask';
import { Button } from '../../Button/Button';
import DatePicker from '../../DatePicker/DatePicker';
import Select from '../../Select/Select';

type Props = {
  mode: 'create' | 'update';
  initialValues?: Partial<TaskFormValues>;
  ownerId?: string;
  taskId?: string;
  workspaceId?: string;
  workspaces?: any[];
  projects?: any[];
};

export function TaskForm({
  mode,
  initialValues = {},
  ownerId,
  workspaceId,
  workspaces = [],
  projects = []
}: Props) {
  const createTask = useCreateTask({});
  const updateTask = useUpdateTask({});
  const navigate = useNavigate();

  type TaskFormInput = z.input<typeof TaskFormSchema>; // before preprocess
  type TaskFormValues = z.infer<typeof TaskFormSchema>; // after preprocess

  const isLoading = createTask.isPending || updateTask.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskFormValues, any, TaskFormInput>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: initialValues
  });

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const successCallback = () => {
    // Example: navigate back or show a toast
    navigate(-1);
    alert('Task saved successfully!');
  };

  const errorCallback = (error: unknown) => {
    console.error('Failed to save task:', error);
    alert('Failed to save task. Please try again.');
  };

  const onSubmit = (data: TaskFormValues) => {
    const start_at = data.start_at ? new Date(data.start_at) : null;
    const due_at = data.due_at ? new Date(data.due_at) : null;
    const remind_at = data.remind_at ? new Date(data.remind_at) : null;
    const project_id = data.project_id || '';

    console.log('submitting', {
      ...data,
      owner_id: ownerId,
      workspace_id: workspaceId,
      project_id,
      start_at,
      due_at,
      remind_at
    });

    if (mode === 'create') {
      createTask.mutate(
        {
          ...data,
          owner_id: ownerId,
          workspace_id: workspaceId,
          project_id,
          start_at,
          due_at,
          remind_at
        },
        {
          onSuccess: successCallback,
          onError: errorCallback
        }
      );
    } else {
      updateTask.mutate(
        {
          ...data,
          id: initialValues.id!,
          owner_id: ownerId,
          project_id,
          workspace_id: workspaceId,
          start_at,
          due_at,
          remind_at
        },
        {
          onSuccess: successCallback,
          onError: errorCallback
        }
      );
    }
  };

  const onCancel = () => {
    // Handle cancel action
    navigate(-1);
  };

  const options = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const workspaceOptions = workspaces.map((workspace: any) => ({
    value: workspace.id,
    label: workspace.name
  }));

  const projectOptions = projects.map((project: any) => ({
    value: project.id,
    label: project.name
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className={clsx([styles['input-wrapper']])}>
        <input
          placeholder="What needs to be done?"
          className={clsx([styles.title, errors.title && styles.error])}
          {...register('title')}
        />
      </div>

      {/* Description */}
      <div className={styles['input-wrapper']}>
        <textarea placeholder="Description" {...register('description')} />
      </div>
      <div className={styles['select-row']}>
        {/* Workspace */}
        <div className={styles['select-wrapper']}>
          <Select
            id="workspace_id"
            label="Workspace"
            options={workspaceOptions}
            {...register('workspace_id')}
          />
        </div>

        {/* Project */}
        <div className={styles['select-wrapper']}>
          <Select
            id="project_id"
            label="Project"
            options={projectOptions}
            {...register('project_id')}
          />
        </div>
      </div>

      <div className={styles['select-row']}>
        {/* Priority */}
        <div className={styles['select-wrapper']}>
          <Select id="priority" label="Priority" options={options} {...register('priority')} />
        </div>

        {/* Status */}
        <div className={styles['select-wrapper']}>
          <Select id="status" label="Status" options={statusOptions} {...register('status')} />
        </div>

        {/* Due Date */}
        <div className={styles['select-wrapper']}>
          <DatePicker type="datetime-local" label="Due Date" id="due_at" {...register('due_at')} />
        </div>
      </div>
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
            label="Reminder at"
            id="remind_at"
            {...register('remind_at')}
          />
        </div>
      </div>
      {/* Submit */}
      <div className={styles['form-footer']}>
        <div className={styles.left}>
          {/* <div className={styles['select-wrapper']}>
            <Select id="status" label="Project" options={options} {...register('project_id')} />
          </div> */}
        </div>
        <div className={styles.right}>
          <div>
            <Button type="button" onClick={onCancel}>
              {'Cancel'}
            </Button>
          </div>
          <div>
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
      </div>
    </form>
  );
}
