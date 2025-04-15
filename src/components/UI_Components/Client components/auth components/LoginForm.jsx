"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Mail, Lock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import useNotificationStore from "@/store/notificationStore";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setCurrentUserId, setCurrentUserRole } = useNotificationStore();
  const { loading, error, success, fetchData } = useFetch();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const onSubmit = async (data) => {
    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/client-auth/client-login`,
      "POST",
      data,
      null,
      false
    );

    if (res.success) {
      setCurrentUserId(res.user.id);
      setCurrentUserRole(res.user.role);
      router.push("/client/client-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/20 to-accent-info/10">
      <div className="w-full max-w-md px-8 py-12">
        {/* Card with glass effect */}
        <div className="relative backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 dark:bg-gray-900/10">
          {/* Accent border at top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent-info"></div>

          <div className="px-8 pt-10 pb-8 bg-accent-success">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-black tracking-tight">
                Client Portal
              </h1>
              <p className="text-black/70 mt-1 text-sm">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <FormLabel className="text-black text-sm font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <div
                            className={cn(
                              "absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors",
                              isEmailFocused ? "text-white" : "black"
                            )}
                          >
                            <Mail className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="name@company.com"
                            className={cn(
                              "pl-12 h-12 bg-white/10 text-white border-white/20",
                              "placeholder:text-white/40 rounded-xl",
                              "focus-visible:ring-2 focus-visible:ring-white focus-visible:border-white"
                            )}
                            {...field}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs ml-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-sm font-medium">
                          Password
                        </FormLabel>
                        <Link
                          href="/client/forgot-password"
                          className="text-black hover:text-white underline text-xs transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative group">
                          <div
                            className={cn(
                              "absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors",
                              isPasswordFocused ? "text-white" : "black"
                            )}
                          >
                            <Lock className="h-5 w-5" />
                          </div>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className={cn(
                              "pl-12 h-12 bg-white/10 text-white border-white/20",
                              "placeholder:text-white/40 rounded-xl",
                              "focus-visible:ring-2 focus-visible:ring-white focus-visible:border-white"
                            )}
                            {...field}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs ml-1" />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="py-3 px-4 rounded-lg bg-red-500/20 border border-red-500/30">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full h-12 mt-2 rounded-xl font-medium text-sm",
                    "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90",
                    "shadow-lg shadow-primary/20 border-0",
                    "text-white tracking-wide uppercase"
                  )}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    </div>
                  ) : (
                    "Access Account"
                  )}
                </Button>
              </form>
            </Form>
            <div className="">
              <div>
                <p>Super Admin</p>
                <p>Email : vijayakumar.r@gliggo.com</p>
                <p>Password : 123456</p>
              </div>
              <div>
                <p>Admin</p>
                <p>Email : mohammed.shahul@gliggo.com</p>
                <p>Password : 123456</p>
              </div>

              <div>
                <p> Sub Admin</p>
                <p>Email : muruganantham.s@gliggo.com</p>
                <p>Password : 123456</p>
              </div>
            </div>

            {/* Divider with text */}
            <div className="relative flex items-center justify-center mt-8 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative px-4 text-xs text-white bg-white/5 rounded-full py-1">
                Secured Connection
              </div>
            </div>

            {/* Security badge */}
            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 text-white/90 text-xs">
                <Shield className="w-3 h-3 text-white" />
                All data is encrypted and secured
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
