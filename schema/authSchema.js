import { email, z } from "zod";

const authSchema = z.object({
  name: z.string().min(2, "name is required"),
  email: z.string().email("email must be valid"),
  password: z
    .string()
    .min(6, "password must be at least 6 character")
    .max(20, "password must be at most 20 charater"),
    role:z.string().optional()
});

export default authSchema;
