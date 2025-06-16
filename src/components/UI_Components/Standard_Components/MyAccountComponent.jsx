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
import PasswordStrengthIndicator from "./PasswordStrengthIndicatorComponents/PasswordStrengthIndicator";
import { passwordRegex } from "@/utils/passwordRegex";
import { useState } from "react";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .regex(passwordRegex, "Password must be at least 8 characters long."),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function MyAccountComponent({ data }) {
  const { name, email, role } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const { loading, error, success, fetchData } = useFetch();
  const { token } = useAccessToken();

  const onSubmit = async (values) => {
    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/account/update-my-account`,
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-text_color dark:text-white mb-2">
            My Account Information
          </h1>
          <p className="text-gray-900 dark:text-gray-400">
            Manage your account details and security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Profile Information Card */}
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 border bg-white border-dialog_inside_border_color dark:border-gray-700">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl text-center">
                Profile Information
              </CardTitle>
              <CardDescription className="text-center">
                Your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {name?.charAt(0) || data.username.charAt(0)}
              </div> */}

              <div className="space-y-6">
                {name && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <UserIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary">Name</span>
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
                    {role.toUpperCase()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 shadow-md hover:shadow-lg transition-shadow duration-300 border bg-white border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-6">
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
                      <FormItem className="space-y-2 relative">
                        <FormLabel className="flex items-center space-x-2">
                          <Lock
                            className={`h-5 w-5 ${
                              form.formState.errors.newPassword
                                ? "text-red"
                                : "text-primary"
                            }`}
                          />
                          <span
                            className={`${
                              form.formState.errors.newPassword
                                ? "text-red"
                                : "text-primary"
                            }`}
                          >
                            New Password
                          </span>
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              onFocus={() => setIsNewPasswordFocused(true)}
                              onBlur={() => setIsNewPasswordFocused(false)}
                              placeholder="Enter new password"
                              className={`rounded-lg py-5 px-4 pr-10 border ${
                                form.formState.errors.newPassword
                                  ? "border-red border-2"
                                  : "border-dialog_inside_border_color"
                              }`}
                            />

                            {/* Eye / EyeOff Icon */}
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-text_color focus:outline-none"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                // EyeOff
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411L21 21"
                                  />
                                </svg>
                              ) : (
                                // Eye
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </FormControl>

                        <FormMessage />
                        {isNewPasswordFocused && !isConfirmPasswordFocused && (
                          <PasswordStrengthIndicator
                            password={form.getValues("newPassword")}
                            className="mt-2"
                          />
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Lock
                            className={`   ${
                              form.formState.errors.confirmPassword
                                ? " text-red"
                                : " text-primary"
                            }  h-5 w-5`}
                          />
                          <span
                            className={`   ${
                              form.formState.errors.confirmPassword
                                ? " text-red"
                                : " text-primary"
                            } `}
                          >
                            Confirm Password
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            onFocus={() => setIsConfirmPasswordFocused(true)}
                            onBlur={() => setIsConfirmPasswordFocused(false)}
                            placeholder="Confirm new password"
                            className="rounded-lg py-5 px-4  border border-dialog_inside_border_color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && <div className="text-center text-red">{error}</div>}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white font-semibold py-5 rounded-lg transition-all transform hover:scale-[1.01] shadow-md"
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
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
