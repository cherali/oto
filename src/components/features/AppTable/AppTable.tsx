"use client";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/basics/button";
import { Input } from "@/components/basics/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/basics/table";

import AppTableVirtualized from "./AppTableVirtualized";

type AppTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
};

function AppTable<T>({ columns, data }: AppTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });
  const headers = useMemo(() => table.getFlatHeaders(), []);

  const columnSizeVars = useMemo(() => {
    const colSizes: { [key: string]: number } = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizing]);

  return (
    <div className="w-full" style={{ ...columnSizeVars }}>
      <div className="flex items-center py-4 gap-2 max-md:flex-col">
        <Input
          placeholder="Filter Countries..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <AppTableVirtualized<T> rows={table.getSelectedRowModel()} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary/10 hover:bg-primary/15 h-14 flex my-auto"
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className="inline-flex overflow-hidden text-ellipsis my-auto items-center"
                      style={{
                        width: `calc(var(--header-${header?.id}-size) * 1px)`,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="inline-block overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 p-4 max-md:flex-col max-md:gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="gap-2 flex items-center max-md:flex-col max-md:gap-4">
          <p className="text-sm text-white/80">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppTable;
