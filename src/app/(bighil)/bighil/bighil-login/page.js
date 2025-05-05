// "use client";
// import dynamic from "next/dynamic";

import BighilLoginForm from "@/components/UI_Components/Bighil Components/BighilLoginForm";

// const BighilLoginForm = dynamic(
//   () => import("@/components/UI_Components/Bighil Components/BighilLoginForm"),
//   { ssr: false } // Disable SSR for this component
// );

export default function Bighil_Login_Page() {
  return (
    <div>
      <BighilLoginForm />
    </div>
  );
}
