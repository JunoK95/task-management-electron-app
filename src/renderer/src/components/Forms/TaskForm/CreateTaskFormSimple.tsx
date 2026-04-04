import clsx from 'clsx';
import { Button, DatePicker } from 'juno-ui-library';
import { Select } from 'juno-ui-library';
import { useForm, Controller } from 'react-hook-form';

import AutoGrowTextarea from '@/components/AutoGrowTextarea/AutoGrowTextarea';
import Separator from '@/components/Separator/Separator';
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="What needs to be done?"
        className={clsx(styles.title, errors.title && styles.error)}
        {...register('title', { required: true })}
      />

      <AutoGrowTextarea placeholder="Description" {...register('description')} />
      <Separator />
      <div className={styles['form-footer']}>
        <div>
          <div className={styles.left}>
            <Select
              options={projectOptions}
              label="Project"
              defaultValue={''}
              {...register('project_id')}
            />
            <Controller
              name="due_at"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  mode="datetime"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.right}>
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateTaskFormSimple;
