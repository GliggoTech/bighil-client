"use client";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  LogOut,
  Loader2,
} from "lucide-react";

export function SessionConflictDialog({
  activeSessions,
  onContinue,
  onLogoutOthers,
  onCancel,
  isLoading,
}) {
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
                onClick={onContinue}
                className="w-full bg-primary hover:bg-primary/80 text-white"
                disabled={isLoading}
              >
                Continue with Current Session
              </Button>

              <Button
                onClick={onLogoutOthers}
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
                onClick={onCancel}
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
