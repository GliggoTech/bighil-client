import { z } from "zod";

export const timeSlots = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",

  "Anytime",
];

export const clientRequestFormSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),
  numberOfEmployees: z
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be a positive number"),
  companyEmail: z.string().trim().toLowerCase().email("Invalid email address"),
  // subject: z.string().min(3, "Subject is required"),
  message: z

    .string()
    .trim()
    // .min(10, "Message should be at least 10 characters")
    .optional(),
  // bestContactDate: z.date({ required_error: "Date is required" }),
  // bestContactTime: z.string().min(1, "Please select a time"),
});
