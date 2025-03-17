"use client";
import type { CountryData } from "@/types/Country";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./basics/checkbox";
import Image from "next/image";

export const columns: ColumnDef<CountryData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name.official",
    id: "name",
    header: "Country Name",
    cell: ({ cell, column }) => {
      return (
        <span className="inline-flex justify-between w-full gap-2">
          <span className="--column-text font-bold text-white/40">
            {column.columnDef.header as string}
          </span>
          <span className="flex-1 overflow-ellipsis block whitespace-nowrap overflow-hidden max-md:text-end">
            {cell.getValue() as string}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "capital",
    header: "Capital",
    cell: ({ cell }) => {
      return (
        <span className="inline-flex justify-between w-full">
          <span className="--column-text font-bold text-white/40">
            {cell.column.columnDef.header as string}
          </span>
          {cell.getValue() as string}
        </span>
      );
    },
  },
  {
    accessorKey: "population",
    header: "Population",
    cell: ({ cell }) => {
      return (
        <span className="inline-flex justify-between w-full">
          <span className="--column-text font-bold text-white/40">
            {cell.column.columnDef.header as string}
          </span>
          {cell.getValue() as string}
        </span>
      );
    },
  },
  {
    accessorKey: "area",
    header: () => (
      <span>
        Area
        <sup>
          ( km<sup>2</sup>)
        </sup>
      </span>
    ),
    cell: ({ cell }) => {
      const header = cell.column.columnDef.header as Function;
      return (
        <span className="inline-flex justify-between w-full">
          <span className="--column-text font-bold text-white/40">
            {header()}
          </span>
          {cell.getValue() as string}
        </span>
      );
    },
  },
  {
    accessorKey: "flags",
    header: "Flag",
    cell: ({ cell }) => {
      return (
        <span className="inline-flex justify-between w-full">
          <span className="--column-text font-bold text-white/40">
            {cell.column.columnDef.header as string}
          </span>
          <span className="relative block w-auto h-5 flex-1 -flag">
            <Image
              fill
              src={
                (cell.getValue() as string[]).find(
                  item => item.indexOf(".svg") > -1,
                )!
              }
              alt="Flag"
              className="w-auto! object-contain"
            />
          </span>
        </span>
      );
    },
  },
];
