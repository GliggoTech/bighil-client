// Fixed EditAdminDialog.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const editAdminSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["SUPER ADMIN", "ADMIN", "SUB ADMIN"], {
    required_error: "Please select a role",
  }),
  preferredRoleName: z
    .string()
    .min(2, "Role name must be at least 2 characters")
    .optional(),
  isTwoFactorEnabled: z.boolean(),
});

const EditAdminDialog = ({
  open,
  onClose,
  admin,
  onSave,
  loading = false,
  viewOnly = false,
  setViewOnly,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "ADMIN",
      preferredRoleName: undefined,
      isTwoFactorEnabled: false,
    },
  });

  // Reset form when admin data changes
  useEffect(() => {
    if (admin && open) {
      form.reset({
        name: admin.name || "",
        email: admin.email || "",
        role: admin.role || "ADMIN",
        preferredRoleName: admin.preferredRoleName || undefined,
        isTwoFactorEnabled: admin.isTwoFactorEnabled || false,
      });
    }
  }, [admin, open, form]);

  const handleSave = async (data) => {
    setIsSaving(true);
    try {
      await onSave(admin._id, data);
      toast({
        title: "Success",
        description: `${data.name} has been updated successfully.`,
        variant: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to update admin. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setViewOnly(false);
    onClose();
  };

  if (!admin) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            {viewOnly ? "View" : "Edit"} Admin Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Update the admin information below. Changes will be saved
            immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* FIXED: Form structure */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter full name"
                        className="w-full border-primary"
                        disabled={isSaving}
                        readOnly={viewOnly}
                        value={field.value || ""} // Safe default
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                        className="w-full border-primary"
                        disabled={isSaving}
                        readOnly={viewOnly}
                        value={field.value || ""} // Safe default
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredRoleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Preferred Role Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter preferred role name"
                        className="w-full border-primary"
                        disabled={isSaving}
                        readOnly={viewOnly}
                        value={field.value || ""} // Safe default
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSaving}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-full border-primary"
                          disabled={viewOnly}
                        >
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-none">
                        {viewOnly && (
                          <SelectItem value="SUPER ADMIN">
                            SUPER ADMIN
                          </SelectItem>
                        )}
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="SUB ADMIN">SUB ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Two Factor Authentication Switch */}
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Two-Factor Authentication
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        Enable or disable 2FA for this admin
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSaving || viewOnly}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* FIXED: Buttons inside the form with proper types */}
            <AlertDialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="bg-red text-white  "
              >
                Cancel
              </Button>
              {!viewOnly && (
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blue hover:bg-blue/90 text-white min-w-[80px]"
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              )}
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditAdminDialog;
