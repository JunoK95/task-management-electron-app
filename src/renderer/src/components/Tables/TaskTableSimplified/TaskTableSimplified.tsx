import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

import { Task } from '@/types';

import styles from './TaskTableSimplified.module.scss';

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'title'
  },
  {
    accessorKey: 'due_at',
    header: 'due date',
    cell: ({ getValue }) => {
      const dueAt = getValue<string | null>();
      if (!dueAt) {
        return 'No due date';
      }
      return dueAt ? formatDistanceToNow(new Date(dueAt), { addSuffix: true }) : '-';
    },
    meta: {
      className: styles['due_date']
    }
  }
];

type Props = {
  data: Task[];
  onRowClick?: (task: Task, isSelected: boolean) => void;
};

export function TaskTableSimplified({ data, onRowClick }: Props) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <table className={styles.table}>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length} className={clsx(styles.cell, styles['no-data'])}>
              No upcoming tasks
            </td>
          </tr>
        )}
        {table.getRowModel().rows.map((row) => {
          const isSelected = row.getIsSelected();
          return (
            <tr
              key={row.id}
              className={styles.row}
              data-selected={isSelected}
              onClick={() => {
                const nextSelected = !isSelected;

                onRowClick?.(row.original, nextSelected);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${styles[cell.column.id] ?? styles.cell} ${cell.column.id === 'due_at' ? styles['due_date'] : ''}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
