"use client";
import useAccessToken from "@/custom hooks/useAccessToken";
import { toast } from "@/hooks/use-toast";
import useNotificationStore from "@/store/notificationStore";
import { createContext, useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";
const socketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const token = useAccessToken();

  const {
    userRole,
    userId,
    increaseNotificationCount,
    decreaseNotificationCount,
  } = useNotificationStore();

  useEffect(() => {
    let newSocket = null;
    const connectSocket = () => {
      newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        auth: {
          token: token,
        },
      });

      // Connection lifecycle handlers
      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        const userRoom =
          userRole === "user" ? `user_${userId}` : `admin_${userId}`;
        newSocket.emit("joinRoom", userRoom);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        if (reason === "io server disconnect") {
          setTimeout(connectSocket, 1000);
        }
      });

      newSocket.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
      });

      // Unified notification handler
      const handleNotification = (notifications) => {
        increaseNotificationCount();
        toast({
          variant: "success",
          title: "New Notifications",
          description: notifications.message,
          duration: 2000,
        });
      };

      // Event listeners
      if (userRole === "user") {
        newSocket.on("fetch_user_notifications", handleNotification);
      } else {
        newSocket.on("fetch_admin_notifications", handleNotification);
      }

      setSocket(newSocket);
    };

    if (token && userId && userRole) {
      connectSocket();
    }

    return () => {
      if (newSocket) {
        // Cleanup listeners
        newSocket.off("fetch_user_notifications");
        newSocket.off("fetch_admin_notifications");
        newSocket.off("connect");
        newSocket.off("disconnect");
        newSocket.off("connect_error");
        newSocket.close();
        setSocket(null);
      }
    };
  }, [userId, token, userRole, increaseNotificationCount]); // Removed increaseNotificationCount from deps

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(socketContext);
};
