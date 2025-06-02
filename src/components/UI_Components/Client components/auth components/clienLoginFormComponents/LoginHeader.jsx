import { User } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="bg-white/10 p-6 text-text_color">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-primary/20 bg-opacity-20 rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-primary" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
      <p className="text-text_color text-center text-sm">
        Sign in to your account to continue
      </p>
    </div>
  );
}
