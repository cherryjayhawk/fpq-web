"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/admin/data-table-view-options"
import { priorities, statuses } from "../../app/dashboard/invoices/data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  usage?: string
}

export function DataTableToolbar<TData>({
  table,
  usage
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {
          usage === 'penyaluran' ? (
            <Input
            placeholder="Cari nama wakif"
            value={(table.getColumn("fullname")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("fullname")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />    
          ) : (
            <Input
              placeholder="Cari email"
              value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )
        }
        {usage !== 'penyaluran' && table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {
        usage === 'penyaluran' ? (
          <HoverCard>
            <HoverCardTrigger>
              <HelpCircle color="#6b7280" className="cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>
              Setiap pembaharuan status penyaluran akan kami kirimkan ke email Anda.
            </HoverCardContent>
          </HoverCard>
        ) : (
          <DataTableViewOptions table={table} />
        )
      }
    </div>
  )
}
