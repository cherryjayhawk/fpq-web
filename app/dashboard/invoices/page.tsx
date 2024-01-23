import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/admin/columns"
import { DataTable } from "@/components/admin/data-table"
import { invoiceSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Invoices",
  description: "A task and issue tracker build using Tanstack Table.",
}

async function getInvoices() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/dashboard/invoices/data/invoices.json")
  )

  const invoices = JSON.parse(data.toString())

  return z.array(invoiceSchema).parse(invoices)
}

export default async function Invoices() {
  const invoices = await getInvoices()
  // console.log(invoices)

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center justify-start space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          </div>
        </div>
        <DataTable data={invoices} columns={columns} />
      </div>
    </>
  )
}
