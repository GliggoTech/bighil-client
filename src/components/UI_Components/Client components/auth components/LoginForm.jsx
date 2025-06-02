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
import {
  Mail,
  Lock,
  Shield,
  AlertCircle,
  Loader2,
  CheckCircle,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Info,
  X,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useNotificationStore from "@/store/notificationStore";
import Link from "next/link";
import {
  clientLogin,
  twoFactorVerification,
} from "@/app/actions/client.actions";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string().trim().min(1, "Password is required"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export default function EnhancedLoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const router = useRouter();
  const {
    setCurrentUserId,
    setCurrentUserRole,
    setCurrentTheme,
    setCurrentUserName,
    setCurrentUserEmail,
    setCurrentDeviceId: setDeviceId,
  } = useNotificationStore();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showTwoFaDialog, setShowTwoFaDialog] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const [showSessionConflict, setShowSessionConflict] = useState(false);
  const [currentDeviceId, setCurrentDeviceId] = useState("");

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatLastLogin = (date) => {
    return new Date(date).toLocaleString();
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await clientLoginFormFunction({ ...data, rememberDevice });
      console.log(res);
      if (res.hasActiveSessionsOnOtherDevices) {
        setActiveSessions(res.activeSessions || []);
        setCurrentDeviceId(res.deviceId);
        setShowSessionConflict(true);
      }

      if (res.requiresTwoFactor) {
        setShowTwoFaDialog(true);
        return;
      }

      if (res.success) {
        setIsSuccess(true);
        setCurrentUserId(res.user.id);
        setCurrentUserRole(res.user.role);
        setCurrentTheme(res.user.theme);
        setCurrentUserName(res.user.name);
        setCurrentUserEmail(res.user.email);
        setDeviceId(res.deviceId);
        setTimeout(() => {
          router.push("/client/client-dashboard");
        }, 100);
      } else {
        setErrorMessage(
          res.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await verifyTwoFactorAndLogin({
        email: form.getValues("email"),
        otp: data.otp,
        rememberDevice,
        logoutOtherDevices: true, // This will be set based on user choice
      });

      if (res.success) {
        setIsSuccess(true);
        setCurrentUserId(res.user.id);
        setCurrentUserRole(res.user.role);
        setCurrentTheme(res.user.theme);
        setCurrentUserName(res.user.name);
        setCurrentUserEmail(res.user.email);

        setTimeout(() => {
          router.push("/client/client-dashboard");
        }, 100);
      } else {
        setErrorMessage(res.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutOtherDevices = async () => {
    try {
      setIsLoading(true);
      const res = await verifyTwoFactorAndLogin({
        email: form.getValues("email"),
        otp: otpForm.getValues("otp"),
        rememberDevice,
        logoutOtherDevices: true,
      });

      if (res.success) {
        setIsSuccess(true);
        setShowSessionConflict(false);
        setShowTwoFaDialog(false);

        setTimeout(() => {
          router.push("/client/client-dashboard");
        }, 100);
      }
    } catch (error) {
      setErrorMessage("Failed to logout other devices. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock functions - replace with your actual API calls
  const clientLoginFormFunction = async (data) => {
    const res = await clientLogin(data);
    return res;
  };

  const verifyTwoFactorAndLogin = async (data) => {
    const res = await twoFactorVerification(data);
    console.log(res);
    return res;
  };

  if (showSessionConflict) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-client_login_bg to-client_login_bg/90 p-4">
        <div className="w-full max-w-md">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Multiple Sessions Detected
                </h2>
                <p className="text-sm text-gray-600">
                  Your account is already logged in on other devices. You can
                  continue or logout from other devices.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-medium text-gray-900">
                  Active Sessions:
                </h3>
                {activeSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(session.deviceType)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {session.deviceName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.browser} • {session.os}
                        </p>
                        {session.location && (
                          <p className="text-xs text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {session.location.city}, {session.location.country}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatLastLogin(session.lastLoginAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setShowSessionConflict(false)}
                  className="w-full bg-primary hover:bg-primary/80 text-white"
                  disabled={isLoading}
                >
                  Continue with Current Session
                </Button>

                <Button
                  onClick={handleLogoutOtherDevices}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <LogOut className="h-4 w-4 mr-2" />
                  )}
                  Logout Other Devices
                </Button>

                <Button
                  onClick={() => {
                    setShowSessionConflict(false);
                    setShowTwoFaDialog(false);
                  }}
                  variant="ghost"
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showTwoFaDialog) {
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

              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={otpForm.control}
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
                      onClick={() => setShowTwoFaDialog(false)}
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-client_login_bg to-client_login_bg/90 p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl ">
          {/* Header */}
          <div className="bg-white/10 p-6 text-text_color">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/20 bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-text_color text-center text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green/60" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Login Successful!
                </h3>
                <p className="text-sm text-gray-600">
                  Redirecting you to your dashboard...
                </p>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 border-none"
                                autoComplete="email"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-10 border-none"
                                autoComplete="current-password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/90"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberDevice}
                          onChange={(e) => setRememberDevice(e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary  border-gray-300 rounded"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-sm text-gray-600"
                        >
                          Remember me
                        </label>
                      </div>

                      <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {errorMessage && (
                      <div className="p-3 bg-red/5 border border-red/20 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red flex-shrink-0" />
                        <p className="text-sm text-red/80">{errorMessage}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <ArrowRight className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>

                {/* Test Credentials Toggle */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowCredentials(!showCredentials)}
                    className="w-full flex items-center justify-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <Info className="h-4 w-4" />
                    <span>
                      {showCredentials ? "Hide" : "Show"} Test Credentials
                    </span>
                  </button>

                  {showCredentials && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                      <p className="font-medium mb-2">Test Credentials:</p>
                      <p>
                        <strong>Email:</strong> test@example.com
                      </p>
                      <p>
                        <strong>Password:</strong> password123
                      </p>
                      <p className="mt-2 text-gray-500">
                        Use these credentials for testing purposes
                      </p>
                    </div>
                  )}
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
