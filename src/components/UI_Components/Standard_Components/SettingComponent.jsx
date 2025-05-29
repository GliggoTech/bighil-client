"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import VerifyTwoFACode from "./VerifytwoFACode";
import TwoFactorSettings from "./TwoFactorSettings";
import AdminsManagement from "./AdminsManagement";

const FormSchema = z.object({
  isTwoFactorEnabled: z.boolean().optional(),
});

const SettingComponent = ({ initialData }) => {
  const { token } = useAccessToken();
  const { loading: isSaving, fetchData } = useFetch();
  const [showPopup, setShowPopup] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
          toast({
            title: "Success",
            description: "Settings updated successfully.",
            variant: "success",
          });
        }
      }
    } catch (err) {
      saveError = `An error occurred while saving settings: ${err.message}`;
      toast({
        title: "Fetch Error",
        description: saveError,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-bighil_dashboard_bg text-text_color dark:text-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text_color dark:text-white mb-3">
            My Settings
          </h1>
          <p className="text-gray-900 dark:text-gray-400 text-lg">
            Customize your application preferences and manage your account.
          </p>
        </div>

        {/* Settings Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveSettings)}>
            <div className="space-y-6">
              {/* Two Factor Authentication Settings */}
              <TwoFactorSettings
                form={form}
                onSaveSettings={handleSaveSettings}
                isSaving={isSaving}
              />
            </div>
          </form>
        </Form>
        {/* Admin Management Section */}
        <AdminsManagement />

        {/* Two-Factor Verification Popup */}
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
