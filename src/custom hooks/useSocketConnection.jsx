"use client";
import { useState, useEffect, useCallback } from "react";

const useSocketConnection = (socket, complaintId) => {
  const [isConnected, setIsConnected] = useState(false);

  const joinComplaintRoom = useCallback(() => {
    if (socket && complaintId) {
      // Make sure to use the correct join method on your socket instance.
      socket.joinComplaintRoom(`complaint_${complaintId}`);
    }
  }, [socket, complaintId]);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      setIsConnected(true);
      joinComplaintRoom();
    };

    const handleDisconnect = () => setIsConnected(false);

    // Check initial connection state
    setIsConnected(socket.socket?.connected || false);

    socket.socket?.on("connect", handleConnect);
    socket.socket?.on("disconnect", handleDisconnect);

    return () => {
      socket.socket?.off("connect", handleConnect);
      socket.socket?.off("disconnect", handleDisconnect);
    };
  }, [socket, joinComplaintRoom]);

  return isConnected;
};

export default useSocketConnection;
