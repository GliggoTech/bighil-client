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
  assignedRoles,
  fields,
  append,
  remove,
  viewMode,
  setViewMode,
}) => {
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

        {!viewMode && (
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
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/90 text-white shadow-md hover:shadow-primary/30 transition-all"
                >
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-text-text_color text-white border-gray-700">
                Add another admin to this company
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
            <div className="absolute -top-3 left-4 bg-white  px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center">
              Admin #{index + 1}
              {index === 0 && (
                <Badge className="ml-2 bg-primary text-white dark:bg-primary/20 dark:text-primary-200">
                  Primary
                </Badge>
              )}
            </div>

            {index > 0 && (
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
                        <SelectTrigger
                          disabled={viewMode}
                          className="border-gray-300  dark:border-gray-600 dark:bg-texttext-text_color dark:text-white"
                        >
                          <div className="flex items-center">
                            {roleIcons[field.value]}
                            <SelectValue placeholder="Select role" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-text text-text_color border-gray-200 dark:border-gray-700 shadow-lg">
                        <SelectItem
                          value="SUPER ADMIN"
                          disabled={
                            assignedRoles["SUPER ADMIN"] &&
                            field.value !== "SUPER ADMIN"
                          }
                          className="hover:bg-purple-50 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-center">
                            <span>Super Admin</span>
                            {/* {field.value === "SUPER ADMIN" && (
                              <Badge
                                className={`ml-2 ${roleBadgeColors["SUPER ADMIN"]} `}
                              >
                                Current
                              </Badge>
                            )} */}
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="ADMIN"
                          disabled={
                            assignedRoles["ADMIN"] && field.value !== "ADMIN"
                          }
                          className="hover:bg-blue-50 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-center">
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
                    <FormMessage className="text-red dark:text-red" />
                  </FormItem>
                )}
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
