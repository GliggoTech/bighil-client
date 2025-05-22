import { Shield, User } from "lucide-react";
import { z } from "zod";

export const clientAdminSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactNumber: z
    .string()
    .regex(/^\+\d{1,15}$/, "Invalid phone number format"),
  admins: z
    .array(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        role: z.enum(["SUPER ADMIN", "ADMIN", "SUB ADMIN"]),
      })
    )
    .nonempty("At least one admin required"),
  companyAddress: z
    .string()
    .min(2, "Company address must be at least 2 characters"),

  companySize: z.coerce.number().min(1, "Company size must be at least 1"),
  companyType: z.string().min(2, "Company type must be at least 2 characters"),
  companyEmail: z.string().email("Invalid email address"),
});
export const roleColors = {
  "SUPER ADMIN": "bg-gradient-to-r from-indigo to-indigo/50",
  ADMIN: "bg-gradient-to-r from-blue to-blue/50",
  "SUB ADMIN": "bg-gradient-to-r from-green to-green/80",
};
export const roleIcons = {
  "SUPER ADMIN": <Shield className="h-4 w-4 mr-2" />,
  ADMIN: <User className="h-4 w-4 mr-2" />,
  "SUB ADMIN": <User className="h-4 w-4 mr-2" />,
};

export const roleBadgeColors = {
  "SUPER ADMIN":
    "bg-purple/10 text-purple dark:bg-purple dark:text-purple-200 hover:bg-purple/20",
  ADMIN:
    "bg-blue/10 text-blue dark:bg-blue-900 dark:text-blue-200 hover:bg-blue/20",
  "SUB ADMIN":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 hover:bg-emerald-200",
};
