"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
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
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { getToken } from "@/lib/getToken";
import useAccessToken from "@/custome hooks/useAccessToken";

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
        // password: z.string().min(8, "Password must be at least 8 characters"),
        role: z.enum(["SUPER ADMIN", "ADMIN", "SUB ADMIN"]),
      })
    )
    .nonempty("At least one admin required"),
});

export default function CompanyRegistrationForm({
  setOpen,
  selectedClient,
  currentClients,
  setCurrentClients,
  setSelectedClient,
}) {
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

  const { loading, error, success, fetchData } = useFetch();

  async function onSubmit(values) {
    const url = getBackendUrl();

    let res;

    if (selectedClient) {
      // Editing an existing client
      res = await fetchData(
        `${url}/api/bighil-clients/edit-client/${selectedClient._id}`,
        "PATCH",
        values,
        token,
        false
      );
    } else {
      // Adding a new client
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
        // Update the existing client in the list
        const updatedClients = currentClients.map((client) =>
          client._id === selectedClient._id ? res.data : client
        );
        setCurrentClients(updatedClients);
        setSelectedClient(null);
      } else {
        // Add the new client to the list
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
    <div className="w-full space-y-6 mt-2 overflow-auto">
      <Card>
        {/* <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Company Registration
          </CardTitle>
        </CardHeader> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Company Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Information</h3>
                <Separator />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1234567890"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\+?[\d]*$/.test(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Admins Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Admin Accounts</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        name: "",
                        email: "",
                        password: "",
                        role: "ADMIN",
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </Button>
                </div>
                <Separator />

                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-4 relative group">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}

                    <FormField
                      control={form.control}
                      name={`admins.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`admins.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@company.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`admins.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={index === 0}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-300">
                                <SelectItem value="SUPER ADMIN">
                                  Super Admin
                                </SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="SUB ADMIN">
                                  Sub Admin
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {index !== fields.length - 1 && (
                      <Separator className="my-6 bg-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>

            {error && <div className="text-red-500 text-center">{error}</div>}
            <CardFooter className="flex justify-end">
              <Button disabled={loading} type="submit">
                {selectedClient ? "Update" : "Register"} Company
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
