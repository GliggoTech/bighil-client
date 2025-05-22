"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Lock,
  Mail,
  Shield,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import Link from "next/link";
import { endpoints } from "@/utils/endPointsHelper";
import { cn } from "@/lib/utils";

// Form schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const passwordSchema = z.object({
  password: z.string().min(1, "Password must be at least 8 characters"),
});

export default function PasswordResetPage({ role }) {
  const [currentStep, setCurrentStep] = useState("email");
  const { loading, success, error, fetchData } = useFetch();
  const { token } = useAccessToken();
  const url = getBackendUrl();
  const [animateDirection, setAnimateDirection] = useState("forward");

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  });

  // Get the correct endpoint based on the role
  const roleType = role?.toLowerCase() || "client";
  const otpSentEndPoint = endpoints[roleType]?.otpSent || "/default/sendOtp";
  const otpVerifyEndPoint =
    endpoints[roleType]?.otpVerify || "/default/verifyOtp";
  const resetpasswordEndPoint =
    endpoints[roleType]?.resetPassword || "/default/resetPassword";
  const loginLink = endpoints[roleType]?.login || "/default-login";

  const steps = [
    { id: "email", label: "Email", icon: Mail },
    { id: "otp", label: "Verification", icon: Shield },
    { id: "password", label: "New Password", icon: Lock },
    { id: "success", label: "Complete", icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const handleSendOtp = async (data) => {
    try {
      const res = await fetchData(
        `${url}${otpSentEndPoint}`,
        "POST",
        data,
        token,
        false
      );
      if (res.success) {
        setAnimateDirection("forward");
        setCurrentStep("otp");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async (data) => {
    const sendToBackend = {
      otp: data.otp,
      email: emailForm.getValues("email"),
    };

    try {
      const res = await fetchData(
        `${url}${otpVerifyEndPoint}`,
        "POST",
        sendToBackend,
        token,
        false
      );
      if (res.success) {
        setAnimateDirection("forward");
        setCurrentStep("password");
      }
    } catch (err) {
  
      console.log(err);
    }
  };

  const handlePasswordReset = async (data) => {
    const dataSendToBackend = {
      newPassword: data.password,
      email: emailForm.getValues("email"),
    };

    try {
      const res = await fetchData(
        `${url}${resetpasswordEndPoint}`,
        "POST",
        dataSendToBackend,
        token,
        false
      );
      if (res.success) {
        setAnimateDirection("forward");
        setCurrentStep("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      {/* Main container with glass effect */}
      <div className="w-full max-w-lg relative">
        {/* Progress steps */}
        <div className="hidden sm:flex justify-between items-center mb-6 px-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                  currentStepIndex >= index
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : " border-2 border-primary text-primary"
                )}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="hidden sm:block text-xs font-medium text-text-secondary">
                {step.label}
              </div>
              {index < steps.length - 1 && (
                <div
                  className="absolute h-1 bg-border-light"
                  style={{
                    left: `${
                      (100 / (steps.length - 1)) * index +
                      100 / (steps.length - 1) / 2
                    }%`,
                    width: `${100 / (steps.length - 1)}%`,
                    top: "1.5rem",
                    transform: "translateY(-50%) translateX(-50%)",
                    zIndex: -1,
                  }}
                >
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: currentStepIndex > index ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Card container with subtle animation */}
        <div
          className={cn(
            "bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10",
            " relative z-10"
          )}
        >
          {/* Top gradient line */}
          <div className="h-1 w-full bg-primary"></div>

          <div className="p-8 sm:p-10">
            {/* Title area */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/50 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  {currentStep === "email" && (
                    <Mail className="h-6 w-6 text-white" />
                  )}
                  {currentStep === "otp" && (
                    <Shield className="h-6 w-6 text-white" />
                  )}
                  {currentStep === "password" && (
                    <KeyRound className="h-6 w-6 text-white" />
                  )}
                  {currentStep === "success" && (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-2 bg-primary bg-clip-text text-transparent">
                {currentStep === "email" && "Reset Password"}
                {currentStep === "otp" && "Verify Identity"}
                {currentStep === "password" && "Create New Password"}
                {currentStep === "success" && "All Done!"}
              </h1>

              <p className="text-text_color max-w-md">
                {currentStep === "email" &&
                  "Enter your email to receive a verification code"}
                {currentStep === "otp" &&
                  "Enter the 6-digit code sent to your email"}
                {currentStep === "password" &&
                  "Choose a secure password for your account"}
                {currentStep === "success" &&
                  "Your password has been reset successfully"}
              </p>
            </div>

            {/* Error/Success messages */}
            {error && (
              <Alert className="mb-6 animate-fade-in bg-red/10 text-red border-red/20">
                <AlertDescription className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-success/10 text-success border-success/20 animate-fade-in">
                <AlertDescription className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Form steps */}
            <div
              className={cn(
                "transition-all duration-300",
                animateDirection === "forward"
                  ? "animate-slide-up"
                  : "animate-slide-down"
              )}
            >
              {currentStep === "email" && (
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(handleSendOtp)}
                    className="space-y-6"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text_color font-medium flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-primary" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="name@example.com"
                                className="pl-4 pr-4 py-4 h-10 bg-primary/5 border-2 border-primary/50 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/30 shadow-sm"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary/50">
                                <Mail className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage className="text-accent-danger text-sm mt-1 ml-1" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-6 rounded-xl bg-primary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-base shadow-lg shadow-primary/20"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sending Code...
                        </div>
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>

                    <div className="text-center mt-4 text-text-secondary text-sm">
                      Remember your password?{" "}
                      <Link
                        href={loginLink}
                        className="text-primary hover:underline font-medium"
                      >
                        Back to login
                      </Link>
                    </div>
                  </form>
                </Form>
              )}

              {currentStep === "otp" && (
                <Form {...otpForm}>
                  <form
                    onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                    className="space-y-6"
                  >
                    <div className="mb-6 flex items-center justify-center">
                      <div className="text-center px-6 py-3 rounded-full bg-primary/10 text-text_color text-sm font-medium">
                        Code sent to {emailForm.getValues("email")}
                      </div>
                    </div>

                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">
                            Verification Code
                          </FormLabel>
                          <FormControl>
                            <div className="flex justify-center my-6">
                              <InputOTP
                                value={field.value}
                                onChange={field.onChange}
                                maxLength={6}
                              >
                                <InputOTPGroup className="flex justify-center gap-2 ">
                                  {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <InputOTPSlot
                                      key={index}
                                      index={index}
                                      className="w-10 h-10 text-xl font-light  border-2 border-primary focus:border-primary rounded-xl shadow-sm bg-background-primary"
                                    />
                                  ))}
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage className="text-center text-danger mt-1" />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col space-y-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 rounded-xl bg-primary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-base shadow-lg shadow-primary/20"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Verifying...
                          </div>
                        ) : (
                          "Verify Code"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setAnimateDirection("backward");
                          setCurrentStep("email");
                        }}
                        className="w-full py-6 rounded-xl border-border-light text-text-secondary hover:bg-background-secondary bg-transparent"
                      >
                        Back
                      </Button>
                    </div>

                    <div className="text-center mt-4 text-text-secondary text-sm">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={() => emailForm.handleSubmit(handleSendOtp)()}
                        className="text-primary hover:underline font-medium"
                      >
                        Resend
                      </button>
                    </div>
                  </form>
                </Form>
              )}

              {currentStep === "password" && (
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordReset)}
                    className="space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text_color font-medium flex items-center">
                            <Lock className="w-4 h-4 mr-2 text-primary" />
                            New Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type="password"
                                placeholder="••••••••"
                                className="pl-4 pr-4 py-6 bg-primary/10 border-2 border-primary/50 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/30 shadow-sm"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text_color">
                                <Lock className="h-5 w-5" />
                              </div>
                            </div>
                          </FormControl>
                          <div className="text-xs text-text-secondary mt-2 ml-1">
                            Password should be at least 8 characters with mixed
                            cases, numbers & symbols
                          </div>
                          <FormMessage className="text-accent-danger text-sm mt-1 ml-1" />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col space-y-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 rounded-xl bg-primary   text-white font-medium text-base shadow-lg shadow-primary/20"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Updating Password...
                          </div>
                        ) : (
                          "Reset Password"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setAnimateDirection("backward");
                          setCurrentStep("otp");
                        }}
                        className="w-full py-6 rounded-xl border-border-light text-text-secondary hover:bg-background-secondary bg-transparent"
                      >
                        Back
                      </Button>
                    </div>
                  </form>
                </Form>
              )}

              {currentStep === "success" && (
                <div className="text-center space-y-6 py-4">
                  <div className="inline-flex items-center justify-center p-2 rounded-full bg-accent-success/10 mb-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-success to-primary rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text_color">
                    Password Reset Complete
                  </h3>

                  <p className="text-text-secondary max-w-sm mx-auto">
                    Your password has been successfully reset. You can now log
                    in with your new credentials.
                  </p>

                  <Link href={loginLink} className="block">
                    <Button className="w-full py-6 rounded-xl bg-primary  text-white font-medium text-base shadow-lg shadow-primary/20">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom security indicator */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2 text-text-secondary bg-background-primary/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs border border-white/5">
            <Lock className="h-3 w-3 text-primary" />
            Secured with end-to-end encryption
          </div>
        </div>
      </div>
    </div>
  );
}
