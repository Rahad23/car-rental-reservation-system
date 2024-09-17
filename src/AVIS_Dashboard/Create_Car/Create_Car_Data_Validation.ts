import { z } from "zod";

export const carValidationSchema = z.object({
  name: z.string().min(1, "Name is required!!"),
  description: z.string().min(1, "Description is required!!"),
  category: z.string().min(1, "Category is required!!"),
  color: z.string().min(1, "Color is required!!"),
  isElectric: z.boolean(),
  features: z.array(z.string()).nonempty("At least one feature is required!!"),
  pricePerHour: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price per hour must be a valid number!!"), // Ensures it's a string representing a number
});

export type Product = z.infer<typeof carValidationSchema>;
