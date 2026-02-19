import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import styles from './DataTable.module.scss';

type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onRowClick?: (row: TData) => void;
  className?: string;
};

export function DataTable<TData, TValue>({
  data,
  columns,
  onRowClick,
  className
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
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
              className={`${styles.row} ${onRowClick ? styles.clickable : ''}`}
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
