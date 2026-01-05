import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import AutoGrowTextarea from '@/components/AutoGrowTextarea/AutoGrowTextarea';
import { Button } from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import Select from '@/components/Select/Select';
import Separator from '@/components/Separator/Separator';
import { Project, TaskInsert } from '@/types';
import { dateToString } from '@/utils/dateToString';

import styles from './TaskForm.module.scss';

type Props = {
  defaultValues?: TaskInsert;
  isLoading?: boolean;
  projects: Project[];
  onCancel: () => void;
  onSubmit: (values: TaskInsert) => void;
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
    handleSubmit,
    formState: { errors }
  } = useForm<TaskInsert>({ defaultValues });

  const projectOptions = projects.map((project) => ({
    label: project.name,
    value: project.id
  }));
  projectOptions.unshift({ label: 'No Project', value: '' });

  const defaultDueDate = dateToString(new Date()) || '';

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
            <DatePicker label="Due Date" defaultValue={defaultDueDate} {...register('due_at')} />
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
