"use client";
import Link from "next/link";

export function SignUpLink() {
  return (
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
  );
}
