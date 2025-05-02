"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useNotificationStore = create(
  persist(
    (set, get) => ({
      userId: null,
      userRole: null,
      notificationCount: 0,
      notifications: [],
      lastSync: null,

      // Actions
      setCurrentUserId: (userId) => set({ userId }),
      setCurrentUserRole: (userRole) => set({ userRole }),

      setNotifications: (notifications) => {
        set({ notifications });
        // Recalculate unread count after setting
        get().recalculateUnreadCount();
      },

      addNotification: (notification) => {
        const existing = get().notifications.find(
          (n) => n._id === notification._id
        );
        if (!existing) {
          const updatedNotifications = [notification, ...get().notifications];
          set({ notifications: updatedNotifications });
          get().recalculateUnreadCount();
        }
      },

      markAsRead: (id) => {
        const updatedNotifications = get().notifications.map((n) =>
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
        get().recalculateUnreadCount();
      },

      deleteNotification: (id) => {
        const updatedNotifications = get().notifications.filter(
          (n) => n._id !== id
        );
        set({ notifications: updatedNotifications });
        get().recalculateUnreadCount();
      },

      recalculateUnreadCount: () => {
        const userId = get().userId;
        const unread = get().notifications.filter((n) =>
          n.recipients.some((r) => r.user === userId && !r.read)
        ).length;
        set({ notificationCount: unread });
      },
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        userRole: state.userRole,
        notificationCount: state.notificationCount,
        // Omitting notifications and lastSync from persistence
      }),
    }
  )
);

export default useNotificationStore;
