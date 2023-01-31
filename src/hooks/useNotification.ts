import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import { NotificationAPI } from "@/api";

const useNotification = () => {
  /**
   * notification states
   */
  const { user } = useAuth();

  const { data: notifications, isLoading: isFetchingNotifications } = useQuery({
    queryKey: ["notifications", user?.uuid, user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, user_uuid, role] = queryKey;

      if (user_uuid && role) {
        if (role === "admin") {
          return await NotificationAPI.getAdminNotifications(user_uuid);
        }

        if (role === "user") {
          return await NotificationAPI.getUserNotifications(user_uuid);
        }

        if (role === "authority") {
          return await NotificationAPI.getAuthorityReports(user_uuid);
        }
      }

      return [];
    },
  });

  return { notifications, isFetchingNotifications };
};

export default useNotification;
