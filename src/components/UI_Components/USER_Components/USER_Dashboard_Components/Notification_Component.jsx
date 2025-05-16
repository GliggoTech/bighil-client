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
import { useEffect, useState } from "react";
import { useSocket } from "@/context/socketContext";
import useNotificationStore from "@/store/notificationStore";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import { useRouter, useSearchParams } from "next/navigation";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { toast } from "@/hooks/use-toast";

const NotificationComponent = ({
  notifications: initialNotifications,
  totalUnread,
  totalPages,
}) => {
  const [processingIds, setProcessingIds] = useState(new Set());
  const { token } = useAccessToken();
  const { socket } = useSocket();
  const {
    userId,
    setNotifications,
    userRole,
    addNotification,
    markAsRead: markNotifications,
    setTotalUnreadCount,
    notifications,
    deleteNotification,
  } = useNotificationStore();
  const { loading, fetchData } = useFetch();
  const searchParams = useSearchParams();
  const router = useRouter();

  // This useEffect updates notifications in store when initialNotifications change
  useEffect(() => {
    if (initialNotifications && Array.isArray(initialNotifications)) {
      // Pass both notifications and totalUnread to store
      setNotifications(initialNotifications, totalUnread);

      // If totalUnread is provided, set it directly
      if (totalUnread !== undefined) {
        setTotalUnreadCount(totalUnread);
      }
    }
  }, [
    initialNotifications,
    totalUnread,
    setNotifications,
    setTotalUnreadCount,
  ]);

  // Socket connection for real-time notifications
  useEffect(() => {
    if (!socket || !userId || !userRole) return;

    const eventName =
      userRole === "user"
        ? "fetch_user_notifications"
        : "fetch_admin_notifications";

    const handleNewNotification = (notification) => {
      addNotification(notification);
    };

    socket.on(eventName, handleNewNotification);
    return () => {
      socket.off(eventName, handleNewNotification);
    };
  }, [socket, userId, userRole, addNotification]);

  // Rest of your component remains the same...
  const getComplaintLink = (notification) => {
    return userRole === "user"
      ? `/user/my-complaints/${notification.complaintId}?notificationId=${notification._id}`
      : `/client/client-complaints/${notification.complaintId}?notificationId=${notification._id}`;
  };

  const handleAction = async (id, action) => {
    if (!token) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      });
      return;
    }

    setProcessingIds((prev) => new Set(prev).add(id));

    try {
      if (action === "read") {
        await markAsRead(id);
      } else {
        await deleteNotificationInComponent(id);
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
      // This will now update the total count correctly
      markNotifications(id);

      toast({
        title: "Success!",
        description: "Notification marked as read",
        variant: "success",
      });
    }
  };

  const deleteNotificationInComponent = async (id) => {
    try {
      const endpoint =
        userRole === "user"
          ? "/api/user-notifications/delete-notification"
          : "/api/client-notifications/client-delete-notification";

      const url = `${getBackendUrl()}${endpoint}`;
      const res = await fetchData(url, "DELETE", { id }, token);

      if (res.success) {
        // This will now update the total count correctly
        deleteNotification(id);

        toast({
          title: "Success!",
          description: "Notification deleted",
          variant: "success",
        });
        const currentPage = Number(searchParams.get("page")) || 1;
        const newTotal = res.data.total; // Assuming API returns new total
        const newTotalPages = Math.ceil(newTotal / 10);
        if (currentPage > newTotalPages) {
          let redirectUrl;
          switch (userRole) {
            case "user":
              redirectUrl = `/user/user-notifications?page=${newTotalPages}`;
              break;
            case "ADMIN":
            case "SUPER ADMIN":
            case "SUB ADMIN":
              redirectUrl = `/client/client-notifications?page=${newTotalPages}`;
          }

          router.push(redirectUrl);
        } else {
          router.refresh(); // Refresh data for current page
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getCurrentRecipient = (notification) => {
    return notification.recipients.find((r) => r.user === userId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 p-2 sm:p-4">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="p-6 text-gray-500">No notifications available</p>
      ) : (
        <Table className="w-full border-b border-b-dialog_inside_border_color border border-dialog_inside_border_color">
          <TableHeader className="!border-b-[2px] !border-dialog_inside_border_color dark:!border-b-gray-700">
            <TableRow>
              <TableHead className="text-text_color dark:text-text-light font-medium sm:uppercase">
                Message
              </TableHead>
              <TableHead className="text-text_color dark:text-text-light font-medium sm:uppercase">
                Complaint
              </TableHead>
              <TableHead className="text-text_color dark:text-text-light font-medium sm:uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => {
              const recipient = getCurrentRecipient(notification);
              const isRead = recipient?.read ?? true;
              const isProcessing = processingIds.has(notification._id);

              return (
                <TableRow
                  key={notification._id}
                  className={`${
                    isRead ? "bg-gray-50" : "bg-blue-50"
                  } transition-colors hover:bg-background-secondary/40 dark:hover:bg-surface-dark/80 border-b border-dialog_inside_border_color dark:border-border-dark animate-fade-in`}
                >
                  <TableCell className="text-text_color dark:text-text-light">
                    {notification.message}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={getComplaintLink(notification)}
                      className="text-blue hover:underline"
                    >
                      View Complaint
                    </Link>
                  </TableCell>
                  <TableCell className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    {!isRead && (
                      <Button
                        size="sm"
                        onClick={() => handleAction(notification._id, "read")}
                        disabled={isProcessing}
                        className="bg-green/10 text-green hover:bg-green/70 hover:text-white focus:outline-none"
                      >
                        {isProcessing ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="sm:block hidden">Mark Read</span>
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => handleAction(notification._id, "delete")}
                      disabled={isProcessing}
                      className="bg-red/10 text-red hover:bg-red/70 hover:text-white focus:outline-none"
                    >
                      {isProcessing ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          <span className="sm:block hidden">Delete</span>
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
