import type { NormalUser, Login, Code } from "src/types/typings.t";
import { API } from "./api";

const AuthAPI = {
  login: async (data: Login) => API.post("/auth/login", data),
  register: async (data: NormalUser) => API.post("auth/register", data),
  verify: async (data: Code) =>
    API.post(`/auth/verify/${data.uuid}`, { code: data.code }),
};

export default AuthAPI;
