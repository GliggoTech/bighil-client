"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Loader, Trash2, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSocket } from "@/context/socketContext";
import useNotificationStore from "@/store/notificationStore";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import { useRouter, useSearchParams } from "next/navigation";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";

const NotificationComponent = ({ notifications }) => {
  const [currentNotifications, setCurrentNotifications] =
    useState(notifications);
  const [processingIds, setProcessingIds] = useState(new Set());
  const token = useAccessToken();
  const { socket } = useSocket();
  const { userId, decreaseNotificationCount, userRole } =
    useNotificationStore();
  const { loading, fetchData } = useFetch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isAdmin = ["SUB ADMIN", "ADMIN", "SUPER ADMIN"].includes(userRole);
  const baseRoute = isAdmin
    ? "/client/client-notifications"
    : "/user/user-notifications";

  useEffect(() => {
    if (!socket || !userId || !userRole) return;

    const eventName =
      userRole === "user"
        ? "fetch_user_notifications"
        : "fetch_admin_notifications";

    const handleNewNotification = (notification) => {
      setCurrentNotifications((prev) => [notification, ...prev]);
      showNewNotificationToast(notification);
      if (isNotificationForCurrentUser(notification)) {
        toast.info("New Notification", {
          description: notification.message,
          icon: <Bell className="w-5 h-5 text-blue-500" />,
        });
      }
    };

    socket.on(eventName, handleNewNotification);
    return () => {
      socket.off(eventName, handleNewNotification);
    };
  }, [socket, userId, userRole]);

  useEffect(() => {
    setCurrentNotifications(notifications);
  }, [notifications]);

  const isNotificationForCurrentUser = (notification) => {
    return notification.recipients.some((r) => r.user === userId);
  };

  const showNewNotificationToast = (notification) => {
    if (!isNotificationForCurrentUser(notification)) return;

    toast.info("New Notification", {
      description: notification.message,
      action: {
        label: "View",
        onClick: () => router.push(getComplaintLink(notification)),
      },
    });
  };

  const getComplaintLink = (notification) => {
    return userRole === "user"
      ? `/user/my-complaints/${notification.complaintId}?notificationId=${notification._id}`
      : `/client/client-complaints/${notification.complaintId}?notificationId=${notification._id}`;
  };

  const handleAction = async (id, action) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setProcessingIds((prev) => new Set(prev).add(id));

    try {
      if (action === "read") {
        await markAsRead(id);
      } else {
        await deleteNotification(id);
      }
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const markAsRead = async (id) => {
    const endpoint =
      userRole === "user"
        ? "/api/user-notifications/mark-as-read"
        : "/api/client-notifications/client-mark-as-read";

    const res = await markNotificationAsRead(id, token, endpoint);

    if (res.success) {
      updateNotificationState(id, true);
      decreaseNotificationCount();
      toast.success("Notification marked as read");
    }
  };

  const deleteNotification = async (id) => {
    const endpoint =
      userRole === "user"
        ? "/api/user-notifications/delete-notification"
        : "/api/client-notifications/client-delete-notification";

    const url = `${getBackendUrl()}${endpoint}`;
    const res = await fetchData(url, "DELETE", { id }, token);

    if (res.success) {
      handleSuccessfulDelete(id);
      toast.success("Notification deleted");
    }
  };

  const updateNotificationState = (id, isRead) => {
    setCurrentNotifications((prev) =>
      prev.map((notification) =>
        notification._id === id
          ? updateRecipients(notification, isRead)
          : notification
      )
    );
  };

  const updateRecipients = (notification, isRead) => ({
    ...notification,
    recipients: notification.recipients.map((recipient) =>
      recipient.user === userId ? { ...recipient, read: isRead } : recipient
    ),
  });

  const handleSuccessfulDelete = (id) => {
    setCurrentNotifications((prev) => prev.filter((n) => n._id !== id));

    if (currentNotifications.length === 1 && page > 1) {
      const newPage = page === 2 ? baseRoute : `${baseRoute}?page=${page - 1}`;
      router.push(newPage);
    }
  };

  const getCurrentRecipient = (notification) => {
    return notification.recipients.find((r) => r.user === userId);
  };

  return (
    <div className="max-w-4xl mx-auto bg-background-tertiary rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">
        Notifications
      </h2>

      {currentNotifications.length === 0 ? (
        <p className="p-6 text-gray-500">No notifications available</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Message</TableHead>
              <TableHead>Complaint</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentNotifications.map((notification) => {
              const recipient = getCurrentRecipient(notification);
              const isRead = recipient?.read ?? true;
              const isProcessing = processingIds.has(notification._id);

              return (
                <TableRow
                  key={notification._id}
                  className={`${
                    isRead ? "bg-gray-50" : "bg-blue-50"
                  } transition-colors`}
                >
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    <Link
                      href={getComplaintLink(notification)}
                      className="text-blue-600 hover:underline"
                    >
                      View Complaint
                    </Link>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {!isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(notification._id, "read")}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Read
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleAction(notification._id, "delete")}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default NotificationComponent;
