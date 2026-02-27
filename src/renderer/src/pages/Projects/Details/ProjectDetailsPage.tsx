import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StatusDot from '@/components/StatusDot/StatusDot';
import Pagination from '@/components/Tables/Controls/Pagination/Pagination';
import { DataTable } from '@/components/Tables/DataTable/DataTable';
import { useProjectDashboardStats } from '@/queries/projects/useProjectDashboardStats';
import { useProjectDetails } from '@/queries/projects/useProjectDetails';
import { useSuggestedTasks } from '@/queries/tasks/useSuggestedTasks';
import { useTasks } from '@/queries/tasks/useTasks';
import { useMyProfile } from '@/queries/useMyProfile';
import { ROUTES } from '@/routes/routes';
import { Task } from '@/types';
import { assertDefined } from '@/utils/assertDefined';

const PER_PAGE = 10;

function ProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectId, workspaceId } = useParams();

  assertDefined(projectId, 'projectId is required');
  assertDefined(workspaceId, 'workspaceId is required');

  const [page, setPage] = useState(1);

  const { data: myProfile } = useMyProfile();
  const {
    data: project,
    isPending: projectPending,
    isError: projectError
  } = useProjectDetails(projectId);
  const {
    data: tasksData,
    isPending: tasksPending,
    isError: tasksError
  } = useTasks({ projectId, page, perPage: PER_PAGE });
  const { data: projectDashboardStats } = useProjectDashboardStats(projectId);
  const { data: suggestedTasks } = useSuggestedTasks({ workspaceId, projectId });

  // Suppress unused warning during development — remove when used in UI
  void myProfile;
  void projectDashboardStats;

  const mostSuggestedTaskIds = useMemo(
    () => new Set(suggestedTasks?.slice(0, 3).map((t) => t.task_id)),
    [suggestedTasks]
  );

  const suggestedTaskIds = useMemo(
    () => new Set(suggestedTasks?.map((t) => t.task_id)),
    [suggestedTasks]
  );

  const columns = useMemo<ColumnDef<Partial<Task>>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Task',
        cell: (info) => (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
            {mostSuggestedTaskIds.has(info.row.original.id!) && (
              <StatusDot status="success" size="sm" pulse={true} />
            )}
            <span>{`${info.getValue() as string}`}</span>
          </div>
        )
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
    ],
    [mostSuggestedTaskIds]
  );

  if (projectPending || tasksPending) return <div>Loading...</div>;
  if (projectError || tasksError) return <div>Error loading project.</div>;

  const tasks = tasksData?.data ?? [];
  const totalPages = Math.max(1, Math.ceil((tasksData?.total ?? 0) / PER_PAGE));

  const data: Partial<Task>[] = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    project: task.project,
    priority: task.priority,
    due_at: task.due_at,
    is_suggested: suggestedTaskIds.has(task.id)
  }));

  const handleRowClick = (rowData: Partial<Task>) => {
    navigate(ROUTES.WORKSPACES.TASKS.DETAILS(workspaceId!, rowData.id!));
  };

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.objective}</p>
      <p>{project?.description}</p>
      {tasks.length === 0 ? (
        <p>No tasks found for this project.</p>
      ) : (
        <>
          <DataTable data={data} columns={columns} selectable onRowClick={handleRowClick} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
