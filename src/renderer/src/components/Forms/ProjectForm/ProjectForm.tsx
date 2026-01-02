import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button/Button';
import { ProjectFormValues } from '@/types';

import styles from './ProjectForm.module.scss';

type Props = {
  defaultValues?: Partial<ProjectFormValues>;
  loading?: boolean;
  onSubmit: (data: ProjectFormValues) => void;
};

export default function ProjectForm({ defaultValues, loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    defaultValues
  });

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Project Name */}
      <div className={styles.field}>
        <input
          placeholder="Project name"
          className={clsx(errors.name && styles.error)}
          {...register('name')}
        />
        {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
      </div>

      {/* Objective */}
      <div className={styles.field}>
        <input
          placeholder="What are you trying to accomplish with this project?"
          {...register('objective')}
        />
      </div>

      {/* Description */}
      <div className={styles.field}>
        <textarea placeholder="Description (optional)" {...register('description')} />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create project'}
        </Button>
      </div>
    </form>
  );
}
