"use client";

import React, { useState, useEffect, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Assuming Shadcn UI components

import { Input } from "@/components/ui/input"; // Assuming Shadcn Input (can remove if not used)
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { CompanySelector } from "../USER_Components/USER_Dashboard_Components/form-components/CompanySelector";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useNotificationStore from "@/store/notificationStore";
import VerifyTwoFACode from "./VerifytwoFACode";

const FormSchema = z.object({
  // theme: z.enum(["light", "dark"], {
  //   required_error: "Please select a theme.",
  // }),
  isTwoFactorEnabled: z.boolean().optional(), // Assuming this is a boolean field
});

const SettingComponent = ({ initialData }) => {
  const { token } = useAccessToken();
  const { loading: isSaving, fetchData } = useFetch();

  const [showPopup, setShowPopup] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // theme: initialData?.theme || "light",
      isTwoFactorEnabled: initialData?.isTwoFactorEnabled || false,
    },
  });

  const handleSaveSettings = async (formData) => {
    let saveError = null;
    try {
      const settingsToSave = {
        isTwoFactorEnabled: formData.isTwoFactorEnabled,
      };
      const url = getBackendUrl();
      const response = await fetchData(
        `${url}/api/client-setting/update-client-setting`,
        "PATCH",
        settingsToSave,
        token,
        false
      );

      if (response.success) {
        if (
          formData.isTwoFactorEnabled &&
          response.message === "Otp sent successfully."
        ) {
          setShowPopup(true);
        } else {
          form.setValue("isTwoFactorEnabled", formData.isTwoFactorEnabled);
        }
      }
    } catch (err) {
      saveError = `An error occurred while saving settings: ${err.message}`; // Set local error message
      toast({
        title: "Fetch Error",
        description: saveError, // Use the local error message
        variant: "destructive",
      });
    }
  };

  // Function to handle 2FA toggle with proper async handling
  const handleTwoFAToggle = useCallback(
    async (value) => {
      if (value) {
        // Enable 2FA - this will trigger OTP popup
        await handleSaveSettings({
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
            handleSaveSettings(formData);
          }, 0);
        }, 0);
      }
    },
    [form, handleSaveSettings]
  );

  return (
    <div className="min-h-screen bg-bighil_dashboard_bg text-text_color dark:text-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text_color dark:text-white mb-3">
            My Settings
          </h1>
          <p className="text-gray-900 dark:text-gray-400 text-lg">
            Customize your application preferences.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveSettings)}>
            <Card className="bg-white dark:bg-gray-800  shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-text_color dark:text-white">
                  General Preferences
                </CardTitle>
                <CardDescription className="text-gray-900 dark:text-gray-400">
                  Adjust the application's appearance and behavior.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <FormLabel className="text-sm font-medium text-text_color dark:text-gray-300 flex-shrink-0 w-40">
                        Select Theme
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={initialData.theme || field.value}
                        >
                          <SelectTrigger className="w-full sm:w-60 rounded-md bg-background dark:bg-gray-700 border-border dark:border-gray-600 text-text_color dark:text-white shadow-sm focus:ring-primary focus:border-primary text-sm">
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                          <SelectContent className="bg-background dark:bg-gray-700 text-text_color dark:text-white border-border dark:border-gray-600">
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel className="text-sm font-medium text-text_color dark:text-gray-300">
                          Two-Factor Verification
                        </FormLabel>
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
          </form>
        </Form>
        {showPopup && (
          <VerifyTwoFACode
            open={showPopup}
            onClose={(success) => {
              setShowPopup(false);
              if (success) {
                // Use setTimeout to defer state update
                setTimeout(() => {
                  form.setValue("isTwoFactorEnabled", true);
                }, 0);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SettingComponent;
