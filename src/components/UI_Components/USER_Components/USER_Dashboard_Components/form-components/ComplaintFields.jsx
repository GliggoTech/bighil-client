"use client";
import {
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
import { Textarea } from "@/components/ui/textarea";
import { officeDepartments, submissionTypes } from "@/lib/complaintSchema";

export function ComplaintFields({ form }) {
  // Style to completely remove focus styling
  const noFocusStyle = {
    outline: "none",
    boxShadow: "none",
  };

  return (
    <>
      {/* Complaint Title */}
      <FormField
        control={form.control}
        name="submissionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-text_color">Submission Type <span className="text-red">*</span></FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-10 text-sm border-primary/10 focus:outline-none focus:ring-0 focus:border-primary/10 focus:shadow-none">
                <SelectValue placeholder="Select a submission type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none shadow-lg">
                {submissionTypes.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="hover:bg-primary/10"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-text_color">
              Department to Raise Complaint Against <span className="text-red">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-10 text-sm border-primary/10 focus:outline-none focus:ring-0 focus:border-primary/10 focus:shadow-none">
                <SelectValue placeholder="Select a Department" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none shadow-lg">
                {officeDepartments.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="hover:bg-primary/10"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red" />
          </FormItem>
        )}
      />
      {/* Complaint Details */}
      <FormField
        control={form.control}
        name="complaintMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-text_color">
              Detailed Description <span className="text-red">*</span>
            </FormLabel>
            <Textarea
              {...field}
              placeholder="Describe your complaint in detail..."
              className="min-h-[80px] md:min-h-[120px] resize-y text-sm border-primary/10 focus:outline-none focus:ring-0 focus:border-primary/10 focus:shadow-none"
              style={noFocusStyle}
            />
            <FormMessage className="text-xs text-red" />
          </FormItem>
        )}
      />
    </>
  );
}
