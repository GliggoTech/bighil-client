"use client";
import dynamic from "next/dynamic";
const LoginForm = dynamic(
  () =>
    import(
      "@/components/UI_Components/Client components/auth components/LoginForm"
    ),
  {
    ssr: false,
  }
);
export default function Client_Login_Page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
