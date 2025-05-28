"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { IoChatboxEllipses, IoClose, IoSend } from "react-icons/io5";
import { CheckCircle, CheckCircle2, Loader } from "lucide-react";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
// import useSocket from "@/custom hooks/useSocket";
// import socketClient from "@/lib/socket";
import useNotificationStore from "@/store/notificationStore";

import { useSocket } from "@/context/socketContext";
import { cn } from "@/lib/utils";

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
  const { userRole, userId } = useNotificationStore();
  const [unreadedMessages, setUnreadedMessages] = useState(unseenMessageCount);

  const { loading, error, fetchData } = useFetch();
  const { token: accessToken } = useAccessToken();
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
  // Add this useEffect in ChatInterface component
  useEffect(() => {
    if (isOpen) return;
    if (!socket || !isTokenReady) return;

    const room = userRole === "user" ? `user_${userId}` : `admin_${userId}`;

    socket.emit("joinRoom", room);

    return () => {
      socket.emit("leaveRoom", room);
    };
  }, [socket, isTokenReady, userId, userRole, isOpen]);
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

          if (pageNumber === 1) {
            // Handle first page load
            if (newMessages.length === 0 && userRole === "user") {
              // Add default message only if no messages exist
              const defaultMessage = {
                _id: "default-msg",
                sender: "ADMIN",
                content: "How can I help you?",
                createdAt: new Date().toISOString(),
              };
              setMessages([defaultMessage]);
            } else {
              // Replace existing messages with fresh data
              setMessages(newMessages);
            }
          } else {
            // Prepend older messages for pagination
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
    if (!isTokenReady) return;
    setIsOpen(!isOpen);
    // Reset pagination when opening chat
    if (!isOpen) {
      setPage(1);
    }
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
        className={`bg-gradient-to-br from-primary to-primary/95 text-white p-4 rounded-full shadow-2xl transition-all
          ${isOpen ? "scale-0" : "scale-100"}
          hover:from-primary/90 hover:to-primary/90 fixed bottom-6 right-6 z-50 group`}
        disabled={!isTokenReady}
      >
        {!isTokenReady ? (
          <Loader className="w-8 h-8 animate-spin" />
        ) : (
          <>
            {unreadedMessages > 0 && (
              <div className="absolute top-0 right-0 w-6 h-6 bg-red rounded-full flex items-center justify-center text-xs text-white font-semibold">
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
  const MessageList = () => {
    const messageList = useMemo(() => {
      const isPrivilegedViewer =
        userRole === "BIGHIL" || userRole === "SUB ADMIN" || userRole=="SUPER ADMIN";

      return messages.map((msg, index) => {
        const isAdminMessage = ["SUB ADMIN", "SUPER ADMIN"].includes(
          msg.sender
        );
        const isOwnMessage = isPrivilegedViewer
          ? isAdminMessage
          : msg.sender === userRole;

        const isConsecutive =
          index > 0 &&
          messages[index - 1].sender === msg.sender &&
          new Date(msg.createdAt) - new Date(messages[index - 1].createdAt) <
            300000;

        const messageKey = `${msg._id}-${msg.createdAt}-${index}`;

        return (
          <div
            key={messageKey}
            className={cn("group flex w-full transition-transform", {
              "justify-end": isOwnMessage,
              "justify-start": !isOwnMessage,
            })}
          >
            <div
              className={cn("flex gap-2 max-w-[85%] lg:max-w-[75%]", {
                "flex-row-reverse": isOwnMessage,
                "flex-row": !isOwnMessage,
              })}
            >
              {/* Message Bubble */}
              <div
                className={cn(
                  "relative flex flex-col space-y-1 rounded-2xl p-4 shadow-sm transform transition-all",
                  "duration-200 hover:scale-[1.015] hover:shadow-lg",
                  {
                    "bg-primary/90 text-white":
                      isOwnMessage,
                    "bg-white border border-gray-100 shadow-md": !isOwnMessage,
                    "ml-0": !isOwnMessage && !isConsecutive,
                    "mr-0": isOwnMessage && !isConsecutive,
                    "mt-2": isConsecutive,
                  }
                )}
              >
                {/* Sender Label - Always show for admin messages in privileged view */}
                {!isConsecutive && isAdminMessage && isPrivilegedViewer && (
                  <span className="text-xs font-medium text-gray-800 opacity-80  mb-1">
                    {msg.sender}
                  </span>
                )}

                {/* Show sender label for non-admin messages in normal view */}
                {!isConsecutive && !isPrivilegedViewer && !isOwnMessage && (
                  <span className="text-xs font-medium text-primary mb-1">
                    {msg.sender}
                  </span>
                )}

                {/* Message Content */}
                <p className="text-sm leading-relaxed break-words">
                  {msg.content}
                </p>

                {/* Message Metadata */}
                <div
                  className={cn("flex items-center justify-end gap-2 mt-2", {
                    "justify-end": isOwnMessage,
                    "justify-start": !isOwnMessage,
                  })}
                >
                  <time className="text-xs opacity-85">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </time>

                  {isOwnMessage && (
                    <div className="flex items-center gap-1">
                      {msg.status === "sent" && (
                        <Circle className="h-3 w-3 text-white/70" />
                      )}
                      {msg.status === "delivered" && (
                        <CheckCircle className="h-3 w-3 text-white/70" />
                      )}
                      {msg.status === "read" && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-300" />
                      )}
                    </div>
                  )}
                </div>

                {/* Decorative Corner for non-admin messages */}
                {!isOwnMessage && !isPrivilegedViewer && (
                  <div className="absolute -left-1.5 bottom-3 w-2.5 h-2.5 bg-white transform rotate-45 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]" />
                )}
              </div>
            </div>
          </div>
        );
      });
    }, [messages, userRole]);

    return (
      <div className="flex flex-col gap-4 p-4 pb-6">
        {messageList}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {chatToggleButton}

      <div
        className={`glass-container bg-primary backdrop-blur-lg rounded-2xl shadow-2xl transition-transform duration-300 transform origin-bottom-right overflow-hidden
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          fixed bottom-20 right-6 w-[400px] h-[70vh] flex flex-col`}
      >
        <div className="flex items-center justify-between p-4  bg-primary z-50">
          <h3 className="text-lg font-medium text-white">Chat Support</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors bg-red rounded-full"
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

          {<MessageList />}
          <div ref={messagesEndRef} />
        </div>
        {userRole != "ADMIN" &&
          userRole != "BIGHIL" &&
          userRole != "SUPER ADMIN" && (
            <div className="sticky bottom-0 p-4 border-t bg-white/95 backdrop-blur-sm z-10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-primary focus:outline-none
          focus:border-primary/50  focus:ring-primary transition-all
          placeholder:text-text_color text-sm"
                />

                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="p-3 rounded-xl bg-primary text-white
          disabled:opacity-50 disabled:cursor-not-allowed
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
