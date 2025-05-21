import { z } from "zod";

// Constants for enums
export const submissionTypesForFormSchema = [
  "Complaint",
  "Suggestion",
  "Feedback",
  "Others",
];
export const complaintTypes = ["Anonymous", "Non-Anonymous"];
export const formSchema = z.object({
  companyName: z.string().min(1, "Company selection required"),
  submissionType: z.enum(submissionTypesForFormSchema, {
    required_error: "Submission type is required",
  }),
  complaintMessage: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  tags: z.array(z.string()).optional(),
  files: z.array(z.instanceof(File)).optional(),
  department: z.string().min(1, "Department selection required"),
  complaintType: z.enum(complaintTypes, {
    required_error: "Complaint type is required",
  }),
});

export const submissionTypes = [
  { label: "Complaint", value: "Complaint" },
  { label: "Suggestion", value: "Suggestion" },
  { label: "Feedback", value: "Feedback" },
  { label: "Others", value: "Others" },
];

export const officeDepartments = [
  { label: "HR Department", value: "HR Department" },
  { label: "IT Department", value: "IT Department" },
  { label: "Finance Department", value: "Finance Department" },
  { label: "Legal Department", value: "Legal Department" },
  { label: "Marketing Department", value: "Marketing Department" },
  { label: "Sales Department", value: "Sales Department" },
  { label: "Customer Support", value: "Customer Support" },
  { label: "Operations", value: "Operations" },
  { label: "Procurement", value: "Procurement" },
  { label: "Administration", value: "Administration" },
  { label: "Research and Development", value: "Research and Development" },
  { label: "Product Management", value: "Product Management" },
  { label: "Engineering", value: "Engineering" },
  { label: "Design Team", value: "Design Team" },
  { label: "Quality Assurance", value: "Quality Assurance" },
  { label: "Business Development", value: "Business Development" },
  { label: "Strategy & Planning", value: "Strategy & Planning" },
  { label: "Training and Development", value: "Training and Development" },
  { label: "Public Relations", value: "Public Relations" },
  { label: "Investor Relations", value: "Investor Relations" },
  { label: "Logistics", value: "Logistics" },
  { label: "Security", value: "Security" },
  { label: "Compliance", value: "Compliance" },
  { label: "Data Analytics", value: "Data Analytics" },
  { label: "Content Team", value: "Content Team" },
  { label: "Recruitment", value: "Recruitment" },
  { label: "Facilities Management", value: "Facilities Management" },
  { label: "Internal Audit", value: "Internal Audit" },
  { label: "Event Management", value: "Event Management" },
  { label: "Legal Compliance", value: "Legal Compliance" },
  { label: "Payroll", value: "Payroll" },
  { label: "IT Infrastructure", value: "IT Infrastructure" },
  { label: "Network Operations", value: "Network Operations" },
  { label: "Mobile Development", value: "Mobile Development" },
  { label: "Web Development", value: "Web Development" },
  { label: "Technical Support", value: "Technical Support" },
  { label: "UX Research", value: "UX Research" },
  { label: "Accounting", value: "Accounting" },
  { label: "Brand Management", value: "Brand Management" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "Affiliate Marketing", value: "Affiliate Marketing" },
  { label: "SEO Team", value: "SEO Team" },
  { label: "Social Media Team", value: "Social Media Team" },
  { label: "Customer Success", value: "Customer Success" },
  { label: "Innovation Lab", value: "Innovation Lab" },
  { label: "Cloud Services", value: "Cloud Services" },
  { label: "Data Science", value: "Data Science" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Executive Office", value: "Executive Office" },
];
