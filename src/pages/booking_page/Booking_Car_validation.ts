import { z } from "zod";

export const carBookingValidationSchema = z.object({
  carId: z.string().min(1, "Name is required!!"),
  startTime: z.string().min(1, "Start Time Required"),
  date: z.string().min(1, "Date is required"),
  pass_nid: z.string().min(1, "Passport/Nid number is required!"),
  driving_license: z.string().min(1, "Driving License number is required!"),
});

export type Product = z.infer<typeof carBookingValidationSchema>;
