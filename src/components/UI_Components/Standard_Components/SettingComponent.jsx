"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Lock, UserIcon, MailIcon, ShieldIcon, Loader2 } from "lucide-react";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import { toast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    newPassword: z.string().min(1, "Password must be at least 8 characters"),
    // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    // .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SettingComponent({ data }) {
  const { name, email, role } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { loading, error, success, fetchData } = useFetch();
  const token = useAccessToken();

  const onSubmit = async (values) => {
    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/setting/update-setting`,
      "PATCH",
      values,
      token,
      false
    );

    try {
      if (res?.success) {
        toast({
          variant: "success",
          title: "Password updated successfully",
          description: "Your password has been updated successfully",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password update failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-bighil_dashboard_bg  dark:from-texttext-text_color dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-text_color dark:text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-900 dark:text-gray-400">
            Manage your account details and security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <Card className="lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border bg-white border-dialog_inside_border_color dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-center">
                Profile Information
              </CardTitle>
              <CardDescription className="text-center">
                Your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple to-blue rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {name?.charAt(0) || data.username.charAt(0)}
              </div>

              <div className="space-y-4">
                {name && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <UserIcon className="h-4 w-4" />
                      <span className="text-sm">Name</span>
                    </div>
                    <div className="font-light text-sm text-text_color dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
                      {name}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MailIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">Email</span>
                  </div>
                  <div className="font-light text-text_color dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
                    {email}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <ShieldIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary">Role</span>
                  </div>
                  <div className="font-light text-text_color dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
                    {role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 border bg-white border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-primary" />
                          <span className="text-primary">New Password</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter new password"
                            className="rounded-lg py-5 px-4  border border-dialog_inside_border_color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-primary" />
                          <span className="text-primary">Confirm Password</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirm new password"
                            className="rounded-lg py-5 px-4 border-gray-300 border border-dialog_inside_border_color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue to-purple hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-5 rounded-lg transition-all transform hover:scale-[1.01] shadow-md"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <span>Update Password</span>
                    )}
                  </Button>
                  {/* {
                    success && (
                      <div className="text-center text-green-800">
                        Password updated successfully!
                      </div>
                    )} */}
                  {error && (
                    <div className="text-center text-red-800">{error}</div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
