import { z } from "zod";

const SchedulerZod = z.object({
  hour: z
    .string()
    .min(1, "Please provide hour value")
    .max(2, "Hours cannot exceed 2 digits")
    .refine((hour) => {
      if (isNaN(parseInt(hour))) {
        return false;
      }
      return true;
    }),
  minute: z
    .string()
    .min(1, "Please provide minute value")
    .max(2, "Minutes cannot exceed 2 digits")
    .refine((minute) => {
      if (isNaN(parseInt(minute))) {
        return false;
      }
      return true;
    }),
  type: z.enum(["enquiry", "reorder", "reorderDefault", "enquiryDefault"]),
  daysOfWeek: z.string().default("?"),
  products: z.array(z.string()),
  limit: z.string().superRefine((limit, ctx) => {
    if (isNaN(parseInt(limit))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please pass a number value",
      });
      return false;
    }
    if (parseInt(limit) > 700) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 700,
        type: "number",
        inclusive: true,
        message: "limit cannot exceed 700",
      });
      return false;
    }
    return true;
  }),
  allProducts: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
});

export type TypeEnum =
  | "enquiry"
  | "reorder"
  | "reorderDefault"
  | "enquiryDefault";

export default SchedulerZod;

export type Scheduler = z.infer<typeof SchedulerZod>;
