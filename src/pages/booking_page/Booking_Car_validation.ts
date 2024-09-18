import { z } from "zod";

export const carBookingValidationSchema = z.object({
    carId: z.string().min(1, "Name is required!!"),
    startTime: z.string().min(1, "Start Time Required"),
    date: z.string().min(1, "Date is required")
  
});

export type Product = z.infer<typeof carBookingValidationSchema>;
