// DataTable.tsx
import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import styles from './DataTable.module.scss';

type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onRowClick?: (row: TData) => void;
  selectable?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
  density?: 'compact' | 'default' | 'spacious';
  className?: string;
};

export function DataTable<TData, TValue>({
  data,
  columns,
  onRowClick,
  selectable = false,
  onSelectionChange,
  density = 'default',
  className
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectionColumn = useMemo<ColumnDef<TData>>(
    () => ({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          ref={(el) => {
            if (el) el.indeterminate = table.getIsSomeRowsSelected();
          }}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          onClick={(e) => e.stopPropagation()}
        />
      ),
      size: 40
    }),
    []
  );

  const finalColumns = useMemo(
    () => (selectable ? [selectionColumn, ...columns] : columns),
    [selectable, selectionColumn, columns]
  );

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      rowSelection
    },
    enableRowSelection: selectable,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel()
  });

  // Notify parent when selection changes
  useMemo(() => {
    if (!onSelectionChange) return;
    const selected = table.getSelectedRowModel().rows.map((row) => row.original);
    onSelectionChange(selected);
  }, [rowSelection]);

  return (
    <div
      className={`
    ${styles.wrapper}
    ${styles[density ?? 'default']}
    ${className ?? ''}
  `}
    >
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.headerCell}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className={`${styles.row} ${
                onRowClick ? styles.clickable : ''
              } ${row.getIsSelected() ? styles.selected : ''}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
