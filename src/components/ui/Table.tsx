import type { ReactNode } from "react";

/**
 * Generic data table primitive matching the prototype's account/forecast
 * tables: elevated header row, hoverable body rows, right-aligned numeric
 * columns rendered in the mono data font (`.td1`/`.tds`/`th.r,td.r`).
 *
 * Usage:
 *   <Table
 *     columns={[
 *       { key: "name", header: "Account" },
 *       { key: "balance", header: "Balance", align: "right", mono: true },
 *     ]}
 *     rows={accounts}
 *     getRowKey={(a) => a.id}
 *   />
 *
 * For grouped/collapsible bodies (entity headers, etc.) skip `rows`/`columns`
 * and compose `<Table.Root>`, `<Table.Head>`, `<Table.Body>` directly — see
 * AccountTable.tsx for that pattern.
 */
export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  align?: "left" | "right";
  mono?: boolean;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
}

export function Table<T extends Record<string, unknown>>({ columns, rows, getRowKey, onRowClick }: TableProps<T>) {
  return (
    <TableRoot>
      <TableHead columns={columns} />
      <tbody>
        {rows.map((row) => (
          <tr
            key={getRowKey(row)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={`border-b border-border-0 hover:bg-bg-hover ${onRowClick ? "cursor-pointer" : ""}`}
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={`px-3.5 py-2.5 text-[12.5px] text-text-2 ${col.align === "right" ? "text-right" : "text-left"} ${
                  col.mono ? "font-data text-xs" : ""
                }`}
              >
                {col.render ? col.render(row) : (row[col.key] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableRoot>
  );
}

export function TableRoot({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-border-0 bg-bg-surface shadow-[var(--shadow-card)]">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function TableHead<T>({ columns }: { columns: TableColumn<T>[] }) {
  return (
    <thead>
      <tr className="bg-bg-elevated">
        {columns.map((col) => (
          <th
            key={col.key}
            className={`whitespace-nowrap border-b border-border-0 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted ${
              col.align === "right" ? "text-right" : "text-left"
            }`}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}
