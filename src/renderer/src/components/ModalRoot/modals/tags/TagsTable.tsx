import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Tag } from '@/types';

import styles from './TagsTable.module.scss';

const tagColumns: ColumnDef<Tag>[] = [
  {
    id: 'color',
    header: '',
    cell: ({ row }) => (
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: row.original.color || 'transparent',
          display: 'inline-block'
        }}
      />
    ),
    size: 32
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'task_count',
    header: '# Used',
    cell: ({ getValue }) => <span className={styles['task_count']}>{getValue<number>()} tasks</span>
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onClick={(e) => e.stopPropagation()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
    size: 48
  }
];

type Props = {
  data: Tag[];
  selectedTagIds?: string[];
  onRowClick?: (tag: Tag, isSelected: boolean) => void;
};

export function TagsTable({ data, selectedTagIds = [], onRowClick }: Props) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setRowSelection(Object.fromEntries(selectedTagIds.map((id) => [id, true])));
  }, [selectedTagIds]);

  const table = useReactTable({
    data,
    columns: tagColumns,
    getRowId: (row) => row.id,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <table className={styles.table}>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={styles.row}
            data-selected={row.getIsSelected()}
            onClick={() => {
              row.toggleSelected();
              onRowClick?.(row.original, !row.getIsSelected());
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles[cell.column.id] ?? styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
