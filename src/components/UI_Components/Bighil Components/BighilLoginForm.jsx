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

import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Shield,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import useNotificationStore from "@/store/notificationStore";
import { BighilLogin } from "@/app/actions/bighil.actions";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
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
  const { setCurrentUserId, setCurrentUserRole } = useNotificationStore();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Animation timing for success state
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/bighil/bighil-dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await BighilLogin(values);

      if (res.success) {
        setCurrentUserId(res.user.id);
        setCurrentUserRole(res.user.role);
        setIsSuccess(true);
        form.reset();
      } else {
        setError(res.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-gradient-to-br from-indigo to-purple dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-indigo dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-blue dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card container with animated border */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo to-purple rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

          <div className="relative p-1 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            {/* Card interior */}
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl relative">
              {/* Logo and branding */}
              <div className="mb-8 text-center">
                <div className="inline-flex relative mb-6">
                  {/* Logo background with animated gradient */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo to-purple rounded-2xl shadow-lg rotate-3"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo to-purple rounded-2xl shadow-lg -rotate-3 animate-pulse"></div>
                    <div className="relative z-10 bg-white dark:bg-slate-900 rounded-xl w-20 h-20 flex items-center justify-center">
                      <div className="text-3xl font-bold bg-gradient-to-br from-indigo to-purple bg-clip-text text-transparent">
                        BH
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-text_color dark:text-slate-400">
                  Sign in to continue to your dashboard
                </p>
              </div>

              {/* Success message */}
              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800/40 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                      Login successful!
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      Redirecting to your dashboard...
                    </p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
                  <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-800/40 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <p className="text-rose-800 dark:text-rose-200 font-medium">
                      Authentication failed
                    </p>
                    <p className="text-rose-600 dark:text-rose-400 text-sm">
                      {error}
                    </p>
                  </div>
                  <button
                    onClick={() => setError("")}
                    className="ml-auto text-rose-500 hover:text-rose-700 dark:hover:text-rose-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}

              {/* Login form */}
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
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium ml-1">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <div
                              className={cn(
                                "absolute inset-0 rounded-xl transition-all duration-300",
                                activeField === "email"
                                  ? "bg-indigo dark:bg-indigo-950/30"
                                  : "bg-transparent"
                              )}
                            ></div>

                            <Input
                              placeholder="name@company.com"
                              className={cn(
                                "pl-5 h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100",
                                "placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl text-base",
                                "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500",
                                "transition-all duration-200 relative "
                              )}
                              disabled={isLoading || isSuccess}
                              {...field}
                              onFocus={() => setActiveField("email")}
                              onBlur={() => setActiveField(null)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-rose-500 dark:text-rose-400 text-sm ml-1 flex items-center gap-1.5">
                          {form.formState.errors.email?.message && (
                            <>
                              <span className="text-xs">•</span>
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
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium ml-1">
                            Password
                          </FormLabel>
                          <Link
                            href="/bighil/forgot-password"
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative group">
                            <div
                              className={cn(
                                "absolute inset-0 rounded-xl transition-all duration-300",
                                activeField === "password"
                                  ? "bg-indigo-50 dark:bg-indigo-950/30"
                                  : "bg-transparent"
                              )}
                            ></div>

                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className={cn(
                                "pl-5 h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100",
                                "placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl text-base",
                                "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500",
                                "transition-all duration-200 relative z-10"
                              )}
                              disabled={isLoading || isSuccess}
                              {...field}
                              onFocus={() => setActiveField("password")}
                              onBlur={() => setActiveField(null)}
                            />
                            <button
                              type="button"
                              className={cn(
                                "absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors",
                                "text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 z-10"
                              )}
                              onClick={() => setShowPassword(!showPassword)}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-rose-500 dark:text-rose-400 text-sm ml-1 flex items-center gap-1.5">
                          {form.formState.errors.password?.message && (
                            <>
                              <span className="text-xs">•</span>
                              {form.formState.errors.password?.message}
                            </>
                          )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* Submit button */}
                  <div className="pt-2">
                    <Button
                      disabled={isLoading || isSuccess}
                      type="submit"
                      className={cn(
                        "w-full h-14 mt-4 rounded-xl font-medium text-base",
                        "text-white transition-all duration-300",
                        isSuccess
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-gradient-to-r from-indigo to-purple hover:from-indigo hover:to-purple",
                        "shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 relative overflow-hidden"
                      )}
                    >
                      <span className="relative z-10">
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 text-white animate-spin" />
                            <span>Authenticating...</span>
                          </div>
                        ) : isSuccess ? (
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-5 w-5 text-white" />
                            <span>Success</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 group">
                            <span>Sign In</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        )}
                      </span>

                      {/* Button hover effect */}
                      <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </Button>
                  </div>
                </form>
              </Form>

              {/* Demo accounts section (collapsible) */}
              <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
                <details className="group">
                  <summary className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Demo credentials</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-auto transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>

                  <div className="mt-3 pl-6 space-y-2 animate-in slide-in-from-top duration-300 origin-top">
                    <div className="text-sm text-slate-500 dark:text-slate-400 grid grid-cols-[auto_1fr] gap-x-3">
                      <span className="text-slate-400 dark:text-slate-500">
                        Email:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">
                        bighil@gmail.com
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">
                        Password:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">
                        123
                      </span>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-1.5 text-text_color dark:text-slate-400 text-sm bg-white dark:bg-slate-800/70 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            <Shield className="w-4 h-4 text-indigo dark:text-indigo-400" />
            <span>Secured with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BighilLoginForm;
