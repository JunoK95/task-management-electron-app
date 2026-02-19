import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { JSX, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Pagination from '@/components/Tables/Controls/Pagination/Pagination';
import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import TaskTableFilters from '@/components/Tables/Controls/TaskTableFilters/TaskTableFilters';
import { DataTable } from '@/components/Tables/DataTable/DataTable';
import { useTasks } from '@/queries/tasks/useTasks';
import { ROUTES } from '@/routes/routes';
import { Task, TaskFilters } from '@/types';

import styles from './TasksPage.module.scss';

function TasksPage(): JSX.Element {
  const { workspaceId } = useParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskFilters['status']>('all');
  const [priority, setPriority] = useState<TaskFilters['priority']>('all');
  const perPage = 10;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const filters = useMemo(
    () => ({ page, perPage, status, priority, search, workspaceId }),
    [page, perPage, status, priority, search, workspaceId]
  );

  const { data: tasks, isFetching } = useTasks(filters);

  const totalPages = tasks ? Math.ceil(tasks.total / perPage) : 1;

  const handlePageChange = (nextPage: number): void => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
  };

  const handleRowClick = (rowData: Partial<Task>): void => {
    const id = rowData.id as string;
    const task = tasks?.data.find((t) => t.id === id);
    if (!task) return;

    // seed task detail cache
    queryClient.setQueryData(['task', id], task);

    navigate(ROUTES.WORKSPACES.TASKS.DETAILS(task.workspace_id!, task.id));
  };

  const columns: ColumnDef<Partial<Task>>[] = [
    {
      accessorKey: 'title',
      header: 'Task',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'project.name',
      header: 'Project',
      cell: (info) => info.getValue() || '-'
    },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'priority',
      header: 'Priority'
    },
    {
      accessorKey: 'due_at',
      header: 'Due Date',
      cell: (info) => {
        const v = info.getValue() as string;
        return v ? formatDistanceToNow(new Date(v), { addSuffix: true }) : '-';
      }
    }
  ];

  const data: Partial<Task>[] =
    tasks?.data.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      project: task.project,
      priority: task.priority,
      due_at: task.due_at
    })) || [];

  return (
    <div className={styles.container}>
      <h2>My Tasks</h2>
      <SearchBar value={search} onChange={setSearch} />
      <TaskTableFilters
        status={status}
        priority={priority}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />
      <DataTable data={data ?? []} columns={columns} onRowClick={handleRowClick} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isFetching}
      />
    </div>
  );
}

export default TasksPage;
