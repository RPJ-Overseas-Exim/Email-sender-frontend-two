import { z } from "zod";
export const TemplateZod = z.object({
  id:z.string().optional(),
  name: z
    .string()
    .min(3, "name of the template should be at least 3 letters long"),
  type: z.enum(["reorder", "enquiry"]),
  subject: z.string().min(3, "Subject line should be at least 3 letters long"),
  body: z.string().min(16, "body should be at least 16 letters long."),
});

export type Template = z.infer<typeof TemplateZod>;
