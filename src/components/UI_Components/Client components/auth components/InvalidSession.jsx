import React from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, LogIn, Home } from "lucide-react";

const InvalidSessionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Session Expired
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Your session has expired for security reasons. Please sign in
              again to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">
                Security Notice
              </AlertTitle>
              <AlertDescription className="text-amber-700">
                For your protection, we automatically sign you out after a
                period of inactivity.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 pt-3">
            <Button
              className="w-full bg-blue hover:bg-blue/70 text-white font-medium py-2.5"
              size="lg"
              asChild
            >
              <Link
                href="/client/client-login"
                className="flex items-center justify-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In Again
              </Link>
            </Button>

            <div className="flex space-x-3 w-full">
              <Button className="flex-1 text-white" asChild>
                <Link href="/" className="flex items-center justify-center">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-700">
            Need help? Contact our{" "}
            <button className="text-blue hover:text-blue-800 underline font-medium">
              support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvalidSessionPage;
