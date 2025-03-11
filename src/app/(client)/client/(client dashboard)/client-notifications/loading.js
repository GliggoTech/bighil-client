import { ComplaintsTableSkeleton } from "@/components/UI_Components/Client components/client dashboard components/admin recent complaints table components/ComplaintsTableSkeleton";
import React from "react";

const NotificationsLoading = () => {
  return (
    <div>
      <ComplaintsTableSkeleton />
    </div>
  );
};

export default NotificationsLoading;
