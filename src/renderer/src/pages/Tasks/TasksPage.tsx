import { useTasks } from '../../queries/useTasks';
import TaskTable from '../../components/Tables/TaskTable/TaskTable';
import { useState } from 'react';
import Pagination from '../../components/Tables/Controls/Pagination/Pagination';
import TaskTableFilters from '../../components/Tables/Controls/TaskTableFilters/TaskTableFilters';
import { TaskFilters } from '../../api/tasks';

function TasksPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TaskFilters['status']>('all');
  const [priority, setPriority] = useState<TaskFilters['priority']>('all');
  const perPage = 5; // Use a reasonable default

  const { data, isFetching } = useTasks(page, perPage);

  const totalPages = data ? Math.ceil(data.total / perPage) : 1;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
  };

  console.log('Page:', page, 'TotalPages:', totalPages);

  return (
    <div>
      <TaskTable tasks={data?.data ?? []} isLoading={isFetching} />
      <div>{page}</div>
      <TaskTableFilters
        status={status}
        priority={priority}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />
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
