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
import { CheckCircle, Loader, Trash2 } from "lucide-react";
import useAccessToken from "@/custom hooks/useAccessToken";
// import useSocket from "@/custom hooks/useSocket";
import { useEffect, useState } from "react";
import useNotificationStore from "@/store/notificationStore";
// import socketClient from "@/lib/socket";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocket } from "@/context/socketContext";

const Notification_Component = ({ notifications }) => {
  const [currentNotifications, setCurrentNotifications] = useState(
    () => notifications
  );

  const token = useAccessToken();
  const { socket } = useSocket();
  const {
    userId,
    increaseNotificationCount,
    decreaseNotificationCount,
    userRole,
  } = useNotificationStore();
  const { loading, success, error, fetchData } = useFetch();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const router = useRouter();
  // Determine base route based on user role
  const isAdminRole = ["SUB ADMIN", "ADMIN", "SUPER ADMIN"].includes(userRole);
  const baseRoute = isAdminRole
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
    };

    socket.on(eventName, handleNewNotification);

    return () => {
      socket && socket.off(eventName, handleNewNotification);
    };
  }, [socket, userId, userRole, increaseNotificationCount]);

  const markAsRead = async (notificationId) => {
    const endpoint =
      userRole === "user"
        ? "/api/user-notifications/mark-as-read"
        : "/api/client-notifications/client-mark-as-read";
    const res = await markNotificationAsRead(notificationId, token, endpoint);

    if (res.success) {
      let shouldDecreaseCount = false;

      const updatedNotifications = currentNotifications.map((notification) => {
        if (notification._id === notificationId) {
          const updatedRecipients = notification.recipients.map((recipient) => {
            if (
              recipient.user.toString() === userId.toString() &&
              !recipient.read
            ) {
              shouldDecreaseCount = true; // Mark for decreasing count
              return { ...recipient, read: true, readAt: new Date() };
            }
            return recipient;
          });

          return { ...notification, recipients: updatedRecipients };
        }
        return notification;
      });

      setCurrentNotifications(updatedNotifications);

      if (shouldDecreaseCount) {
        decreaseNotificationCount();
      }
    }
  };

  const deleteNotification = async (id) => {
    const url = getBackendUrl();

    // Optimistically remove notification from state
    const previousNotifications = [...currentNotifications];
    const updatedNotifications = currentNotifications.filter(
      (n) => n._id !== id
    );
    setCurrentNotifications(updatedNotifications);

    // Find the notification being deleted for the current user
    const notificationToDelete = currentNotifications.find((n) => n._id === id);
    if (notificationToDelete) {
      const currentRecipient = notificationToDelete?.recipients.find(
        (recipient) => recipient.user.toString() === userId.toString()
      );
      if (currentRecipient && currentRecipient.read === false) {
        console.log("Decreasing count");
        decreaseNotificationCount();
      }
    }

    try {
      const endpoint =
        userRole === "user"
          ? "/api/user-notifications/delete-notification"
          : "/api/client-notifications/client-delete-notification";
      const res = await fetchData(
        `${url}${endpoint}`,
        "DELETE",
        { id },
        token,
        false
      );

      if (res.success) {
        const currentPage = Number(page);
        if (updatedNotifications.length === 0 && currentPage > 1) {
          router.refresh();
          if (currentPage === 2) {
            router.push(baseRoute);
          } else {
            router.push(`${baseRoute}?page=${currentPage - 1}`);
          }
        }
      } else {
        // Rollback state if deletion fails
        setCurrentNotifications(previousNotifications);
      }
    } catch (error) {
      // Rollback state if there's an error during the fetch
      setCurrentNotifications(previousNotifications);
    }
  };

  useEffect(() => {
    setCurrentNotifications(notifications);
  }, [notifications, userRole]);

  return (
    <div className="max-w-4xl mx-auto bg-background-tertiary rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">
        Notifications
      </h2>

      {currentNotifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Message</TableHead>
              <TableHead>Complaint</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentNotifications.map((notification, index) => {
              // Find the recipient object for the current user
              const currentRecipient = notification?.recipients.find(
                (recipient) => recipient?.user.toString() === userId?.toString()
              );
              // Determine if the notification is read for the current user
              const isRead = currentRecipient ? currentRecipient.read : true;

              return (
                <TableRow
                  key={`${notification._id}-${index}`}
                  className={`${
                    isRead ? "bg-gray-50" : "bg-blue-300"
                  } hover:bg-gray-200 transition`}
                >
                  <TableCell className="font-medium">
                    {notification.message}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={
                        userRole === "user"
                          ? `/user/my-complaints/${notification.complaintId}?notificationId=${notification._id}`
                          : `/client/client-complaints/${notification.complaintId}?notificationId=${notification._id}`
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View Complaint
                    </Link>
                  </TableCell>
                  <TableCell>
                    {!isRead && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => markAsRead(notification._id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Mark as Read
                      </Button>
                    )}
                    <Button
                      className="bg-red-500 hover:bg-red-400"
                      size="sm"
                      onClick={() => deleteNotification(notification._id)}
                    >
                      {loading ? (
                        <Loader />
                      ) : (
                        <div className="flex">
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </div>
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

export default Notification_Component;
