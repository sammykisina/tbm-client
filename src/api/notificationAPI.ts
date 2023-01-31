import { API } from "./api";

const NotificationAPI = {
  getAdminNotifications: (uuid: string) =>
    API.get(`/admin/notifications/${uuid}`),
  getAuthorityReports: (uuid: string) => API.get(`/authority/reports/${uuid}`),
  getUserNotifications: (uuid: string) =>
    API.get(`/members/notifications/${uuid}`),
  reportCrime: () => API.get(""),
};

export default NotificationAPI;
