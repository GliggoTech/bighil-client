"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { IoChatboxEllipses, IoClose, IoSend } from "react-icons/io5";
import { Loader } from "lucide-react";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
// import useSocket from "@/custom hooks/useSocket";
// import socketClient from "@/lib/socket";
import useNotificationStore from "@/store/notificationStore";

import { useSocket } from "@/context/socketContext";

const PAGE_LIMIT = 15;

const ChatInterface = ({ complaintId, unseenMessageCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const { userRole } = useNotificationStore();
  const [unreadedMessages, setUnreadedMessages] = useState(unseenMessageCount);

  const { loading, error, fetchData } = useFetch();
  const accessToken = useAccessToken();
  const { socket } = useSocket();

  // Track token readiness
  useEffect(() => {
    if (accessToken) {
      setIsTokenReady(true);
    } else {
      setIsTokenReady(false);
    }
  }, [accessToken]);
  // Update unread count state when prop changes
  useEffect(() => {
    setUnreadedMessages(unseenMessageCount || 0);
  }, [unseenMessageCount]);
  // Memoized socket event handlers
  const handleNewMessage = useCallback((newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleSocketConnect = useCallback(() => {
    if (!socket || !complaintId) {
      return;
    }

    socket.emit("joinComplaintRoom", `complaint_${complaintId}`);
    if (isOpen) {
      socket.emit("joinChatRoom", `chat_${complaintId}`);
    }
    // socket.on("unseen_counts_update", handleUnseenCountUpdate);

    socket.on("new_message", handleNewMessage);

    return () => {
      socket?.off("new_message", handleNewMessage);

      // socket?.off("unseen_counts_update", handleUnseenCountUpdate);

      // socket?.socket?.off("connect", joinRoom);
    };
  }, [socket, complaintId, handleNewMessage, isOpen, isTokenReady]);

  // Fetch messages with memoization
  const fetchMessages = useCallback(
    async (pageNumber = 1) => {
      if (!isTokenReady) return;
      try {
        const url = getBackendUrl();
        const res = await fetchData(
          `${url}/api/chats/get-chats/${complaintId}?page=${pageNumber}&limit=${PAGE_LIMIT}`,
          "GET",
          {},
          accessToken,
          false
        );

        if (res?.success) {
          const newMessages = res.data?.messages || [];

          // If there are no messages, add a default system message
          if (
            pageNumber === 1 &&
            newMessages.length === 0 &&
            userRole == "user"
          ) {
            const defaultMessage = {
              _id: "default-msg",
              sender: "ADMIN",
              content: "How can I help you?",
              createdAt: new Date().toISOString(),
            };

            setMessages([defaultMessage]); // Set only the default message
          } else {
            setMessages((prev) => [...newMessages, ...prev]);
          }

          setHasMore(newMessages.length === PAGE_LIMIT);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    },
    [accessToken, complaintId, fetchData, isTokenReady, userRole]
  );
  // Only open chat when token is ready
  const handleToggleChat = useCallback(() => {
    if (!isTokenReady) {
      console.warn("Cannot open chat - no access token available");
      return;
    }
    setIsOpen(!isOpen);
  }, [isOpen, isTokenReady]);
  // Scroll handlers
  const scrollToBottom = useCallback((behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  const handleScroll = useCallback(() => {
    if (!listRef.current || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const scrolledToTop = scrollTop < 100;
    const totalScroll = scrollHeight - clientHeight;
    const scrollPosition = scrollTop / totalScroll;

    if (scrolledToTop && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  // Modified sendMessage to check token
  const sendMessage = useCallback(async () => {
    if (!isTokenReady) {
      console.error("Cannot send message - no access token available");
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage || !socket) return;

    try {
      socket.emit("joinComplaintRoom", `complaint_${complaintId}`);
      socket.emit("send_message", {
        complaintId,
        message: {
          content: trimmedMessage,
          complaintId,
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [message, complaintId, socket, isTokenReady]);

  // Modified effects to depend on isTokenReady
  useEffect(() => {
    if (isOpen && isTokenReady) {
      socket.emit("joinChatRoom", `chat_${complaintId}`);
      fetchMessages().then(() => scrollToBottom("auto"));
    }

    return () => {
      socket?.emit("leaveChatRoom", `chat_${complaintId}`);
    };
  }, [isOpen, fetchMessages, scrollToBottom, isTokenReady]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    handleSocketConnect();
    return () => {
      socket?.off("new_message", handleNewMessage);
    };
  }, [handleNewMessage, handleSocketConnect, socket]);

  // Add this useEffect to mark as read when opening chat
  useEffect(() => {
    const markAsRead = async () => {
      if (isOpen) {
        try {
          const url = getBackendUrl();
          const res = await fetchData(
            `${url}/api/chats/chat-mark-as-read/${complaintId}`,
            "PATCH",
            {},
            accessToken,
            false
          );
          if (res?.success) {
            setUnreadedMessages(0);
          }
        } catch (error) {
          console.error("Error marking messages as read:", error);
        }
      }
    };

    markAsRead();
  }, [isOpen, complaintId, accessToken, isTokenReady]);

  // Update chat toggle button to show loading state
  const chatToggleButton = useMemo(
    () => (
      <button
        onClick={handleToggleChat}
        className={`bg-gradient-to-br from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all
          ${isOpen ? "scale-0" : "scale-100"}
          hover:from-blue-700 hover:to-purple-700 fixed bottom-6 right-6 z-50 group`}
        disabled={!isTokenReady}
      >
        {!isTokenReady ? (
          <Loader className="w-8 h-8 animate-spin" />
        ) : (
          <>
            {unreadedMessages > 0 && (
              <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-semibold">
                {unreadedMessages}
              </div>
            )}
            <IoChatboxEllipses className="w-8 h-8 transition-transform group-hover:scale-110" />
          </>
        )}
      </button>
    ),
    [isOpen, unreadedMessages, isTokenReady, handleToggleChat]
  );
  const messageList = useMemo(() => {
    const isPrivilegedViewer =
      userRole === "BIGHIL" || userRole === "SUB ADMIN";

    return messages.map((msg, index) => {
      const isOwnMessage = isPrivilegedViewer
        ? msg.sender === "ADMIN" || msg.sender === "SUPER ADMIN"
        : msg.sender === userRole;

      return (
        <div
          key={index}
          className={`flex w-full ${
            isOwnMessage ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`relative max-w-[85%] rounded-2xl p-4 shadow-sm
            ${
              isOwnMessage
                ? "bg-blue-600 text-white"
                : "bg-gray-50 border border-gray-200 text-gray-800"
            }`}
          >
            <p className="text-sm leading-relaxed">{msg.content}</p>
            <time className="text-xs mt-2 block opacity-75">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </time>
          </div>
        </div>
      );
    });
  }, [messages, userRole]);

  return (
    <div className="fixed bottom-0 right-0">
      {chatToggleButton}

      <div
        className={`glass-container bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl transition-transform duration-300 transform origin-bottom-right overflow-hidden
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          fixed bottom-20 right-6 w-[400px] h-[70vh] flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600">
          <h3 className="text-lg font-semibold text-white">Chat Support</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div
          ref={listRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {loading && page > 1 && (
            <div className="flex justify-center py-4">
              <Loader className="animate-spin text-blue-600" />
            </div>
          )}

          {messageList}
          <div ref={messagesEndRef} />
        </div>
        {userRole != "SUB ADMIN" && userRole != "BIGHIL" && (
          <div className="sticky bottom-0 p-4 border-t bg-white/95 backdrop-blur-sm z-10">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none
          focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all
          placeholder:text-gray-400 text-sm"
              />

              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white
          hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all transform hover:scale-105 active:scale-95 shadow-sm"
              >
                <IoSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
