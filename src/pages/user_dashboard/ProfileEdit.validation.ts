import { z } from "zod";

export const updateUserDataSchema = z.object({
  name: z.string().min(1, "Name is required"), // Ensures name is a non-empty string
  email: z.string().email("Invalid email address"), // Validates a proper email format
  phone: z.string().min(11, "Phone number must be at least 11 digits"), // Validates a phone number (adjust as needed)
  address: z.string().min(1, "Address is required"), // Ensures address is a non-empty string
});

// You can extract the inferred TypeScript type from the schema if needed
export type TRegister = z.infer<typeof updateUserDataSchema>;
