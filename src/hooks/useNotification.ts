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
        if (role === "admin" || role === "user") {
          return await NotificationAPI.getNotifications(user_uuid);
        }

        return await NotificationAPI.getAuthorityReports(user_uuid);
      }

      return [];
    },
  });

  return { notifications, isFetchingNotifications };
};

export default useNotification;
