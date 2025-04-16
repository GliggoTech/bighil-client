// "use client";
// import { createContext, useContext, useEffect } from "react";
// import { socketManager } from "@/lib/socket";
// import useAccessToken from "@/custom hooks/useAccessToken";
// import useNotificationStore from "@/store/notificationStore";

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const token = useAccessToken();
//   const { userId, userRole } = useNotificationStore();
//   useEffect(() => {
//     if (!userId || !userRole) return;

//     const userRoom = userRole === "user" ? `user_${userId}` : `admin_${userId}`;

//     const handleJoin = async () => {
//       try {
//         socketManager.joinRoom(userRoom);
//         console.log("Successfully joined room:", userRoom);
//       } catch (error) {
//         console.error("Room join error:", error);
//         // Optional: Retry logic here
//       }
//     };

//     handleJoin();

//     return () => {
//       socketManager.leaveRoom(userRoom);
//       console.log("Left room:", userRoom);
//     };
//   }, [userId, userRole]);

//   // Add connection status listener
//   useEffect(() => {
//     const handleConnect = () => console.log("Socket connected");
//     const handleDisconnect = () => console.log("Socket disconnected");

//     socketManager.subscribe("connect", handleConnect);
//     socketManager.subscribe("disconnect", handleDisconnect);

//     return () => {
//       socketManager.unsubscribe("connect", handleConnect);
//       socketManager.unsubscribe("disconnect", handleDisconnect);
//     };
//   }, []);

//   return <SocketContext value={socketManager}>{children}</SocketContext>;
// };

// export const useSocket = () => useContext(SocketContext);

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
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      transports: ["websocket"],
      auth: {
        token: token,
      },
    });
    setSocket(socket);

    const userRoom = userRole === "user" ? `user_${userId}` : `admin_${userId}`;
    socket.emit("joinRoom", userRoom);
    if (userRole == "user") {
      socket.on("fetch_user_notifications", (notifications) => {
        increaseNotificationCount();
        toast({
          variant: "success",
          title: "New Notifications",
          description: notifications.message,
          duration: 2000,
        });
      });
    } else {
      socket.on("fetch_admin_notifications", (notifications) => {
        increaseNotificationCount();
        toast({
          variant: "success",
          title: "New Notifications",
          description: notifications.message,
          duration: 2000,
        });
      });
    }

    return () => socket && socket.close();
  }, [userId, token, userRole, increaseNotificationCount]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(socketContext);
};
