"use client";

import React, { useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const TwoFactorSettings = ({ 
  form, 
  onSaveSettings, 
  isSaving 
}) => {
  // Function to handle 2FA toggle with proper async handling
  const handleTwoFAToggle = useCallback(
    async (value) => {
      if (value) {
        // Enable 2FA - this will trigger OTP popup
        await onSaveSettings({
          isTwoFactorEnabled: true,
        });
      } else {
        // Disable 2FA - update form state and save
        // Use setTimeout to defer the state update outside of the render cycle
        setTimeout(() => {
          form.setValue("isTwoFactorEnabled", false);
          // Use another setTimeout to ensure form state is updated before submission
          setTimeout(() => {
            const formData = form.getValues();
            onSaveSettings(formData);
          }, 0);
        }, 0);
      }
    },
    [form, onSaveSettings]
  );

  return (
    <Card className="bg-white  dark:bg-gray-800 rounded-none shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-text_color dark:text-white">
          Security Settings
        </CardTitle>
        <CardDescription className="text-gray-900 dark:text-gray-400">
          Manage your account security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pb-0">
        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="grid gap-1.5 leading-none">
                <FormLabel className="text-sm font-medium text-text_color dark:text-gray-300">
                  Two-Factor Verification
                </FormLabel>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={handleTwoFAToggle}
                  disabled={isSaving}
                  className="data-[state=checked]:bg-primary bg-yellow data-[state=unchecked]:bg-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default TwoFactorSettings;