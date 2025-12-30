import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState
} from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { Task } from '@/types';

import styles from './TaskTable.module.scss';

type Props = {
  tasks: Task[];
  isLoading?: boolean;
  onRowClick?: (id: string) => void;
  darkMode?: boolean;
};

const columnHelper = createColumnHelper<Task>();

function TaskTable({ tasks, isLoading = false, onRowClick, darkMode = false }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => info.getValue(),
        enableSorting: true
      }),
      columnHelper.accessor('priority', {
        header: 'Priority',
        cell: (info) => {
          const v = info.getValue();
          return <span className={`${styles.badge} ${styles[`priority-${v}`]}`}>{v}</span>;
        },
        enableSorting: true
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const v = info.getValue();
          return (
            <span className={`${styles.badge} ${styles[`status-${v}`]}`}>
              {v!.replace('_', ' ')}
            </span>
          );
        },
        enableSorting: true
      }),
      columnHelper.accessor('due_at', {
        header: 'Due',
        cell: (info) => {
          const v = info.getValue();
          return v ? formatDistanceToNow(new Date(v), { addSuffix: true }) : '-';
        },
        enableSorting: true
      })
    ],
    []
  );

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false // let React Table handle sorting internally
  });

  return (
    <table className={`${styles.table} ${darkMode ? styles.dark : ''}`}>
      <thead className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort();
              const sortState = header.column.getIsSorted();
              return (
                <th
                  key={header.id}
                  className={styles.th}
                  onClick={() => canSort && header.column.toggleSorting()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortState ? (
                    sortState === 'asc' ? (
                      <ChevronUp size={12} style={{ marginLeft: '8px' }} />
                    ) : (
                      <ChevronDown size={12} style={{ marginLeft: '8px' }} />
                    )
                  ) : null}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length} className={styles.empty}>
              Loading…
            </td>
          </tr>
        ) : tasks.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className={styles.empty}>
              No tasks found
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.original.id}
              className={styles.tr}
              onClick={() => onRowClick?.(row.original.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <td className={styles.td} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default React.memo(TaskTable);
