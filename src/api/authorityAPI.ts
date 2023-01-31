import type { AuthorityUser } from "src/types/typings.t";
import { API } from "./api";

const AuthorityAPI = {
  create: async (data: AuthorityUser) => API.post("/admin/authority", data),
  edit: async (uuid: string, data: AuthorityUser) =>
    API.patch(`/admin/authority/${uuid}`, data),
  delete: async (uuid: string) => API.delete(`/admin/authority/${uuid}`),
  reportBullying: async (data: {
    senderEmail: string;
    receiverEmail: string;
    authorityEmail: string;
    notificationId: string;
    admin_uuid: string;
    message: string;
  }) =>
    API.post(`/admin/report/${data.admin_uuid}`, {
      senderEmail: data.senderEmail,
      receiverEmail: data.receiverEmail,
      authorityEmail: data.authorityEmail,
      notificationId: data.notificationId,
      message: data.message,
    }),
  sendBullyWarning: async (data: {
    authorityUuid: string;
    bullyUuid: string;
  }) =>
    API.post(
      `/authority/warnings/${data.authorityUuid}/users/${data.bullyUuid}`,
      {}
    ),
};

export default AuthorityAPI;
