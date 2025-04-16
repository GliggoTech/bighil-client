"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Building,
  User,
  Phone,
  Mail,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

const formSchema = z.object({
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
});

const roleColors = {
  "SUPER ADMIN": "bg-gradient-to-r from-purple-600 to-indigo-600",
  ADMIN: "bg-gradient-to-r from-blue-500 to-cyan-500",
  "SUB ADMIN": "bg-gradient-to-r from-emerald-500 to-teal-500",
};

const roleIcons = {
  "SUPER ADMIN": <Shield className="h-4 w-4 mr-2" />,
  ADMIN: <User className="h-4 w-4 mr-2" />,
  "SUB ADMIN": <User className="h-4 w-4 mr-2" />,
};

const roleBadgeColors = {
  "SUPER ADMIN":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  ADMIN: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "SUB ADMIN":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
};

export default function CompanyRegistrationForm({
  setOpen,
  selectedClient,
  currentClients,
  setCurrentClients,
  setSelectedClient,
}) {
  const [assignedRoles, setAssignedRoles] = useState({
    "SUPER ADMIN": false,
    ADMIN: false,
    "SUB ADMIN": false,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: selectedClient || {
      companyName: "",
      contactNumber: "+",
      admins: [{ name: "", email: "", role: "SUPER ADMIN" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "admins",
  });

  const token = useAccessToken();
  const { loading, error, fetchData } = useFetch();

  const admins = form.watch("admins");

  useEffect(() => {
    if (admins) {
      const roles = {
        "SUPER ADMIN": false,
        ADMIN: false,
        "SUB ADMIN": false,
      };

      admins.forEach((admin) => {
        if (admin.role) {
          roles[admin.role] = true;
        }
      });

      setAssignedRoles(roles);
    }
  }, [admins]);

  async function onSubmit(values) {
    const url = getBackendUrl();
    let res;

    if (selectedClient) {
      res = await fetchData(
        `${url}/api/bighil-clients/edit-client/${selectedClient._id}`,
        "PATCH",
        values,
        token,
        false
      );
    } else {
      res = await fetchData(
        `${url}/api/bighil-clients/add-new-client`,
        "POST",
        values,
        token,
        false
      );
    }

    if (res.success) {
      toast({
        variant: "success",
        title: selectedClient
          ? "Company Updated Successfully"
          : "Company Registration Successful",
        description: selectedClient
          ? "The company details have been updated successfully."
          : "Your company has been registered successfully.",
        duration: 5000,
      });

      setOpen(false);

      if (selectedClient) {
        const updatedClients = currentClients.map((client) =>
          client._id === selectedClient._id ? res.data : client
        );
        setCurrentClients(updatedClients);
        setSelectedClient(null);
      } else {
        setCurrentClients([...currentClients, res.data]);
        setSelectedClient(null);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description:
          res.message || "An error occurred while processing the request.",
        duration: 5000,
      });
    }
  }

  return (
    <div className="w-full">
      <Card className="border-0 shadow-none">
        <CardHeader className="pt-8 pb-6 px-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedClient ? "Update Company" : "Register New Company"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Fill in the company details and add admin accounts. The first
                admin will automatically be assigned as a Super Admin.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-8 space-y-8 bg-white">
              {/* Company Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 bg-white">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Company Information
                  </h3>
                </div>
                <Separator className="bg-gray-200 dark:bg-gray-700" />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <Building className="h-4 w-4 text-primary" />
                          <span>Company Name</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme Corporation"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500 dark:text-gray-400">
                          Enter the official registered name of the company
                        </FormDescription>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <Phone className="h-4 w-4 text-primary" />
                          <span>Contact Number</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1234567890"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\+?[\d]*$/.test(value)) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500 dark:text-gray-400">
                          Include country code (e.g., +1 for US)
                        </FormDescription>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Admins Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                      <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Admin Accounts
                    </h3>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            append({
                              name: "",
                              email: "",
                              role: assignedRoles["SUPER ADMIN"]
                                ? assignedRoles["ADMIN"]
                                  ? "SUB ADMIN"
                                  : "ADMIN"
                                : "SUPER ADMIN",
                            })
                          }
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-primary/30 transition-all"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Admin
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 text-white border-gray-700">
                        Add another administrator to this company
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Separator className="bg-gray-200 dark:bg-gray-700" />

                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className={cn(
                        "space-y-5 p-5 rounded-xl border border-gray-200 dark:border-gray-700",
                        "transition-all hover:border-primary/50 hover:shadow-sm",
                        "relative group bg-white dark:bg-gray-800/50"
                      )}
                    >
                      <div className="absolute -top-3 left-4 bg-white dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center">
                        Admin #{index + 1}
                        {index === 0 && (
                          <Badge className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-200">
                            Primary
                          </Badge>
                        )}
                      </div>

                      {index > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  "absolute -right-0 top-0 opacity-0 group-hover:opacity-100",
                                  "transition-opacity rounded-full w-8 h-8",
                                  "bg-red-500 hover:bg-red-600 text-white"
                                )}
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 text-white border-gray-700">
                              <p>Remove this admin</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      <FormField
                        control={form.control}
                        name={`admins.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                              <User className="h-4 w-4 text-primary" />
                              <span>Full Name</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name={`admins.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>Email Address</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john@company.com"
                                  {...field}
                                  className="border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                  type="email"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`admins.${index}.role`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                <span>Role</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={index === 0}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                    <div className="flex items-center">
                                      {roleIcons[field.value]}
                                      <SelectValue placeholder="Select role" />
                                    </div>
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                                  <SelectItem
                                    value="SUPER ADMIN"
                                    disabled={
                                      assignedRoles["SUPER ADMIN"] &&
                                      field.value !== "SUPER ADMIN"
                                    }
                                    className="hover:bg-purple-50 dark:hover:bg-gray-700"
                                  >
                                    <div className="flex items-center">
                                      {/* {roleIcons["SUPER ADMIN"]} */}
                                      <span>Super Admin</span>
                                      {field.value === "SUPER ADMIN" && (
                                        <Badge
                                          className={`ml-2 ${roleBadgeColors["SUPER ADMIN"]}`}
                                        >
                                          Current
                                        </Badge>
                                      )}
                                    </div>
                                  </SelectItem>
                                  <SelectItem
                                    value="ADMIN"
                                    disabled={
                                      assignedRoles["ADMIN"] &&
                                      field.value !== "ADMIN"
                                    }
                                    className="hover:bg-blue-50 dark:hover:bg-gray-700"
                                  >
                                    <div className="flex items-center">
                                      {/* {roleIcons["ADMIN"]} */}
                                      <span>Admin</span>
                                      {field.value === "ADMIN" && (
                                        <Badge
                                          className={`ml-2 ${roleBadgeColors["ADMIN"]}`}
                                        >
                                          Current
                                        </Badge>
                                      )}
                                    </div>
                                  </SelectItem>
                                  <SelectItem
                                    value="SUB ADMIN"
                                    disabled={
                                      assignedRoles["SUB ADMIN"] &&
                                      field.value !== "SUB ADMIN"
                                    }
                                    className="hover:bg-emerald-50 dark:hover:bg-gray-700"
                                  >
                                    <div className="flex items-center">
                                      {/* {roleIcons["SUB ADMIN"]} */}
                                      <span>Sub Admin</span>
                                      {field.value === "SUB ADMIN" && (
                                        <Badge
                                          className={`ml-2 ${roleBadgeColors["SUB ADMIN"]}`}
                                        >
                                          Current
                                        </Badge>
                                      )}
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-gray-500 dark:text-gray-400">
                                {index === 0
                                  ? "The first admin must be Super Admin"
                                  : "Each role can only be assigned once"}
                              </FormDescription>
                              <FormMessage className="text-red-500 dark:text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            {error && (
              <div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-8 pb-4"
              >
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-4 text-center border border-red-200 dark:border-red-800">
                  {error}
                </div>
              </div>
            )}

            <CardFooter className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-6 px-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-primary/30 transition-all relative overflow-hidden"
              >
                {loading && <span className="absolute inset-0 bg-primary/20" />}
                <span className="relative z-10 flex items-center">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {selectedClient ? "Updating..." : "Registering..."}
                    </>
                  ) : selectedClient ? (
                    "Update Company"
                  ) : (
                    "Register Company"
                  )}
                </span>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
