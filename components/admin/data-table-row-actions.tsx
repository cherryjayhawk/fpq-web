"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { useReactTable } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { dateFormatter } from '@/components/functions/dateFormat'
import { currencyFormatter } from '@/components/functions/currencyFormat'

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { invoiceSchema } from "@/app/dashboard/invoices/data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

const FormSchema = z.object({
  id: z.string({
    required_error: "ID not found.",
  }),
  status: z.string({
      required_error: "Please select status.",
  }),
  priority: z.string({
    required_error: "Please select priority.",
  }),
})

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const invoice = invoiceSchema.parse(row.original)
  // console.log(invoice.note)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: invoice.id,
      status: invoice.status,
      priority: invoice.priority
    }
  })
 
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        > 
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-dvh overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">ID - <span>{ invoice.id }</span></AlertDialogTitle>
          <AlertDialogDescription className="text-center">
              { invoice.name } - { invoice.email } <br />
              { invoice.payment_option } <br />
              { dateFormatter(invoice.timestamp) } 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Al-qur&lsquo;an Besar</TableCell>
              <TableCell>{ invoice.items.QB_quantity }</TableCell>
              <TableCell>{ currencyFormatter.format(invoice.items.QB_price) }</TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.items.QB_amount) }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Al-qur&lsquo;an Kecil</TableCell>
              <TableCell>{ invoice.items.QK_quantity }</TableCell>
              <TableCell>{ currencyFormatter.format(invoice.items.QK_price) }</TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.items.QK_amount) }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Guru Ngaji</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.items.GN_amount) }</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{ currencyFormatter.format(invoice.total) }</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Textarea disabled value={invoice.note}/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="hidden" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="backlog"><span className="flex gap-2 items-center"><QuestionMarkCircledIcon />Backlog</span></SelectItem>
                      <SelectItem value="todo"><span className="flex gap-2 items-center"><CircleIcon />Todo</span></SelectItem>
                      <SelectItem value="in_progress"><span className="flex gap-2 items-center"><StopwatchIcon />In Progress</span></SelectItem>
                      <SelectItem value="done"><span className="flex gap-2 items-center"><CheckCircledIcon />Done</span></SelectItem>
                      <SelectItem value="canceled"><span className="flex gap-2 items-center"><CrossCircledIcon />Canceled</span></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high"><span className="flex gap-2 items-center"><ArrowUpIcon />High</span></SelectItem>
                      <SelectItem value="medium"><span className="flex gap-2 items-center"><ArrowRightIcon />Medium</span></SelectItem>
                      <SelectItem value="low"><span className="flex gap-2 items-center"><ArrowDownIcon />Low</span></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Save</Button>
              </AlertDialogAction>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

