"use client";
import dynamic from "next/dynamic";

// Dynamically import SignupSigninForm with SSR disabled
const SignupSigninForm = dynamic(
  () =>
    import(
      "@/components/UI_Components/USER_Components/USER_AUTH_Components/SignUpForm"
    ),
  { ssr: false } // Disable server-side rendering for this component
);

export default function User_Login_Page() {
  return (
    <div>
      <SignupSigninForm mode="signup" />
    </div>
  );
}
