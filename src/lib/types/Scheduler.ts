import { z } from "zod";
const SchedulerZod = z.object({
  hour: z
    .string()
    .min(1, "Please provide hour")
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
});
export type TypeEnum =
  | "enquiry"
  | "reorder"
  | "reorderDefault"
  | "enquiryDefault";

export default SchedulerZod;
export type Scheduler = z.infer<typeof SchedulerZod>;
