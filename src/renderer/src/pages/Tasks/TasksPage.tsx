import { useQueryClient } from '@tanstack/react-query';
import { JSX, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TaskFilters } from '@/api/tasks';
import Pagination from '@/components/Tables/Controls/Pagination/Pagination';
import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import TaskTableFilters from '@/components/Tables/Controls/TaskTableFilters/TaskTableFilters';
import TaskTable from '@/components/Tables/TaskTable/TaskTable';
import { useTasks } from '@/queries/useTasks';
import { ROUTES } from '@/routes/Routes';

import styles from './TasksPage.module.scss';

function TasksPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskFilters['status']>('all');
  const [priority, setPriority] = useState<TaskFilters['priority']>('all');
  const perPage = 10;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const filters = useMemo(
    () => ({ page, perPage, status, priority, search }),
    [page, perPage, status, priority, search]
  );

  const { data, isFetching } = useTasks(filters);

  const totalPages = data ? Math.ceil(data.total / perPage) : 1;

  const handlePageChange = (nextPage: number): void => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
  };

  const handleRowClick = (id: string): void => {
    const task = data?.data.find((t) => t.id === id);
    if (!task) return;

    // ✅ seed detail cache
    queryClient.setQueryData(['task', id], task);

    navigate(ROUTES.WORKSPACES.TASKS.DETAILS(task.workspace_id, task.id));
  };

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
      <TaskTable tasks={data?.data ?? []} isLoading={isFetching} onRowClick={handleRowClick} />
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
