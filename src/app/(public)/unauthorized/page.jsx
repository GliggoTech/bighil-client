"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft, Home, Lock, AlertTriangle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
function UnauthoroizedContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const requiredRole = searchParams.get("required");
  const returnUrl = searchParams.get("return") || "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRoleDisplayName = (roleStr) => {
    if (!roleStr) return "User";
    return roleStr.charAt(0).toUpperCase() + roleStr.slice(1);
  };

  const getLoginPath = () => {
    if (!role) return "/";

    switch (role.toLowerCase()) {
      case "client":
        return "/client/client-login";
      case "user":
        return "/user/user-login";
      case "bighil":
        return "/bighil/bighil-login";

      default:
        return "/";
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow/10 to-orange/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-red rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-red bg-clip-text text-transparent">
              Access Denied
            </CardTitle>
            <CardDescription className="text-text_color text-base">
              You don't have permission to access this resource
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Alert className="border-red ">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red">
                {role && requiredRole ? (
                  <>
                    Your current role doesn't have access to this resource.
                    <span className="font-semibold">
                      {" "}
                      {getRoleDisplayName(requiredRole)}
                    </span>{" "}
                    access is required.
                  </>
                ) : role ? (
                  <>Your current role doesn't have sufficient permissions.</>
                ) : (
                  "This resource requires special permissions that you don't currently have."
                )}
              </AlertDescription>
            </Alert>

            <div className="bg-white rounded-lg p-4  ">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-red" />
                <span className="font-medium text-text_color">
                  What you can do:
                </span>
              </div>
              <ul className="text-sm text-text_color space-y-1 ml-6">
                <li>• Contact your administrator for access</li>
                <li>• Login with a different account</li>
                <li>• Return to an accessible area</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Link
                  href={getLoginPath()}
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Login with Different Account
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-gray-200 hover:bg-gray/50 transition-all duration-300"
                size="lg"
              >
                <Link
                  href={returnUrl}
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="w-full hover:bg-gray/50 transition-all duration-300"
                size="lg"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Return to Home
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-blue/60 hover:text-blue/70 font-medium hover:underline"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Floating decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-red rounded-full opacity-20 animate-bounce delay-300"></div>
        <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-red rounded-full opacity-20 animate-bounce delay-700"></div>
      </div>
    </div>
  );
}
export default function Unauthorized() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }
    >
      <UnauthoroizedContent />
    </Suspense>
  );
}
