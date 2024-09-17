import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .max(15, { message: "Phone number must not exceed 15 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
});

export type Order = z.infer<typeof registrationSchema>;
