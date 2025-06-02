"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useNotificationStore from "@/store/notificationStore";
import {
  clientLogin,
  removeOtherLoggedinDevicesWithoutOtp,
  twoFactorVerification,
} from "@/app/actions/client.actions";
import { LoginHeader } from "./LoginHeader";
import { TwoFactorDialog } from "./TwoFactorDialog";
import { SessionConflictDialog } from "./SessionConflictDialog";
import { SuccessMessage } from "./SuccessMessage";
import { TestCredentials } from "./TestCredentials";
import { SignUpLink } from "./SignUpLink";
import { ClientLoginForm } from "./ClientLoginForm";

export default function EnhancedLoginForm() {
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
  const [showTwoFaDialog, setShowTwoFaDialog] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const [showSessionConflict, setShowSessionConflict] = useState(false);
  const [currentDeviceId, setCurrentDeviceId] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      setCurrentEmail(data.email);
      setPassword(data.password);
      const res = await clientLogin({ ...data, rememberDevice });

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
      setOtp(data.otp);
      const res = await twoFactorVerification({
        email: currentEmail,
        otp: data.otp,
        rememberDevice,
        logoutOtherDevices: true,
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
      let res;
      if (showSessionConflict) {
        res = await twoFactorVerification({
          email: currentEmail,
          otp: otp,
          rememberDevice,
          logoutOtherDevices: true,
        });
      } else {
        res = await removeOtherLoggedinDevicesWithoutOtp({
          email: currentEmail,
          password: password,
        });
      }

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

  // Show session conflict dialog
  if (showSessionConflict) {
    return (
      <SessionConflictDialog
        activeSessions={activeSessions}
        onContinue={() => setShowSessionConflict(false)}
        onLogoutOthers={handleLogoutOtherDevices}
        onCancel={() => {
          setShowSessionConflict(false);
          setShowTwoFaDialog(false);
        }}
        isLoading={isLoading}
      />
    );
  }

  // Show two-factor dialog
  if (showTwoFaDialog) {
    return (
      <TwoFactorDialog
        onSubmit={onOtpSubmit}
        onBack={() => setShowTwoFaDialog(false)}
        isLoading={isLoading}
        errorMessage={errorMessage}
        rememberDevice={rememberDevice}
        setRememberDevice={setRememberDevice}
      />
    );
  }

  // Main login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-client_login_bg to-client_login_bg/90 p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
          <LoginHeader />

          <div className="p-6">
            {isSuccess ? (
              <SuccessMessage />
            ) : (
              <>
                <ClientLoginForm
                  onSubmit={onSubmit}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  rememberDevice={rememberDevice}
                  setRememberDevice={setRememberDevice}
                />
                <TestCredentials />
                <SignUpLink />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
