import clsx from 'clsx';
import { Button, DatePicker, Select } from 'juno-ui-library';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import type { Workspace, Project, CreateTaskInput } from '@/types';

import styles from './TaskForm.module.scss';

type Props = {
  defaultValues?: Partial<CreateTaskInput>;
  workspaces: Workspace[];
  projects: Project[];
  isLoading?: boolean;
  onSubmit: SubmitHandler<CreateTaskInput>;
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
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTaskInput>({ defaultValues });

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

      <Controller
        name="start_at"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Start"
            mode="datetime"
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
          />
        )}
      />
      <Controller
        name="due_at"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Due"
            mode="datetime"
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
          />
        )}
      />
      <Controller
        name="remind_at"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Reminder"
            mode="datetime"
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
          />
        )}
      />

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
