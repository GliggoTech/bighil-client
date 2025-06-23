"use client";

import ErrorPage from "@/components/UI_Components/ErrorComponents/ErrorPage";

export default function Error({
  title = "Oops!",
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div>
      <ErrorPage title={title} message={message} />
    </div>
  );
}
