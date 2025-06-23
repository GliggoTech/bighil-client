'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, RefreshCw, Home, User } from "lucide-react";
import { Suspense } from "react";

function InvalidSessionContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  // Determine login path based on role
  const getLoginPath = () => {
    if (!role) return "/";
    
    switch (role.toLowerCase()) {
      case 'client':
        return "/client/client-login";
      case 'user':
        return "/user/user-login";
      case 'bighil':
        return "/bighil/bighil-login";
      default:
        return "/";
    }
  };

  const getRoleDisplayName = () => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-red rounded-full flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold bg-text_color bg-clip-text text-transparent">
              Session Expired
            </CardTitle>
            <CardDescription className="text-text_color text-base">
              Your session has timed out for security reasons
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Alert className="border-red bg-red/10">
              <RefreshCw className="h-4 w-4 text-red" />
              <AlertDescription className="text-red">
                {role ? (
                  <>
                    Your session has expired. Please log in again to continue.
                  </>
                ) : (
                  "Your session has expired. Please log in again to continue."
                )}
              </AlertDescription>
            </Alert>

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
                  <User className="w-4 h-4" />
                  {role ? `Login as ${getRoleDisplayName()}` : "Login Again"}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-gray-200 hover:bg-gray/5 transition-all duration-300"
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
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary rounded-full opacity-10 animate-bounce delay-300"></div>
        <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-primary rounded-full opacity-10 animate-bounce delay-700"></div>
      </div>
    </div>
  );
}

export default function InvalidSession() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <InvalidSessionContent />
    </Suspense>
  );
}