import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { createTask } from '@/api/tasks';
import Modal from '@/components/Modal/Modal';
import { DataTable } from '@/components/Tables/DataTable/DataTable';
import { Task } from '@/types';

type Props = {
  tasks: Task[];
  isLoading: boolean;
  projectId: string;
  workspaceId: string;
  onClose: () => void;
};

export default function GeneratedTasksModal({
  tasks,
  isLoading,
  projectId,
  workspaceId,
  onClose
}: Props) {
  const qc = useQueryClient();
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    if (!isLoading) setTaskList(tasks);
  }, [isLoading, tasks]);

  const removeFromCache = (task: Task) => {
    qc.setQueryData<Task[]>(
      ['generated-plan', projectId, workspaceId],
      (old) => old?.filter((t) => t !== task) ?? []
    );
  };

  const { mutate: addTask } = useMutation({
    mutationFn: (task: Task) =>
      createTask({
        title: task.title,
        workspace_id: workspaceId,
        project_id: projectId,
        status: task.status,
        priority: task.priority,
        description: task.description
      }),
    onSuccess: (_data, task) => {
      setTaskList((prev) => prev.filter((t) => t !== task));
      removeFromCache(task);
      qc.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleDismiss = (task: Task) => {
    setTaskList((prev) => prev.filter((t) => t !== task));
  };

  const columns: ColumnDef<Task>[] = [
    { accessorKey: 'title', header: 'Task' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'priority', header: 'Priority' },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <button
            title="Dismiss"
            onClick={() => handleDismiss(row.original)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: 'var(--error)',
              color: '#fff'
            }}
          >
            <X size={13} />
          </button>
          <button
            title="Add to project"
            onClick={() => addTask(row.original)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: 'var(--success)',
              color: '#fff'
            }}
          >
            <Check size={13} />
          </button>
        </div>
      )
    }
  ];

  return (
    <Modal open onClose={onClose}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '600px'
        }}
      >
        <h2 style={{ margin: 0 }}>Generated Tasks</h2>
        {isLoading ? (
          <div>Generating tasks...</div>
        ) : taskList.length === 0 ? (
          <div>No tasks were generated.</div>
        ) : (
          <DataTable data={taskList} columns={columns} />
        )}
      </div>
    </Modal>
  );
}
