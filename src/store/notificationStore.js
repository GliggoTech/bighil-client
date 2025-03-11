import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useNotificationStore = create(
  persist(
    (set) => ({
      userId: null,
      userRole: null,
      notificationCount: 0,

      // Actions
      setCurrentUserId: (userId) => set({ userId }),
      setCurrentUserRole: (userRole) => set({ userRole }),
      increaseNotificationCount: () =>
        set((state) => ({
          notificationCount: state.notificationCount + 1,
        })),
      decreaseNotificationCount: () =>
        set((state) => ({
          notificationCount: Math.max(0, state.notificationCount - 1),
        })),
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        userRole: state.userRole,
        notificationCount: state.notificationCount,
        // Omit notificationCount from persistence
      }),
    }
  )
);

export default useNotificationStore;
