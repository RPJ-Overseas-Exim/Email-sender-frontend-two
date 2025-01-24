import { z } from "zod";

export const CustomerZod = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  productId: z.string().min(12),
  status: z.enum(["pending", "sent"]),
  email: z.string().email(),
  number: z.string().optional(),
  updatedAt: z.date()
});

export type Customer = z.infer<typeof CustomerZod>;
