"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// Zod Schema for 6-digit numeric OTP
const otpSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Only digits allowed"),
});

const VerifyTwoFACode = ({ open, onClose }) => {
  const { fetchData, loading: isSubmitting } = useFetch();
  const { token } = useAccessToken();

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const url = getBackendUrl();
      const backendUrl = `${url}/api/client-setting/verify-2fa`;

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
          description: response.error || "Invalid code. Please try again.",
          variant: "destructive",
        });
        onClose(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      onClose(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose(false)}>
      <DialogContent
        className="max-w-md mx-auto bg-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Enter Verification Code</DialogTitle>
          <DialogDescription>
            We've sent a 6-digit code to your registered email.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={otpForm.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >
          <InputOTP
            maxLength={6}
            value={otpForm.watch("code")}
            onChange={(value) => otpForm.setValue("code", value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Error message - Fixed the typo here */}
          {otpForm.formState.errors.code && (
            <p className="text-red-500 text-sm">
              {otpForm.formState.errors.code.message}
            </p>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyTwoFACode;
