import clsx from 'clsx';
import { Button, DatePicker, Select } from 'juno-ui-library';
import { useForm, Controller } from 'react-hook-form';

import AutoGrowTextarea from '@/components/AutoGrowTextarea/AutoGrowTextarea';
import { CreateTaskInput, Project } from '@/types';

import styles from './TaskForm.module.scss';

type Props = {
  defaultValues?: Partial<CreateTaskInput>;
  isLoading?: boolean;
  projects: Project[];
  onCancel: () => void;
  onSubmit: (values: CreateTaskInput) => void;
};

function CreateTaskFormSimple({
  defaultValues,
  isLoading,
  projects = [],
  onCancel,
  onSubmit
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTaskInput>({ defaultValues });

  const projectOptions = projects.map((project) => ({
    label: project.name,
    value: project.id
  }));
  projectOptions.unshift({ label: 'No Project', value: '' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.simpleForm}>
      <input
        placeholder="What needs to be done?"
        className={clsx(styles.title, errors.title && styles.error)}
        {...register('title', { required: true })}
      />

      <AutoGrowTextarea placeholder="Add a description…" {...register('description')} />

      <div className={styles.footer}>
        <div className={styles.footerControls}>
          <Select options={projectOptions} defaultValue={''} {...register('project_id')} />
          <Controller
            name="due_at"
            control={control}
            render={({ field }) => (
              <DatePicker
                label=""
                placeholder="Due date"
                mode="datetime"
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toISOString() : null)}
              />
            )}
          />
        </div>
        <div className={styles.footerActions}>
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button intent="primary" type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateTaskFormSimple;
