import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'react-router-dom';

import { DataTable } from '@/components/Tables/DataTable/DataTable';
import { useProjectDashboardStats } from '@/queries/projects/useProjectDashboardStats';
import { useProjectDetails } from '@/queries/projects/useProjectDetails';
import { useSuggestedTasks } from '@/queries/tasks/useSuggestedTasks';
import { useTasks } from '@/queries/tasks/useTasks';
import { useMyProfile } from '@/queries/useMyProfile';
import { Task } from '@/types';
import { assertDefined } from '@/utils/assertDefined';

type Props = {};

function ProjectDetailsPage({}: Props) {
  const { projectId, workspaceId } = useParams();

  assertDefined(projectId, 'projectId is required');
  assertDefined(workspaceId, 'workspaceId is required');

  const { data: myProfile } = useMyProfile();
  const { data: project } = useProjectDetails(projectId);
  const { data: tasksData } = useTasks({ projectId: projectId });
  const { data: projectDashboardStats } = useProjectDashboardStats(projectId);
  const { data: suggestedTasks } = useSuggestedTasks({
    workspaceId,
    projectId
  });

  console.log('Fetched Datasets:', {
    myProfile,
    project,
    tasksData,
    projectDashboardStats,
    suggestedTasks
  });

  const tasks = tasksData?.data || [];
  const suggestedTaskIds = new Set(suggestedTasks?.map((t) => t.task_id));

  console.log('Project Dashboard Stats:', projectDashboardStats);
  console.log('Suggested Tasks:', suggestedTasks);

  const columns: ColumnDef<Partial<Task>>[] = [
    {
      accessorKey: 'title',
      header: 'Task',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'is_suggested',
      header: 'Suggested',
      cell: (info) => (suggestedTaskIds.has(info.row.original.id!) ? 'Yes' : 'No')
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
    tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      project: task.project,
      priority: task.priority,
      due_at: task.due_at,
      is_suggested: suggestedTaskIds.has(task.id)
    })) || [];

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.objective}</p>
      <p>{project?.description}</p>
      {tasks.length === 0 ? (
        <p>No tasks found for this project.</p>
      ) : (
        <DataTable data={data} columns={columns} onRowClick={(rowData) => console.log(rowData)} />
      )}
    </div>
  );
}

export default ProjectDetailsPage;
