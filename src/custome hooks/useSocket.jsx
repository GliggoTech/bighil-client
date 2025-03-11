// "use client";
// import socketClient from "@/lib/socket";
// import { useEffect, useState } from "react";

// const useSocket = (accessToken) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!accessToken || socket) return; // Prevent multiple socket instances

//     // Initialize socket connection
//     const socketInstance = socketClient.initialize(accessToken);
//     setSocket(socketInstance.socket);
//     console.log("Socket initialized", socketInstance.socket);

//     // Cleanup: Disconnect socket on component unmount
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [accessToken]); // Depend on accessToken and complaintId

//   return socket;
// };

// export default useSocket;
// hooks/useSocket.js
// "use client";
// import { SocketContext } from "@/context/socketContext";
// import { useContext } from "react";

// const useSocket = () => {
//   return useContext(SocketContext);
// };

// export default useSocket;
