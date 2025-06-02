"use client";
import { useState } from "react";
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
import { Shield, AlertCircle, Loader2, KeyRound } from "lucide-react";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export function TwoFactorDialog({
  onSubmit,
  onBack,
  isLoading,
  errorMessage,
  rememberDevice,
  setRememberDevice,
}) {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-client_login_bg to-client_login_bg/90 p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Two-Factor Authentication
              </h2>
              <p className="text-sm text-gray-600">
                Please enter the 6-digit code from your authenticator app
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Authentication Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="000000"
                          maxLength={6}
                          className="text-center text-lg tracking-widest"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberDevice"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberDevice"
                    className="text-sm text-gray-600"
                  >
                    Remember this device for 30 days
                  </label>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red/5 border border-red/20 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red flex-shrink-0" />
                    <p className="text-sm text-red">{errorMessage}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-blue/60 hover:bg-blue/70 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <KeyRound className="h-4 w-4 mr-2" />
                    )}
                    Verify Code
                  </Button>

                  <Button
                    type="button"
                    onClick={onBack}
                    className="w-full bg-primary text-gray-500 hover:text-gray-700"
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
