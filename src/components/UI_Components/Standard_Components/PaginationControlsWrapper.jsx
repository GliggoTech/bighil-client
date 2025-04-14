// components/UI_Components/Standard_Components/PaginationControlsWrapper.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import PaginationControls from "./PaginationControls";

export default function PaginationControlsWrapper({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);

    // Optional: Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
}
