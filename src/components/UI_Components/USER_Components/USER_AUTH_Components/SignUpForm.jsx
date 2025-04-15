"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Mail, Lock, User } from "lucide-react";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import useNotificationStore from "@/store/notificationStore";

const SignupSigninForm = ({ mode = "signup" }) => {
  // Dynamic validation schema
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 8 characters"),
    ...(mode === "signup"
      ? {
          name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name too long"),
        }
      : {}),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setCurrentUserId, setCurrentUserRole } = useNotificationStore();
  const { loading, error, fetchData } = useFetch();
  const [isHovering, setIsHovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values) => {
    const url = getBackendUrl();
    console.log("url", url);
    const endpoint = mode === "signup" ? "user-register" : "user-login";

    const res = await fetchData(
      `${url}/api/user-auth/${endpoint}`,
      "POST",
      values
    );

    if (res && res.success) {
      form.reset();
      setCurrentUserId(res.data._id);
      setCurrentUserRole(res.data.role);
      router.push("/user/user-add-complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Floating Elements - Decorative */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-light/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-light/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-accent-info/5 rounded-full blur-xl"></div>

        {/* Card with glassmorphism effect */}
        <div className="relative bg-background-primary/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-secondary/5 overflow-hidden">
          {/* Top decorative gradient bar */}
          <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

          {/* Form content */}
          <div className="p-10">
            {/* Header with 3D text effect */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {mode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="mt-2 text-text-secondary">
                {mode === "signup"
                  ? "Join our community to share your voice"
                  : "Sign in to access your account"}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {mode === "signup" && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="group">
                        <div className="relative">
                          <FormLabel className="text-text-secondary font-medium ml-1 mb-1 block">
                            Full Name
                          </FormLabel>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                            <FormControl>
                              <Input
                                {...field}
                                className="pl-10 h-14 border-2 border-border-light rounded-xl bg-background-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Jane Doe"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-accent-danger text-sm mt-1 ml-1 flex items-center gap-1">
                            {form.formState.errors.name?.message && (
                              <AlertCircle className="w-4 h-4" />
                            )}
                            {form.formState.errors.name?.message}
                          </FormMessage>
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="group">
                      <div className="relative">
                        <FormLabel className="text-text-secondary font-medium ml-1 mb-1 block">
                          Email Address
                        </FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="pl-10 h-14 border-2 border-border-light rounded-xl bg-background-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                              placeholder="your@email.com"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-accent-danger text-sm mt-1 ml-1 flex items-center gap-1">
                          {form.formState.errors.email?.message && (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          {form.formState.errors.email?.message}
                        </FormMessage>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="group">
                      <div className="relative">
                        <div className="flex justify-between">
                          <FormLabel className="text-text-secondary font-medium ml-1 mb-1 block">
                            Password
                          </FormLabel>
                          {mode === "signin" && (
                            <Link
                              href="/user/forgot-password"
                              className="text-sm text-primary hover:text-primary-dark transition-colors"
                            >
                              Forgot Password?
                            </Link>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                          <FormControl>
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="pl-10 h-14 border-2 border-border-light rounded-xl bg-background-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                              placeholder="••••••••"
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-4"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-text-muted hover:text-primary dark:hover:text-primary-light">
                              {showPassword ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
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
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </div>
                          </button>
                        </div>
                        <FormMessage className="text-accent-danger text-sm mt-1 ml-1 flex items-center gap-1">
                          {form.formState.errors.password?.message && (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit Button with animated hover effect */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative w-full h-14 mt-2 rounded-xl overflow-hidden group"
                  >
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300"></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary-dark transition-opacity duration-300 ${
                        isHovering ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    {/* Text and icon */}
                    <span className="relative flex items-center justify-center text-white font-semibold text-lg">
                      {loading ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <>
                          {mode === "signup" ? "Create Account" : "Sign In"}
                          <ArrowRight
                            className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                              isHovering ? "translate-x-1" : ""
                            }`}
                          />
                        </>
                      )}
                    </span>
                  </Button>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-accent-danger/10 text-accent-danger p-3 rounded-lg flex items-center gap-2 animate-slide-in">
                    <AlertCircle className="flex-shrink-0" size={18} />
                    <p>{error}</p>
                  </div>
                )}

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                  <div className="h-px w-full bg-border-light"></div>
                  <span className="absolute bg-background-primary px-4 text-text-muted text-sm">
                    OR
                  </span>
                </div>

                {/* Social sign-in buttons */}
                {/* <div className="grid grid-cols-3 gap-3">
                  <button className="flex justify-center items-center h-12 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[#4285F4] rounded-lg transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  </button>
                  <button className="flex justify-center items-center h-12 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] rounded-lg transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="flex justify-center items-center h-12 bg-black/10 hover:bg-black/20 text-black rounded-lg transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                    </svg>
                  </button>
                </div> */}

                {/* Toggle between sign up and sign in */}
                <div className="text-center text-text-secondary mt-6">
                  {mode === "signup"
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <Link
                    href={
                      mode === "signup"
                        ? "/user/user-login"
                        : "/user/user-register"
                    }
                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    {mode === "signup" ? "Sign in" : "Sign up"}
                  </Link>
                  <div className="flex justify-center flex-col gap-2 mt-6">
                    <p className="text-center">
                      <span className="font-bold">EMAIL : </span>
                      vijay.r20799@gmail.com
                    </p>
                    <p className="text-center">
                      <span className="font-bold">PASSWORD : </span>123
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 text-center">
          <p className="text-text-muted text-sm flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Secured with SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupSigninForm;
