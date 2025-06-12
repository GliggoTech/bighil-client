"use client";
import React from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Plus, Shield, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { roleBadgeColors, roleIcons } from "@/utils/adminsConstants";
import VisibilityToggle from "./VisibilityToggle";

const AdminAccountsStep = ({
  form,
  selectedClient,
  fields,
  append,
  remove,
  viewMode,
}) => {
  // Function to get the next role in sequence for first 3 admins
  const getNextRoleInSequence = () => {
    if (fields.length === 0) return "SUPER ADMIN";
    if (fields.length === 1) return "SUB ADMIN";
    if (fields.length === 2) return "ADMIN";
    // After 3 admins, only SUPER ADMIN can be added
    return "SUPER ADMIN";
  };

  // Function to get available roles based on position and existing roles
  const getAvailableRoles = (currentIndex, currentValue) => {
    // In edit mode, we should allow existing roles to remain
    if (viewMode || selectedClient) {
      // When editing, always include the current value and allow all roles
      const allRoles = ["SUPER ADMIN", "SUB ADMIN", "ADMIN"];

      // Make sure current value is included
      if (currentValue && !allRoles.includes(currentValue)) {
        allRoles.push(currentValue);
      }

      return allRoles;
    }

    // Original logic for new clients
    if (currentIndex === 0) {
      return ["SUPER ADMIN"];
    }

    if (currentIndex < 3) {
      const roles = [];
      if (currentIndex === 1) {
        roles.push("SUB ADMIN");
      } else if (currentIndex === 2) {
        roles.push("ADMIN");
      }

      if (currentValue && !roles.includes(currentValue)) {
        roles.push(currentValue);
      }

      return roles;
    }

    return ["SUPER ADMIN"];
  };

  // Function to check if we can add more admins
  const canAddAdmin = () => {
    // Always allow if less than 3 admins
    if (fields.length < 3) return true;

    // After 3, we can still add more SUPER ADMINs
    return true;
  };

  // Function to get role description based on position
  const getRoleDescription = (index) => {
    if (index === 0) return "The first admin must be Super Admin";
    if (index === 1) return "The second admin must be Sub Admin";
    if (index === 2) return "The third admin must be Admin";
    return "Additional admins can only be Super Admin";
  };

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple dark:bg-purple-900/50">
            <Shield className="h-5 w-5 text-white dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-text_color dark:text-white">
            Admin Accounts
          </h3>
        </div>

        {!viewMode && canAddAdmin() && (
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
                      role: getNextRoleInSequence(),
                    })
                  }
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/90 text-white shadow-md hover:shadow-primary/30 transition-all"
                >
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-text-text_color text-white border-gray-700">
                {fields.length < 3
                  ? `Add ${getNextRoleInSequence().toLowerCase()} to this company`
                  : "Add another super admin to this company"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "space-y-5 p-5 rounded-xl border border-gray-200 dark:border-gray-700",
              "transition-all hover:border-primary/50 hover:shadow-sm",
              "relative group bg-white dark:bg-texttext-text_color/50"
            )}
          >
            <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center">
              Admin <span className="ml-1 text-blue">#{index + 1}</span>
              {index === 0 && (
                <Badge className="ml-2 bg-primary text-white dark:bg-primary/20 dark:text-primary-200">
                  Primary
                </Badge>
              )}
            </div>

            {/* Only allow removal of admins after the first one, and not the required sequence admins unless there are more */}
            {index > 0 && (index >= 3 || fields.length > 3) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {!viewMode && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute right-2 -top-2 opacity-100 group-hover:opacity-100",
                          "transition-opacity rounded-full w-8 h-8",
                          "bg-red hover:bg-red/80 text-white"
                        )}
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent className=" bg-black text-white border-gray-700">
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
                      className="border-gray-300   dark:border-gray-600 dark:bg-texttext-text_color dark:text-white"
                      readOnly={viewMode}
                    />
                  </FormControl>
                  <FormMessage className="text-red dark:text-red" />
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
                        className="border-gray-300   dark:border-gray-600 dark:bg-texttext-text_color dark:text-white"
                        type="email"
                        readOnly={viewMode}
                      />
                    </FormControl>
                    <FormMessage className="text-red dark:text-red" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`admins.${index}.role`}
                render={({ field }) => {
                  const availableRoles = getAvailableRoles(index, field.value);

                  return (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span>Role</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!viewMode && !selectedClient && index < 3} // Only disable for new clients in sequence
                      >
                        <FormControl>
                          <SelectTrigger
                            disabled={
                              viewMode || (!selectedClient && index < 3)
                            } // Only disable for new clients
                            className="border-gray-300  dark:border-gray-600 dark:bg-texttext-text_color dark:text-white"
                          >
                            <div className="flex items-center">
                              {roleIcons[field.value]}
                              <SelectValue placeholder="Select role" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-text text-text_color border-gray-200 dark:border-gray-700 shadow-lg">
                          {getAvailableRoles(index, field.value).map((role) => (
                            <SelectItem
                              key={role}
                              value={role}
                              className="hover:bg-purple-50 dark:hover:bg-gray-700"
                            >
                              <div className="flex items-center">
                                <span>{role.replace("_", " ")}</span>
                                {field.value === role && (
                                  <Badge
                                    className={`ml-2 ${roleBadgeColors[role]}`}
                                  >
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-gray-500 dark:text-gray-400">
                        {getRoleDescription(index)}
                      </FormDescription>
                      <FormMessage className="text-red dark:text-red" />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <VisibilityToggle form={form} viewMode={viewMode} />
      </div>
    </div>
  );
};

export default AdminAccountsStep;
