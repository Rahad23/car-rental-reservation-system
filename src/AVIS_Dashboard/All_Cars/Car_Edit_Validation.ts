import { z } from "zod";

export const carUpdateValidationSchema = z.object({
  name: z.string().min(1, "Name is required!!").optional(),
  description: z.string().min(1, "Description is required!!").optional(),
  category: z.string().min(1, "Category is required!!").optional(),
  color: z.string().min(1, "Color is required!!").optional(),
  isElectric: z.boolean().optional(),
  features: z
    .array(z.string())
    .nonempty("At least one feature is required!!")
    .optional(),
  pricePerHour: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price per hour must be a valid number!!")
    .optional(), // Ensures it's a string representing a number
});

export type Product = z.infer<typeof carUpdateValidationSchema>;
