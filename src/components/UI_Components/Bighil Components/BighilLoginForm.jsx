"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Sparkles, ArrowRight, Shield } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password must be at least 8 characters"),
});

function BighilLoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { loading, error, success, fetchData } = useFetch();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values) => {
    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/bigil-auth/bighil-login`,
      "POST",
      values
    );
    if (res.success) {
      form.reset();
      router.push("/bighil/bighil-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary dark:from-surface-dark/90 dark:via-surface-dark dark:to-surface-dark/80">
      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white relative overflow-hidden shadow-xl shadow-secondary/20 dark:shadow-secondary/10">
              <Sparkles className="w-10 h-10" />
              <div className="absolute inset-0 bg-surface-light/10 dark:bg-surface-dark/10"></div>
            </div>
          </div>
        </div>

        {/* Login card with glassmorphism */}
        <div className="relative backdrop-blur-xl bg-surface-light/60 dark:bg-surface-dark/40 rounded-3xl overflow-hidden shadow-2xl shadow-secondary/10 dark:shadow-secondary/5 border border-white/10 dark:border-white/5">
          {/* Glowing accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent-info"></div>

          <div className="relative py-10 px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text-primary dark:text-text-light relative inline-block">
                Welcome Back
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60"></div>
              </h1>
              <p className="mt-2 text-text-secondary dark:text-text-muted">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-text-primary dark:text-text-light font-medium inline-flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-primary dark:text-primary-light" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="name@company.com"
                            autoComplete="email"
                            className="h-14 pl-14 pr-4 text-base bg-white/30 dark:bg-surface-dark/50 border-2 border-border-light dark:border-border-dark rounded-xl shadow-sm focus:shadow-md focus:border-primary dark:focus:border-primary-light focus:ring-0 font-medium"
                            {...field}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <div
                              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                                isEmailFocused
                                  ? "text-white bg-primary"
                                  : "text-text-muted bg-border-light/50 dark:bg-border-dark/50"
                              }`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-accent-danger dark:text-accent-danger text-sm ml-2 flex items-center gap-1.5">
                        {form.formState.errors.email?.message && (
                          <>
                            <span className="inline-block w-4 h-4 rounded-full bg-accent-danger/10 flex-shrink-0 flex items-center justify-center">
                              <span className="w-1 h-1 rounded-full bg-accent-danger"></span>
                            </span>
                            {form.formState.errors.email?.message}
                          </>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-text-primary dark:text-text-light font-medium inline-flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-primary dark:text-primary-light" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="h-14 pl-14 pr-14 text-base bg-white/30 dark:bg-surface-dark/50 border-2 border-border-light dark:border-border-dark rounded-xl shadow-sm focus:shadow-md focus:border-primary dark:focus:border-primary-light focus:ring-0 font-medium"
                            {...field}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <div
                              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                                isPasswordFocused
                                  ? "text-white bg-primary"
                                  : "text-text-muted bg-border-light/50 dark:bg-border-dark/50"
                              }`}
                            >
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          </div>
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
                      </FormControl>
                      <FormMessage className="text-accent-danger dark:text-accent-danger text-sm ml-2 flex items-center gap-1.5">
                        {form.formState.errors.password?.message && (
                          <>
                            <span className=" w-4 h-4 rounded-full bg-accent-danger/10 flex-shrink-0 flex items-center justify-center">
                              <span className="w-1 h-1 rounded-full bg-accent-danger"></span>
                            </span>
                            {form.formState.errors.password?.message}
                          </>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Forgot password link */}
                <div className="flex justify-end">
                  <Link
                    href="/bighil/forgot-password"
                    className="text-sm text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full h-14 flex items-center justify-center gap-2 rounded-xl font-semibold text-text-light bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark border border-white/10 shadow-lg shadow-secondary/20"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        Authenticating
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Error display */}
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-accent-danger/10 text-accent-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Alternative options */}
                {/* <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                  </div>
                  <div className="relative bg-surface-light/80 dark:bg-surface-dark/80 px-4 text-sm text-text-secondary dark:text-text-muted">
                    Or continue with
                  </div>
                </div> */}

                {/* Social login buttons */}
                {/* <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="h-12 flex justify-center items-center rounded-xl bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 border border-white/10 dark:border-white/5 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="h-12 flex justify-center items-center rounded-xl bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 border border-white/10 dark:border-white/5 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5 text-[#1877F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <Button
                    type="button"
                    className="h-12 flex justify-center items-center rounded-xl bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 border border-white/10 dark:border-white/5 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                    </svg>
                  </Button>
                </div> */}
              </form>
            </Form>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-1.5 text-text-secondary dark:text-text-muted text-sm bg-white/20 dark:bg-white/5 px-3 py-1.5 rounded-full border border-white/10 dark:border-white/5">
            <Shield className="w-4 h-4 text-accent-success" />
            Secured with 256-bit encryption
          </div>
        </div>
      </div>
    </div>
  );
}

export default BighilLoginForm;
