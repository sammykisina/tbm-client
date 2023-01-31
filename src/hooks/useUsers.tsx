import { UserAPI } from "@/api";
import {
  AvatarCell,
  Button,
  DeleteNormalUser,
  Icon,
  Notifications,
} from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { normal_user_atoms } from "@/atoms";
import type { NormalUser, SelectionOption } from "src/types/typings.t";
import { useSetRecoilState } from "recoil";
import { useAuth } from "@/hooks";

const useUsers = () => {
  /**
   * hook states
   */
  const {
    show_create_or_edit_normal_user_widget_state,
    is_editing_normal_user_state,
    global_normal_user_state,
  } = normal_user_atoms;
  const setShowCreateOrEditNormalUserWidget = useSetRecoilState(
    show_create_or_edit_normal_user_widget_state
  );
  const setIsEditingNormalUser = useSetRecoilState(
    is_editing_normal_user_state
  );
  const setGlobalNormalUser = useSetRecoilState(global_normal_user_state);

  const queryClient = useQueryClient();
  const normal_user_columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        emailAccessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Location",
        columns: [
          {
            Header: "Latitude",
            accessor: "latitude",
          },
          {
            Header: "Longitude",
            accessor: "longitude",
          },
        ],
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const { user: authenticatedUser } = useAuth();

  /**
   * hook functions
   */

  const { mutateAsync: deleteMutateAsync, isLoading: isDeleting } = useMutation(
    {
      mutationFn: (uuid: string) => {
        return UserAPI.delete(uuid);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        Notifications.successNotification(data.message);
      },
    }
  );

  const {
    mutateAsync: createNormalUserMutateAsync,
    isLoading: isCreatingNormalUser,
  } = useMutation({
    mutationFn: (normal_user_data: NormalUser) =>
      UserAPI.create(normal_user_data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowCreateOrEditNormalUserWidget(false);
      Notifications.successNotification(data.message);
    },

    onError: (error) => {
      console.log("Error when creating a normal user", error);
    },
  });

  const { mutateAsync: blockMutateAsync, isLoading: isBlocking } = useMutation({
    mutationFn: (data: { blockingUser: string; userToBeBlocked: string }) =>
      UserAPI.block(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Notifications.successNotification(data.message);
    },

    onError: (error) => {
      console.log("Error when blocking user", error);
    },
  });

  const {
    mutateAsync: editNormalUserMutateAsync,
    isLoading: isEditingNormalUser,
  } = useMutation({
    mutationFn: (data: { uuid: string; normal_user_data: NormalUser }) =>
      UserAPI.edit(data.uuid, data.normal_user_data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setGlobalNormalUser(undefined);
      setIsEditingNormalUser(false);
      setShowCreateOrEditNormalUserWidget(false);
      Notifications.successNotification(data.message);
    },

    onError: (error) => {
      console.log("Error when editing a normal user", error);
    },
  });

  const modifyUsersData = (users: any) => {
    let all_users = [] as any;

    users?.map((user: any) => {
      console.log("check", user?.relationships?.blocked);

      all_users = [
        ...all_users,
        {
          name: user?.attributes?.name,
          email: user?.attributes?.email,
          role: user?.relationships?.role?.attributes?.slug,
          latitude: user?.relationships?.location?.attributes?.coordinates?.lat,
          longitude:
            user?.relationships?.location?.attributes?.coordinates?.lon,
          actions: (
            <div className={`flex w-full items-center  gap-2  `}>
              <Button
                title="Edit"
                intent="link"
                type="small"
                purpose={() => {
                  setIsEditingNormalUser(true);
                  setGlobalNormalUser(user);
                  setShowCreateOrEditNormalUserWidget(true);
                }}
                disabled={authenticatedUser?.role === "authority" && true}
              />
              <DeleteNormalUser
                data={{
                  item: user?.attributes?.uuid,
                }}
                disabled={authenticatedUser?.role === "authority" && true}
              />

              <Button
                title={`${
                  user?.relationships?.blocked?.includes(authenticatedUser?.id)
                    ? "unblock"
                    : "block"
                }`}
                type="small"
                intent="link"
                disabled={authenticatedUser?.role === "authority" && true}
                purpose={() =>
                  blockMutateAsync({
                    blockingUser: authenticatedUser?.uuid || "",
                    userToBeBlocked: user?.attributes?.uuid,
                  })
                }
              />
            </div>
          ),
        },
      ];
    });

    console.log("all_users", all_users);

    return all_users;
  };

  const { data: userInfo, isLoading: isFetchingUserInfo } = useQuery({
    queryKey: ["user", authenticatedUser?.uuid],
    queryFn: async ({ queryKey }) => {
      const [_, user_uuid] = queryKey;
      if (user_uuid) {
        return await UserAPI.currentUserInfo(user_uuid);
      }

      return "";
    },
  });

  const { data: users, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["users", authenticatedUser?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;
      if (role && role === "admin") {
        return await UserAPI.adminGetAll();
      }

      return [];
    },
  });

  const createAuthorityOptions = (authority_users: any) => {
    const all_authorities_users = new Set();

    authority_users?.map((authority_user: any) => {
      all_authorities_users.add({
        name: authority_user?.attributes?.name,
        value: authority_user?.attributes?.email,
      });
    });

    return [...all_authorities_users.values()] as SelectionOption[];
  };

  return {
    normal_user_columns,
    modifyUsersData,
    deleteMutateAsync,
    isDeleting,
    isCreatingNormalUser,
    createNormalUserMutateAsync,
    isEditingNormalUser,
    editNormalUserMutateAsync,
    userInfo,
    isFetchingUserInfo,
    users,
    isFetchingUsers,
    createAuthorityOptions,
  };
};

export default useUsers;
