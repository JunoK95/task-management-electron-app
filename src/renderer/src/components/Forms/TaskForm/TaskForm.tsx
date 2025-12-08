import { useForm } from 'react-hook-form';
import styles from './TaskForm.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskFormSchema, TaskFormValues } from './taskSchema';
import { useCreateTask } from '../../../queries/useCreateTask';
import { useUpdateTask } from '../../../queries/useUpdateTask';
import Select from '../../Select/Select';
import DatePicker from '../../DatePicker/DatePicker';
import { Button } from '../../Button/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

type Props = {
  mode: 'create' | 'update';
  initialValues?: Partial<TaskFormValues>;
  filters: any; // projectId | workspaceId | ownerId
  ownerId?: string;
};

export function TaskForm({ mode, initialValues = {}, filters, ownerId }: Props) {
  const createTask = useCreateTask(filters.projectId);
  const updateTask = useUpdateTask(filters);
  const navigate = useNavigate();

  type TaskFormInput = z.input<typeof TaskFormSchema>; // before preprocess
  type TaskFormValues = z.infer<typeof TaskFormSchema>; // after preprocess

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskFormValues, any, TaskFormInput>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: initialValues
  });

  const onSubmit = (data: TaskFormValues) => {
    const start_at = new Date(data.start_at || '');
    const due_at = data.due_at ? new Date(data.due_at) : null;
    const remind_at = data.remind_at ? new Date(data.remind_at) : null;
    const owner_id = ownerId || '';

    if (mode === 'create') {
      createTask.mutate({ ...data, owner_id, start_at, due_at, remind_at });
    } else {
      updateTask.mutate({ ...data, id: '', owner_id, start_at, due_at, remind_at });
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
            <Button type="submit">{mode === 'create' ? 'Add task' : 'Update task'}</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
