import { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { columns } from "@/components/admin/columns"
import { DataTable } from "@/components/admin/data-table"
import { invoiceSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Invoices",
  description: "A task and issue tracker build using Tanstack Table.",
}

export default async function Invoices() {
  // const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.WEBSERVICE_URL}invoices`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          // "Authorization": `Bearer ${session?.user?.token}`
      },
      cache: 'no-store',
  })
  const data = await res.json()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center justify-start space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
