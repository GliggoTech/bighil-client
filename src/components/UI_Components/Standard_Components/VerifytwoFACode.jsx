"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Shield,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import useNotificationStore from "@/store/notificationStore";

// Schema for 6-digit numeric OTP
const otpSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Only digits allowed"),
});

const VerifyTwoFACode = ({
  open,
  onClose,
  verifyFunction,
  redirectOnSuccess,
  email = "",
}) => {
  const { fetchData } = useFetch();
  const { token } = useAccessToken();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const {
    setCurrentUserId,
    setCurrentUserRole,
    setCurrentUserName,
    setCurrentUserEmail,
  } = useNotificationStore();

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  // Countdown timer for resend functionality
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleResendCode = async () => {
    setCanResend(false);
    setCountdown(60);
    // Add your resend logic here
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your email.",
      variant: "success",
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (redirectOnSuccess && typeof verifyFunction === "function") {
        const sentToBackend = {
          code: data.code,
          email: email,
        };
        const res = await verifyFunction(sentToBackend);

        if (res.success) {
          setCurrentUserId(res.user.id);
          setCurrentUserRole(res.user.role);
          setCurrentUserName(res.user.name);
          setCurrentUserEmail(res.user.email);

          toast({
            title: "Success!",
            description: res.message || "Verification successful.",
            variant: "success",
          });

          setTimeout(() => router.push("/client/client-dashboard"), 1500);
          return;
        } else {
          toast({
            title: "Verification Failed",
            description: res.message || "Invalid code. Please try again.",
            variant: "destructive",
          });
          return;
        }
      }

      const backendUrl = `${getBackendUrl()}/api/client-setting/verify-2fa`;
      const response = await fetchData(backendUrl, "POST", data, token, false);

      if (response.success) {
        toast({
          title: "Success!",
          description: response.message || "Verification successful.",
          variant: "success",
        });
        onClose(true);
      } else {
        toast({
          title: "Verification Failed",
          description: response.message || "Invalid code. Please try again.",
          variant: "destructive",
        });
        onClose(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
      onClose(false);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCode = otpForm.watch("code");
  const isCodeComplete = currentCode.length === 6;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent
        className="max-w-md mx-auto bg-white border-0 shadow-2xl overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue/10 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple/10 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <DialogHeader className="text-center space-y-4 pb-2">
            {/* Icon with animation */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue/50 to-purple/60 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
              <Shield className="w-8 h-8 text-white" />
            </div>

            <div>
              <DialogTitle className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
                Two-Factor Authentication
              </DialogTitle>
              <DialogDescription className="text-text_color mt-2 text-base leading-relaxed">
                Enter the 6-digit verification code sent to your email address
              </DialogDescription>
            </div>

            {/* Email display */}
            {email && (
              <div className="flex items-center justify-center gap-2 bg-blue/5 border border-blue/20 rounded-lg p-3 mt-4">
                <Mail className="w-4 h-4 text-blue/60" />
                <span className="text-sm font-medium text-blue-800">
                  {email}
                </span>
              </div>
            )}
          </DialogHeader>

          <form
            onSubmit={otpForm.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            {/* OTP Input with custom styling */}
            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={currentCode}
                onChange={(value) => otpForm.setValue("code", value)}
                className="gap-3"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-14 text-xl font-bold border-2 border-primary rounded-xl focus:border-blue/50 focus:ring-2 focus:ring-blue/20 transition-all duration/20 bg-white backdrop-blur-sm"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-14 text-xl font-bold border-2 border-primary rounded-xl focus:border-blue/50 focus:ring-2 focus:ring-blue/20 transition-all duration/20 bg-white backdrop-blur-sm"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-14 text-xl font-bold border-2 border-primary rounded-xl focus:border-blue/50 focus:ring-2 focus:ring-blue/20 transition-all duration/20 bg-white backdrop-blur-sm"
                  />
                </InputOTPGroup>
                <InputOTPSeparator className="text-gray-400">
                  <div className="w-2 h-0.5 bg-gray-300 rounded-full"></div>
                </InputOTPSeparator>
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-14 text-xl font-bold border-2 border-primary rounded-xl focus:border-blue/50 focus:ring-2 focus:ring-blue/20 transition-all duration/20 bg-white backdrop-blur-sm"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-14 text-xl font-bold border-2 border-primary rounded-xl focus:border-blue/50 focus:ring-2 focus:ring-blue/20 transition-all duration/20 bg-white backdrop-blur-sm"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-14 text-xl font-bold border-2 border-primary rounded-xl focus:border-blue/50 focus:ring-2 focus:ring-blue/20 transition-all duration/20 bg-white backdrop-blur-sm"
                  />
                </InputOTPGroup>
              </InputOTP>

              {/* Progress indicator */}
              <div className="flex space-x-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                      i < currentCode.length
                        ? "bg-gradient-to-r from-primary/50 to-primary/90"
                        : "bg-gray/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error message with icon */}
            {otpForm.formState.errors.code && (
              <div className="flex items-center gap-2 p-3 bg-red/5 border border-red/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red/50 flex-shrink-0" />
                <p className="text-red/60 text-sm font-medium">
                  {otpForm.formState.errors.code.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !isCodeComplete}
              className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isCodeComplete && !isLoading
                  ? "bg-primary hover:from-blue/70 hover:to-purple/70 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray/20 text-gray/50 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : isCodeComplete ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Verify Code</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              ) : (
                "Enter 6-digit code"
              )}
            </Button>

            {/* Resend code section */}
            <div className="text-center pt-2">
              <p className="text-sm text-text_color mb-2">
                Didn't receive the code?
              </p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-blue hover:text-blue/70 font-medium text-sm transition-colors duration/20 hover:underline"
                >
                  Resend Code
                </button>
              ) : (
                <p className="text-text_color text-sm">
                  Resend available in {countdown}s
                </p>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyTwoFACode;
