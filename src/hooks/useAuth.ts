import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/api";
import type { Code, Login, NormalUser } from "src/types/typings.t";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Notifications } from "@/components";

export type User = {
  uuid: string;
  name: string;
  email: string;
  role: string;
  id: number;
};

const useAuth = () => {
  // hook states
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  // hook functions
  const { mutateAsync: loginMutateAsync, isLoading: isLogging } = useMutation({
    mutationFn: (login_data: Login) => {
      return AuthAPI.login(login_data);
    },

    onSuccess: async (data: any) => {
      Cookies.set("user-uuid", data?.user?.uuid);
      await redirectToVerify();
      Notifications.successNotification(data?.message);
    },
  });

  const { mutateAsync: registerMutateAsync, isLoading: isRegistering } =
    useMutation({
      mutationFn: (signup_data: NormalUser) => {
        return AuthAPI.register(signup_data);
      },

      onSuccess: async (data) => {
        Cookies.set("user-uuid", data.user.uuid);
        Notifications.successNotification(data.message);
        await redirectToVerify();
      },
    });

  const afterLoginOrRegisterSuccessfully = async (data: any) => {
    Cookies.set("user", JSON.stringify(data.user));
    Cookies.set("token", data.token);
    Cookies.remove("user-uuid");
    setUser(data.user);
    setToken(data.token);
    await redirectHome();

    Notifications.successNotification(data.message);
  };

  const { mutateAsync: verifyMutateAsync, isLoading: isVerifying } =
    useMutation({
      mutationFn: (code: Code) => {
        return AuthAPI.verify(code);
      },

      onSuccess: async (data) => {
        await afterLoginOrRegisterSuccessfully(data);
      },

      onError: (error: any) => {
        console.log("error", error.response);
        if (error.response.status === 406) Cookies.remove("user-uuid");
      },
    });

  const logout = async () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setToken(undefined);
    setUser(undefined);

    // await router.replace("/");
    // router.refresh();
    await redirectHome();
  };

  const redirectToVerify = async () =>
    await router.push("/auth/verify-two-factor-code");

  const redirectHome = async () => {
    router.refresh();
    await router.replace("/");
  };

  useEffect(() => {
    const user = Cookies.get("user") && JSON?.parse(Cookies.get("user") || "");
    const token = Cookies.get("token");
    if (token !== undefined) {
      setToken(token);
    }

    if (user !== undefined) {
      setUser(user);
    }
  }, []);

  return {
    user,
    token,
    loginMutateAsync,
    isLogging,
    logout,
    registerMutateAsync,
    isRegistering,
    verifyMutateAsync,
    isVerifying,
  };
};

export default useAuth;
