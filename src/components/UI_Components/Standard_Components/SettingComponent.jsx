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

const FormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
  defaultCompanyName: z.string().min(1, {
    message: "Please select a default company.",
  }),
  complaintsubmissionType: z.enum(["Anonymous", "Non-Anonymous"], {
    required_error: "Please select a complaint submission type.",
  }),

  notificationHidden: z.boolean().default(false),
});

const SettingComponent = ({ initialData }) => {
  // Changed prop name to initialData for clarity

  const { token } = useAccessToken();
  const { loading: fetchLoading, fetchData } = useFetch(); // Renamed loading to fetchLoading to avoid conflict

  // --- State for Data and UI State ---
  const [companies, setCompanies] = useState([]); // List of companies from API
  const [isSaving, setIsSaving] = useState(false); // Saving state for save button
  const [loadingCompanies, setLoadingCompanies] = useState(true); // Loading state for companies fetch
  const [searchQuery, setSearchQuery] = useState(""); // Search query for companies

  // --- React Hook Form Initialization ---
  // Update your useForm initialization to include default values
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      theme: initialData?.theme || "light",
      defaultCompanyName: initialData?.defaultCompany || "",
      complaintsubmissionType: initialData?.defaultComplaintType || "Anonymous",
      notificationHidden: initialData?.notificationHidden || false,
    },
  });

  // --- Fetch Companies Function ---
  const fetchCompanies = useCallback(
    async (query = "") => {
      if (!token) return; // Ensure token is available before fetching
      setLoadingCompanies(true);
      try {
        const url = getBackendUrl();
        const res = await fetchData(
          `${url}/api/companies?search=${encodeURIComponent(query)}`,
          "GET",
          {},
          token,
          false // assuming fetchData has an option to prevent auto-toast/error handling
        );

        if (res.success) {
          // Assuming res.data is an array of company objects { _id, companyName, ... }
          setCompanies(res.data);
        } else {
          // Handle API specific errors if res.success is false
          console.error("API error fetching companies:", res.error);
          toast({
            title: "Error fetching companies",
            description:
              res.error?.message || "Failed to load companies list from API.",
            variant: "destructive",
          });
          setCompanies([]); // Clear companies on error
        }
      } catch (err) {
        console.error("Fetch error fetching companies:", err);
        toast({
          title: "Fetch Error",
          description: "An error occurred while loading companies.",
          variant: "destructive",
        });
        setCompanies([]); // Ensure companies array is empty on error
      } finally {
        setLoadingCompanies(false);
      }
    },
    [fetchData, token, toast] // Added toast to dependencies
  );

  // --- Effect for Company Search Debouncing ---
  useEffect(() => {
    if (!token) return; // Only search after initial load and token exists

    const debounceTimer = setTimeout(() => {
      fetchCompanies(searchQuery);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceTimer); // Cleanup function
  }, [searchQuery, token, fetchCompanies]);

  // --- Save Settings Handler (triggered by form onSubmit) ---
  const handleSaveSettings = async (formData) => {
    console.log("Form data to save:", formData);
    setIsSaving(true);
    let saveError = null; // Use a local variable for error during save
    try {
      // Find the company ID based on the selected company name from the form
      const companyToSave = companies.find(
        (c) => c.companyName === formData.defaultCompanyName
      );
      const defaultCompanyIdToSave = companyToSave
        ? companyToSave.companyName
        : null; // Get the ID or null

      const settingsToSave = {
        theme: formData.theme,
        defaultCompany: defaultCompanyIdToSave, // Use the found ID
        defaultComplaintType: formData.complaintsubmissionType,
        notificationHidden: formData.notificationHidden, // Send the boolean value
      };
      console.log("Saving settings payload:", settingsToSave);

      const url = getBackendUrl();
      const response = await fetchData(
        `${url}/api/user-setting/update-user-setting`,
        "PATCH",
        settingsToSave,
        token,
        false
      ); // Pass payload as third arg

      if (response.success) {
        toast({
          title: "Success!",
          description: "Your settings have been saved.",
          variant: "success",
        });
        useNotificationStore.setState({
          setCurrentUserDefaultCompany: formData.defaultCompanyName,
          setShowNotifications: formData.notificationHidden,
          setDefaultComplaintType: formData.complaintsubmissionType,
          setCurrentTheme: formData.theme,
        });
      } else {
        saveError = response.error?.message || "Failed to save settings."; // Set local error message
        toast({
          title: "Error saving settings",
          description: saveError, // Use the local error message
          variant: "destructive",
        });
      }
    } catch (err) {
      saveError = `An error occurred while saving settings: ${err.message}`; // Set local error message
      toast({
        title: "Fetch Error",
        description: saveError, // Use the local error message
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
                <FormField
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
                />
                <div className="flex justify-between">
                  <div className="">
                    <Label className="text-sm font-medium text-text_color dark:text-gray-300 flex-shrink-0 w-40">
                      Default Company
                    </Label>
                  </div>

                  <CompanySelector
                    form={form} // Pass the form instance
                    //   field={field} // Pass the field object from FormField render prop
                    companies={companies}
                    loading={loadingCompanies} // Pass loading state for companies
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    fetchCompanies={fetchCompanies} // Pass the fetch function
                    showLable={false} // Hide label since we have a custom label above
                    formFieldname="defaultCompanyName" // Pass the field name for the company selector
                  />
                </div>

                <FormField
                  control={form.control}
                  name="complaintsubmissionType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <FormLabel className="text-sm font-medium text-text_color dark:text-gray-300 flex-shrink-0 w-40">
                        Complaint Type
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full sm:w-60 rounded-md bg-background dark:bg-gray-700 border-border dark:border-gray-600 text-text_color dark:text-white shadow-sm focus:ring-primary focus:border-primary text-sm">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-background dark:bg-gray-700 text-text_color dark:text-white border-border dark:border-gray-600">
                            <SelectItem value="Anonymous">Anonymous</SelectItem>
                            <SelectItem value="Non-Anonymous">
                              Non-Anonymous
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificationHidden" // Correct field name from schema
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-2">
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel className="text-sm font-medium text-text_color dark:text-gray-300">
                          Hide Notifications
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value} // Switch uses 'checked'
                          onCheckedChange={field.onChange} // Switch uses 'onCheckedChange'
                          className="data-[state=checked]:bg-gray-400 bg-yellow data-[state=unchecked]:bg-gray-300"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex justify-end border-t border-border dark:border-gray-700 pt-4">
                <Button
                  type="submit" // Button type submit triggers form.handleSubmit
                  disabled={isSaving || fetchLoading || loadingCompanies} // Disable button while saving or loading data
                  className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 px-6 py-2"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingComponent;
