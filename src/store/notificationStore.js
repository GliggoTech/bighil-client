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
      // Session state
      sessionId: null,
      lastActivity: null,
      isSessionActive: false,
      // Actions
      setCurrentUserId: (userId) => set({ userId }),
      setCurrentUserRole: (userRole) => set({ userRole }),
      setCurrentUserEmail: (userEmail) => set({ userEmail }),
      setCurrentUserName: (userName) => set({ userName }),
      setSessionActive: (active) => set({ isSessionActive: active }),
      updateLastActivity: () => set({ lastActivity: new Date().toISOString() }),
      clearCurrentUser: () => {
        set({
          userId: null,
          userRole: null,
          notifications: [],
          lastActivity: null,
          sessionId: null,
          isSessionActive: false,
          currentTheme: "light",
          userName: null,
          userEmail: null,
          notificationCount: 0,
          lastSync: null,
        });
      },
      isAuthenticated: () => {
        const state = get();
        return !!(state.userId && state.isSessionActive);
      },
      setNotifications: (notifications, totalUnread = null) => {
        const updates = { notifications };
        if (totalUnread !== null) {
          updates.notificationCount = totalUnread;
        }
        set(updates);
      },

      setCurrentTheme: (theme) => {
        set({ currentTheme: theme });
      },

      // Improved addNotification function with better error handling
      addNotification: (notification) => {
        const state = get();

        if (!notification || !notification._id) {
          console.error("Invalid notification:", notification);
          return;
        }

        const existing = state.notifications.find(
          (n) => n._id === notification._id
        );

        if (existing) {
          return; // Don't add duplicate
        }

        // Check if this notification is unread for current user
        const isUnreadForCurrentUser = notification.recipients
          ? notification.recipients.some(
              (r) => r.user === state.userId && !r.read
            )
          : true; // Default to true if no recipients array

        // Update state atomically with proper error handling
        set((prevState) => {
          const updatedNotifications = [
            notification,
            ...prevState.notifications,
          ];
          const newCount = isUnreadForCurrentUser
            ? prevState.notificationCount + 1
            : prevState.notificationCount;

          return {
            notifications: updatedNotifications,
            notificationCount: newCount,
            lastSync: new Date().toISOString(),
          };
        });
      },

      markAsRead: (id) => {
        const state = get();
        const notification = state.notifications.find((n) => n._id === id);

        if (!notification) {
          console.warn("Notification not found:", id);
          return;
        }

        // Check if notification is currently unread for this user
        const wasUnread = notification.recipients?.some(
          (r) => r.user === state.userId && !r.read
        );

        const updatedNotifications = state.notifications.map((n) =>
          n._id === id
            ? {
                ...n,
                recipients:
                  n.recipients?.map((r) =>
                    r.user === state.userId
                      ? { ...r, read: true, readAt: new Date().toISOString() }
                      : r
                  ) || [],
              }
            : n
        );

        // Update state atomically
        set((prevState) => ({
          notifications: updatedNotifications,
          notificationCount: wasUnread
            ? Math.max(0, prevState.notificationCount - 1)
            : prevState.notificationCount,
        }));
      },

      deleteNotification: (id) => {
        const state = get();
        const notification = state.notifications.find((n) => n._id === id);

        if (!notification) {
          return;
        }

        // Check if notification is currently unread for this user
        const wasUnread = notification.recipients?.some(
          (r) => r.user === state.userId && !r.read
        );

        const updatedNotifications = state.notifications.filter(
          (n) => n._id !== id
        );

        // Update state atomically
        set((prevState) => ({
          notifications: updatedNotifications,
          notificationCount: wasUnread
            ? Math.max(0, prevState.notificationCount - 1)
            : prevState.notificationCount,
        }));
      },

      // Set the total unread count directly from API
      setTotalUnreadCount: (count) => {
        const currentCount = get().notificationCount;
        if (currentCount !== count) {
          set({ notificationCount: Math.max(0, count) });
        }
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            recipients:
              notification.recipients?.map((recipient) =>
                recipient.user === state.userId
                  ? {
                      ...recipient,
                      read: true,
                      readAt: new Date().toISOString(),
                    }
                  : recipient
              ) || [],
          })),
          notificationCount: 0,
        }));
      },

      clearAllNotifications: () => {
        set({
          notifications: [],
          notificationCount: 0,
        });
      },

      // Helper function to get current user's unread count from notifications array
      getUnreadCountFromNotifications: () => {
        const state = get();
        return state.notifications.filter(
          (notification) =>
            notification.recipients?.some(
              (r) => r.user === state.userId && !r.read
            ) ?? true
        ).length;
      },

      // Improved sync function with better logging
      syncNotificationCount: () => {
        const state = get();
        const calculatedCount = state.getUnreadCountFromNotifications();
        if (calculatedCount !== state.notificationCount) {
          set({ notificationCount: calculatedCount });
          return true;
        }
        return false;
      },

      // Add a method to force refresh notification count
      forceRefreshCount: async (fetchFunction) => {
        if (fetchFunction) {
          try {
            await fetchFunction();
          } catch (error) {
            console.error("Error forcing notification count refresh:", error);
          }
        }
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
        userEmail: state.userEmail,
        currentTheme: state.currentTheme,
        // Omitting notifications and lastSync from persistence
      }),
    }
  )
);

export default useNotificationStore;
