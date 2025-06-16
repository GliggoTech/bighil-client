"use client";
import React, { useState } from "react";
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
import {  submissionTypes } from "@/lib/complaintSchema";
import { DepartmentSelector } from "./DepartmentSelector";

export function ComplaintFields({ form }) {
  const [charCount, setCharCount] = useState(0); // For character count
  const MAX_LENGTH = 1000; // You can customize this

  const noFocusStyle = {
    outline: "none",
    boxShadow: "none",
  };

  return (
    <>
      {/* Submission Type */}
      <FormField
        control={form.control}
        name="submissionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-text_color">
              Submission Type <span className="text-red">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className={`h-10 text-sm focus:outline-none focus:ring-0 focus:shadow-none ${
                  form.formState.errors.submissionType
                    ? "border-red/50 border-2"
                    : "border-primary/10"
                }`}
              >
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

      {/* Department */}
      <DepartmentSelector form={form} />

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
              className={`min-h-[80px] md:min-h-[120px] resize-y text-sm border-primary/10 focus:outline-none focus:ring-0 focus:border-primary/10 focus:shadow-none ${
                form.formState.errors.complaintMessage
                  ? "border-red/50 border-2"
                  : ""
              } `}
              style={noFocusStyle}
              onChange={(e) => {
                field.onChange(e); // Important to keep react-hook-form state updated
                setCharCount(e.target.value.length);
              }}
              maxLength={MAX_LENGTH}
            />
            <div
              className={`flex ${
                form.formState.errors.complaintMessage
                  ? "justify-between"
                  : "justify-end"
              }`}
            >
              <FormMessage className="text-xs text-red" />
              <div className="text-xs text-text_color justify-end flex  text-right mt-1">
                {charCount}/{MAX_LENGTH} characters
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
