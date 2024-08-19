import { z } from "zod";

export const CustomerZod = z.object({
  id: z.string().optional(),
  name: z.string(),
  product: z.string(),
  status: z.enum(["pending", "sent"]),
  email: z.string().email(),
});

export type Customer = z.infer<typeof CustomerZod>;
