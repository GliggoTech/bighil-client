import { CheckCircle } from "lucide-react";

export function SuccessMessage() {
  return (
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
  );
}