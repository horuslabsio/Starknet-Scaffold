"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/components/ui_components/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Resource = {
  id: string;
  name: string;
  description: string;
  address: string;
};

export const columns: ColumnDef<Resource>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description: string = row.getValue("description");

      return (
        <div className="text-left font-medium line-clamp-2">{description}</div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address: string = row.getValue("address");

      return (
        <Link className="text-right font-medium" href={address} target="_blank">
          {address.split("/")[address.split("/").length - 1]}
        </Link>
      );
    },
  },
];
