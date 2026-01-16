import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import { useCreateWorkspace } from '@/queries/workspaces/useCreateWorkspace';

import styles from './WorkspaceForm.module.scss';
import { WorkspaceFormValues, workspaceSchema } from './workspaceSchema';

export default function WorkspaceForm() {
  const createWorkspace = useCreateWorkspace();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: ''
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
  const onSubmit = (data: WorkspaceFormValues) => {
    createWorkspace.mutate(
      { ...data },
      {
        onSuccess: successCallback
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Workspace Name */}
      <div className={styles.field}>
        <input
          placeholder="Workspace name"
          className={clsx(errors.name && styles.error)}
          {...register('name')}
        />
        {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
      </div>
      {/* Footer */}
      <div className={styles.footer}>
        <Button type="submit" disabled={createWorkspace.isPending}>
          {createWorkspace.isPending ? 'Creating...' : 'Create workspace'}
        </Button>
      </div>
    </form>
  );
}
