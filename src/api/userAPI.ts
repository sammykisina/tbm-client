import type { NormalUser } from "src/types/typings.t";
import { API } from "./api";

const UserAPI = {
  // Todo: clean this up <the fetch user issue in both api and client>
  adminGetAll: async () =>
    await API.get("/admin/users?include=role,location,blocks,blocked"),
  authorityGetAll: async () =>
    await API.get("/authority/users?include=role,location"),
  anyAuthenticatedUserGetAll: async () =>
    await API.get("/members/users?include=role"),
  create: async (data: NormalUser) => API.post("/admin/users", data),
  edit: async (uuid: string, data: NormalUser) =>
    API.patch(`/admin/users/${uuid}`, data),
  delete: async (uuid: string) => API.delete(`/admin/users/${uuid}`),
  block: async (data: { blockingUser: string; userToBeBlocked: string }) =>
    API.get(`/members/${data.blockingUser}/block/${data.userToBeBlocked}`),
  currentUserInfo: async (uuid: string) => API.get(`/members/${uuid}/info`),
};

export default UserAPI;
