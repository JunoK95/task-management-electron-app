import { useTasks } from '../../queries/useTasks';
import TaskTable from '../../components/Tables/TaskTable/TaskTable';
import { useMemo, useState } from 'react';
import Pagination from '../../components/Tables/Controls/Pagination/Pagination';
import TaskTableFilters from '../../components/Tables/Controls/TaskTableFilters/TaskTableFilters';
import { TaskFilters } from '../../api/tasks';
import SearchBar from '../../components/Tables/Controls/SearchBar/SearchBar';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function TasksPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskFilters['status']>('all');
  const [priority, setPriority] = useState<TaskFilters['priority']>('all');
  const perPage = 5;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const filters = useMemo(
    () => ({ page, perPage, status, priority, search }),
    [page, perPage, status, priority, search]
  );

  const { data, isFetching } = useTasks(filters);

  const totalPages = data ? Math.ceil(data.total / perPage) : 1;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
  };

  const handleRowClick = (id: string) => {
    const task = data?.data.find((t) => t.id === id);
    if (!task) return;

    // ✅ seed detail cache
    queryClient.setQueryData(['task', id], task);

    navigate(`/tasks/${id}`);
  };

  return (
    <div>
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
