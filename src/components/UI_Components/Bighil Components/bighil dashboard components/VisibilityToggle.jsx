"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

// Add this to your AdminAccountsStep component or create a separate component
const VisibilityToggle = ({ form, viewMode }) => {
  return (
    <FormField
      control={form.control}
      name="visibleToIT"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800/50">
          <div className="space-y-0.5">
            <FormLabel className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.value ? (
                <Eye className="h-4 w-4 text-green" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-500" />
              )}
              <span>Visible to IT Department</span>
            </FormLabel>
            <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
              When enabled, this company will be visible to the IT department
              for support and monitoring purposes.
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={!!field.value} // ✅ Ensure boolean value
              onCheckedChange={field.onChange}
              disabled={viewMode}
              className="data-[state=checked]:bg-green data-[state=unchecked]:bg-gray-800"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default VisibilityToggle;
