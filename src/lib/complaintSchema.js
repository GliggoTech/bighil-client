import { z } from "zod";

export const formSchema = z.object({
  companyName: z.string().min(1, "Company selection required"),
  complaintAgainst: z.string().min(1, "Complaint title is required"),
  complaintMessage: z
    .string()
    .min(2, "Description must be at least 20 characters"),
  tags: z.array(z.string()).optional(),
  files: z.array(z.instanceof(File)).optional(),
});
