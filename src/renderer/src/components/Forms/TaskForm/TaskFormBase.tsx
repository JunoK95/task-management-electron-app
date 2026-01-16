import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import Select from '@/components/Select/Select';
import type { Workspace, Project, CreateTaskInput, UpdateTaskInput } from '@/types';

import styles from './TaskForm.module.scss';

type Props = {
  defaultValues?: Partial<CreateTaskInput | UpdateTaskInput>;
  workspaces: Workspace[];
  projects: Project[];
  isLoading?: boolean;
  onSubmit: SubmitHandler<CreateTaskInput | UpdateTaskInput>;
  onCancel(): void;
};

export function TaskFormBase({
  defaultValues,
  workspaces,
  projects,
  isLoading,
  onSubmit,
  onCancel
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTaskInput | UpdateTaskInput>({ defaultValues });

  const workspaceOptions = workspaces.map((w) => ({ value: w.id, label: w.name }));
  const projectOptions = [{ value: '', label: 'No Project' }].concat(
    projects.map((p) => ({ value: p.id, label: p.name }))
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="What needs to be done?"
        className={clsx(styles.title, errors.title && styles.error)}
        {...register('title', { required: true })}
      />

      <textarea placeholder="Description" {...register('description')} />

      <Select label="Workspace" options={workspaceOptions} {...register('workspace_id')} />
      <Select label="Project" options={projectOptions} {...register('project_id')} />

      <Select
        label="Priority"
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]}
        {...register('priority')}
      />

      <Select
        label="Status"
        options={[
          { value: 'pending', label: 'Pending' },
          { value: 'in_progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' }
        ]}
        {...register('status')}
      />

      <DatePicker label="Start" {...register('start_at')} />
      <DatePicker label="Due" {...register('due_at')} />
      <DatePicker label="Reminder" {...register('remind_at')} />

      <div className={styles.footer}>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
}
