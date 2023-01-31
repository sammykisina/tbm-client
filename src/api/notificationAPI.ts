import { API } from "./api";

const NotificationAPI = {
  getNotifications: (uuid: string) => API.get(`/members/notifications/${uuid}`),

  getAuthorityReports: (uuid: string) => API.get(`/authority/reports/${uuid}`),
  reportCrime: () => API.get(""),
};

export default NotificationAPI;
