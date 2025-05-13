"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        name="complaintAgainst"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-text_color">Complaint Against</FormLabel>
            <Input
              {...field}
              placeholder="Enter complaint title..."
              className="h-10 text-sm border-primary/10 focus:outline-none focus:ring-0 focus:border-primary/10 focus:shadow-none"
              style={noFocusStyle}
            />
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
              Detailed Description
            </FormLabel>
            <Textarea
              {...field}
              placeholder="Describe your complaint in detail..."
              className="min-h-[120px] sm:min-h-[200px] text-sm border-primary/10 focus:outline-none focus:ring-0 focus:border-primary/10 focus:shadow-none"
              style={noFocusStyle}
            />
            <FormMessage className="text-xs text-red" />
          </FormItem>
        )}
      />
    </>
  );
}
