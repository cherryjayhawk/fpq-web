import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const invoiceSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string(),
  status: z.string(),
  note: z.string(),
  priority: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  items: z.object({
      QB_quantity: z.number(),
      QB_price: z.number(),
      QB_amount: z.number(),
      QK_quantity: z.number(),
      QK_price: z.number(),
      QK_amount: z.number(),
      GN_amount: z.number(),
  }),
  total: z.number()
})

export type Invoice = z.infer<typeof invoiceSchema>
