import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import AutoGrowTextarea from '@/components/AutoGrowTextarea/AutoGrowTextarea';
import { Button } from '@/components/Button/Button';
import { TaskInsert } from '@/types';

import styles from './TaskForm.module.scss';
type Props = {
  defaultValues?: TaskInsert;
  isLoading?: boolean;
  onCancel: () => void;
  onSubmit: (values: TaskInsert) => void;
};

function CreateTaskFormSimple({ defaultValues, isLoading, onCancel, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskInsert>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="What needs to be done?"
        className={clsx(styles.title, errors.title && styles.error)}
        {...register('title', { required: true })}
      />

      <AutoGrowTextarea placeholder="Description" {...register('description')} />
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

export default CreateTaskFormSimple;
