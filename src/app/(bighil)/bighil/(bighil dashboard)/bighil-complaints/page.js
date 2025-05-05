"use client";

import dynamic from "next/dynamic";

const ComplaintFilter = dynamic(
  () =>
    import("@/components/UI_Components/Standard_Components/ComplaintFilter"),
  { ssr: false }
);

export default function BighilComplaintPage() {
  return (
    <div>
      <ComplaintFilter bighil={true} />
    </div>
  );
}
