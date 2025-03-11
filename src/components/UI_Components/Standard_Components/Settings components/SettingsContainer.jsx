"use client";
import { useForm } from "react-hook-form";
import ProfileCard from "./ProfileCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "@/custome hooks/useSettings";
import PasswordUpdateCard from "./PasswordUpdateCard";
import { SettingsSchema } from "./SettingsSchema";
import PageHeader from "./PageHeader";

const SettingsContainer = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handlePasswordUpdate, loading, error } = useSettings();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background/50 to-background 
                      dark:from-background-dark/50 dark:to-background-dark 
                      py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileCard userData={data} />
          <PasswordUpdateCard
            form={form}
            onSubmit={handlePasswordUpdate}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;
