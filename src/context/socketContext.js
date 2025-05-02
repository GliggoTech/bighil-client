// socketContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { toast } from "@/hooks/use-toast";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const token = useAccessToken();
  const { userRole, userId, addNotification } = useNotificationStore();

  const connectSocket = () => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_NODE_DEV == "production"
        ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL,
      {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 3000,
        auth: { token },
      }
    );

    newSocket.on("connect", () => {
      setIsConnected(true);
      setConnectionError(null);
      const userRoom =
        userRole === "user" ? `user_${userId}` : `admin_${userId}`;
      newSocket.emit("joinRoom", userRoom);
    });

    newSocket.on("disconnect", (reason) => {
      setIsConnected(false);
      if (reason === "io server disconnect") {
        setTimeout(connectSocket, 1000);
      }
    });

    newSocket.on("connect_error", (err) => {
      setConnectionError(err.message);
      setIsConnected(false);
    });

    newSocket.on("error", (err) => {
      console.error("Socket error:", err);
      setConnectionError(err.message);
    });

    const handleNotification = (data) => {
      addNotification(data);
      toast({
        variant: "success",
        title: "New Notification",
        description: data.message,
        duration: 2000,
      });
    };

    const eventName =
      userRole === "user"
        ? "fetch_user_notifications"
        : "fetch_admin_notifications";
    newSocket.on(eventName, handleNotification);

    setSocket(newSocket);
    return newSocket;
  };

  useEffect(() => {
    if (!token || !userId || !userRole) return;

    const newSocket = connectSocket();

    return () => {
      if (newSocket) {
        newSocket.offAny();
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [token, userId, userRole]);

  const reconnect = () => {
    if (socket) {
      socket.disconnect();
      connectSocket();
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        connectionError,
        reconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
