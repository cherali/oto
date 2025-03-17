"use client";
import { useState } from "react";
import type { RowModel } from "@tanstack/react-table";
import { Button } from "@/components/basics/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/basics/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/basics/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/basics/tooltip";
import AppLineChart from "../charts/AppLineChart";

function AppTableVirtualized<T>({ rows }: { rows: RowModel<T> }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="population">Population</SelectItem>
              <SelectItem value="area">Area</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <TooltipProvider>
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
          <DialogTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    onClick={handleClick}
                    disabled={rows.rows.length === 0 || !value}
                  >
                    Virtualize
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-40">
                <p>
                  For data virtualization, `filed` and `some rows` must be
                  selected.
                </p>
              </TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Data Virtualization</DialogTitle>
              <DialogDescription>Line Chart: `{value}`</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <AppLineChart<T>
                data={rows.rows.map(row => row.original)}
                dataKey={value}
              />
            </div>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </>
  );
}

export default AppTableVirtualized;
