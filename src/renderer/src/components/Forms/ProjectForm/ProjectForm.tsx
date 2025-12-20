import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import { useCreateProject } from '@/queries/useCreateProject';

import styles from './ProjectForm.module.scss';
import { projectSchema, ProjectFormValues } from './projectSchema';

type Props = {
  userId: string;
  workspaceId: string;
};

export default function ProjectForm({ userId, workspaceId }: Props) {
  const createProject = useCreateProject(workspaceId);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      workspace_id: workspaceId
    }
  });

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const successCallback = () => {
    // Example: navigate back or show a toast
    navigate(-1);
    alert('Task saved successfully!');
  };
  const onSubmit = (data: ProjectFormValues) => {
    createProject.mutate(
      { ...data, created_by: userId },
      {
        onSuccess: successCallback
      }
    );
  };

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

      {/* Description */}
      <div className={styles.field}>
        <textarea placeholder="Description (optional)" {...register('description')} />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button type="submit" disabled={createProject.isPending}>
          {createProject.isPending ? 'Creating...' : 'Create project'}
        </Button>
      </div>
    </form>
  );
}
