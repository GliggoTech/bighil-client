"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { toast } from "@/hooks/use-toast";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const { token } = useAccessToken();
  const { userRole, userId, addNotification } = useNotificationStore();

  // Use refs for stable references
  const tokenRef = useRef(token);
  const userRoleRef = useRef(userRole);
  const userIdRef = useRef(userId);

  // Update refs when values change
  useEffect(() => {
    tokenRef.current = token;
    userRoleRef.current = userRole;
    userIdRef.current = userId;
  }, [token, userRole, userId]);

  // Stable notification handler
  const handleNotification = useCallback(
    (data) => {
  
      try {
        // Use the store's addNotification directly
        addNotification(data);

        // Show toast notification
        toast({
          variant: "success",
          title: "New Notification",
          description: data.message,
          duration: 3000, // Increased duration for better visibility
        });
      } catch (error) {
        console.error("Error handling notification:", error);
      }
    },
    [addNotification]
  ); // Only depend on addNotification

  const connectSocket = useCallback(() => {
    if (!tokenRef.current || !userIdRef.current || !userRoleRef.current) {
      
      return null;
    }

   

    const newSocket = io(
      process.env.NEXT_PUBLIC_NODE_DEV === "production"
        ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL,
      {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 3000,
        timeout: 20000,
        auth: { token: tokenRef.current },
      }
    );

    newSocket.on("connect", () => {
    
      setIsConnected(true);
      setConnectionError(null);
      const userRoom =
        userRoleRef.current === "user"
          ? `user_${userIdRef.current}`
          : `admin_${userIdRef.current}`;
     
      newSocket.emit("joinRoom", userRoom);
    });

    newSocket.on("disconnect", (reason) => {
      
      setIsConnected(false);
      if (reason === "io server disconnect") {
        setTimeout(() => {
          if (tokenRef.current && userIdRef.current && userRoleRef.current) {
            connectSocket();
          }
        }, 1000);
      }
    });

    newSocket.on("connect_error", (err) => {
     
      setConnectionError(err.message);
      setIsConnected(false);
    });

    newSocket.on("error", (err) => {
      
      setConnectionError(err.message);
    });

    const eventName =
      userRoleRef.current === "user"
        ? "fetch_user_notifications"
        : "fetch_admin_notifications";

   
    newSocket.on(eventName, handleNotification);

    setSocket(newSocket);
    return newSocket;
  }, [handleNotification]); // Remove token dependency to avoid recreation

  // Separate effect for socket management
  useEffect(() => {
    let socketInstance = null;

    if (token && userId && userRole) {
   
      socketInstance = connectSocket();
    }

    return () => {
      if (socketInstance) {
       
        socketInstance.removeAllListeners();
        socketInstance.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [token, userId, userRole, connectSocket]); // Don't include connectSocket here

  const reconnect = useCallback(() => {
   
    if (socket) {
      socket.disconnect();
    }
    setTimeout(() => connectSocket(), 100);
  }, [socket, connectSocket]);

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
