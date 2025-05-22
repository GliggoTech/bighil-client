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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { companyType } from "@/lib/complaintSchema";
import { Building, Phone } from "lucide-react";
import React from "react";
import { MdEmail } from "react-icons/md";

const CompanyInformationStep = React.memo(({ form, viewMode, setViewMode }) => {

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
        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-textbg-text_color dark:text-gray-300">
                <MdEmail className="h-4 w-4 text-primary" />
                <span className=" text-text_color">Company Email</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Corporation@gmail.com"
                  {...field}
                  type="email"
                  className="border-gray-300  dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  readOnly={viewMode}
                />
              </FormControl>
              <FormDescription className="text-text_color/80 dark:text-gray-400">
                Enter the official registered Email of the company
              </FormDescription>
              <FormMessage className="text-red dark:text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-textbg-text_color dark:text-gray-300">
                <MdEmail className="h-4 w-4 text-primary" />
                <span className=" text-text_color">Company Address</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="123 Main St, City, Country"
                  {...field}
                  className="border-gray-300  dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  readOnly={viewMode}
                />
              </FormControl>
              <FormDescription className="text-text_color/80 dark:text-gray-400">
                Enter the official registered Address of the company
              </FormDescription>
              <FormMessage className="text-red dark:text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-textbg-text_color dark:text-gray-300">
                <MdEmail className="h-4 w-4 text-primary" />
                <span className=" text-text_color">Number of Employees</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="50"
                  {...field}
                  type="number"
                  className="border-gray-300  dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  readOnly={viewMode}
                />
              </FormControl>
              <FormDescription className="text-text_color/80 dark:text-gray-400">
                Provide the total count of individuals working at your company
              </FormDescription>
              <FormMessage className="text-red dark:text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2 text-textbg-text_color dark:text-gray-300">
                <MdEmail className="h-4 w-4 text-primary" />
                <span className=" text-text_color">Company Type</span>
              </FormLabel>
              <FormControl>
                <div>
                  {" "}
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-10 rounded-xl bg-white border border-dialog_inside_border_color">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-dialog_inside_border_color bg-white shadow-md w-full">
                      {companyType.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="
                      cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
                      flex items-center justify-start gap-2
                      hover:bg-primary-bg-subtle hover:text-text_color transition-all
                    "
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormDescription className="text-text_color/80 dark:text-gray-400">
                Provide the total count of individuals working at your company
              </FormDescription>
              <FormMessage className="text-red dark:text-red" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
});

export default CompanyInformationStep;
