"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useNotificationStore = create(
  persist(
    (set, get) => ({
      userId: null,
      userRole: null,
      notificationCount: 0, // Total unread count from API
      notifications: [], // Current page of notifications
      lastSync: null,
      userName: null,
      userEmail: null,

      currentTheme: "light", // Default theme

      // Actions
      setCurrentUserId: (userId) => set({ userId }),
      setCurrentUserRole: (userRole) => set({ userRole }),
      setCurrentUserEmail: (userEmail) => set({ userEmail }),
      setCurrentUserName: (userName) => set({ userName }),
      // Update this method to accept the total unread count from API
      setNotifications: (notifications, totalUnread = null) => {
        set({ notifications });
      },
      setCurrentTheme: (theme) => {
        set({ currentTheme: theme });
      },

      addNotification: (notification) => {
        const existing = get().notifications.find(
          (n) => n._id === notification._id
        );
        if (!existing) {
          const updatedNotifications = [notification, ...get().notifications];
          set({ notifications: updatedNotifications });

          // Increment unread count if this notification is unread for current user
          const isUnreadForCurrentUser = notification.recipients.some(
            (r) => r.user === get().userId && !r.read
          );

          if (isUnreadForCurrentUser) {
            set((state) => ({
              notificationCount: state.notificationCount + 1,
            }));
          }
        }
      },

      markAsRead: (id) => {
        const notifications = get().notifications;
        const notification = notifications.find((n) => n._id === id);

        // Check if notification exists and is currently unread for this user
        const wasUnread = notification?.recipients.some(
          (r) => r.user === get().userId && !r.read
        );

        const updatedNotifications = notifications.map((n) =>
          n._id === id
            ? {
                ...n,
                recipients: n.recipients.map((r) =>
                  r.user === get().userId ? { ...r, read: true } : r
                ),
              }
            : n
        );

        set({ notifications: updatedNotifications });

        // If it was unread before, decrement the count
        if (wasUnread) {
          set((state) => ({
            notificationCount: Math.max(0, state.notificationCount - 1),
          }));
        }
      },

      deleteNotification: (id) => {
        const notifications = get().notifications;
        const notification = notifications.find((n) => n._id === id);

        // Check if notification exists and is currently unread for this user
        const wasUnread = notification?.recipients.some(
          (r) => r.user === get().userId && !r.read
        );

        const updatedNotifications = notifications.filter((n) => n._id !== id);
        set({ notifications: updatedNotifications });

        // If it was unread, decrement the unread count
        if (wasUnread) {
          set((state) => ({
            notificationCount: Math.max(0, state.notificationCount - 1),
          }));
        }
      },

      // Set the total unread count directly from API
      setTotalUnreadCount: (count) => {
        set({ notificationCount: count });
      },
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        userRole: state.userRole,
        notificationCount: state.notificationCount,
        userName: state.userName,

        currentTheme: state.currentTheme,

        // Omitting notifications and lastSync from persistence
      }),
    }
  )
);

export default useNotificationStore;
