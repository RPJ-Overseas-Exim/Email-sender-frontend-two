import { z } from "zod";

const UserZod = z.object({
  id: z.string().optional(),
  username: z.string().min(3, "Username must be of at least 3 letters"),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
  password: z
    .string()
    .min(8, "Password must be of at least 8 length")
    .max(16, "Password cannot exceed 16 length"),
});
export default UserZod;
export type User = z.infer<typeof UserZod>;
