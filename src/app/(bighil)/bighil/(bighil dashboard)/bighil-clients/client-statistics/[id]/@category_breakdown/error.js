"use client";

import ErrorPage from "@/components/UI_Components/ErrorComponents/ErrorPage";

export default function Error() {
  return (
    <div>
      <ErrorPage
        title="Oops!"
        message="Something went wrong. Please try again."
      />
    </div>
  );
}
