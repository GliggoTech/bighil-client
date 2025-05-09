"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Building, Phone } from "lucide-react";
import React from "react";

const CompanyInformationStep = ({ form, viewMode, setViewMode }) => {
  return (
    <div className="space-y-2 ">
      <div className="flex items-center space-x-1">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-medium text-text_color dark:text-white">
          Company Information
        </h3>
      </div>
      <Separator className="bg-dialog_inside_border_color dark:bg-text_color" />

      <div className="grid gap-6 md:grid-cols-1">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-textbg-text_color dark:text-gray-300">
                <Building className="h-4 w-4 text-primary" />
                <span className=" text-text_color">Company Name</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Corporation"
                  {...field}
                  className="border-gray-300  dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  readOnly={viewMode}
                />
              </FormControl>
              <FormDescription className="text-text_color/80 dark:text-gray-400">
                Enter the official registered name of the company
              </FormDescription>
              <FormMessage className="text-red dark:text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-textbg-text_color dark:text-gray-300">
                <Phone className="h-4 w-4 text-primary" />
                <span className=" text-text_color">Contact Number</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="+1234567890"
                  {...field}
                  className="border-gray-300  dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\+?[\d]*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                  readOnly={viewMode}
                />
              </FormControl>
              <FormDescription className="text-text_color/80 dark:text-gray-400">
                Include country code (e.g., +1 for US)
              </FormDescription>
              <FormMessage className="text-red dark:text-red" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CompanyInformationStep;
