import { AuthorityAPI } from "@/api";
import { authority_user_atoms, reportAtoms } from "@/atoms";
import {
  AvatarCell,
  Button,
  DeleteAuthority,
  Notifications,
} from "@/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSetRecoilState } from "recoil";
import type { AuthorityUser } from "src/types/typings.t";

const useAuthority = () => {
  /**
   * hook states
   */
  const queryClient = useQueryClient();
  const authority_user_columns = useMemo(
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
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const {
    showCreateOrEditingAuthorityUserWidgetState,
    globalAuthorityUserState,
    isEditingAuthorityUserState,
  } = authority_user_atoms;
  const setShowCreateOrEditingAuthorityUserWidget = useSetRecoilState(
    showCreateOrEditingAuthorityUserWidgetState
  );
  const setGlobalAuthorityUser = useSetRecoilState(globalAuthorityUserState);
  const setIsEditingAuthorityUser = useSetRecoilState(
    isEditingAuthorityUserState
  );
  const { globalNotificationState, showReportBullyingModalState } = reportAtoms;
  const setGlobalNotification = useSetRecoilState(globalNotificationState);
  const setShowReportBullyingModal = useSetRecoilState(
    showReportBullyingModalState
  );

  /**
   * hook functions
   */

  const { mutateAsync: deleteMutateAsync, isLoading: isDeleting } = useMutation(
    {
      mutationFn: (uuid: string) => {
        return AuthorityAPI.delete(uuid);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["authorities"] });
        Notifications.successNotification(data.message);
      },
    }
  );

  const {
    mutateAsync: createAuthorityUserMutateAsync,
    isLoading: isCreatingAuthorityUser,
  } = useMutation({
    mutationFn: (authority_user_data: AuthorityUser) =>
      AuthorityAPI.create(authority_user_data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authorities"] });
      setShowCreateOrEditingAuthorityUserWidget(false);
      Notifications.successNotification(data.message);
    },

    onError: (error) => {
      console.log("Error when creating authority user", error);
    },
  });

  const {
    mutateAsync: editAuthorityUserMutateAsync,
    isLoading: isEditingAuthorityUser,
  } = useMutation({
    mutationFn: (data: { uuid: string; authority_user_data: AuthorityUser }) =>
      AuthorityAPI.edit(data.uuid, data.authority_user_data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authorities"] });
      setGlobalAuthorityUser(undefined);
      setIsEditingAuthorityUser(false);
      setShowCreateOrEditingAuthorityUserWidget(false);
      Notifications.successNotification(data.message);
    },

    onError: (error) => {
      console.log("Error when editing a normal user", error);
    },
  });

  const {
    mutateAsync: reportBullyingMutateAsync,
    isLoading: isReportingBullying,
  } = useMutation({
    mutationFn: (data: {
      senderEmail: string;
      receiverEmail: string;
      authorityEmail: string;
      notificationId: string;
      admin_uuid: string;
      message: string;
    }) =>
      AuthorityAPI.reportBullying({
        admin_uuid: data.admin_uuid,
        senderEmail: data.senderEmail,
        receiverEmail: data.receiverEmail,
        authorityEmail: data.authorityEmail,
        notificationId: data.notificationId,
        message: data.message,
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setGlobalNotification(null);
      setShowReportBullyingModal(false);
      Notifications.successNotification(data?.message);
    },

    onError: (error) => {
      console.log("Error when reporting a bully", error);
    },
  });

  const modifyUsersData = (authorities: any) => {
    let all_authorities = [] as any;

    authorities?.map((authority: any) => {
      all_authorities = [
        ...all_authorities,
        {
          name: authority?.attributes?.name,
          email: authority?.attributes?.email,
          role: authority?.relationships?.role?.attributes?.slug,
          actions: (
            <div className={`flex w-full items-center  gap-2 `}>
              <Button
                title="Edit"
                intent="link"
                type="small"
                purpose={() => {
                  setIsEditingAuthorityUser(true);
                  setGlobalAuthorityUser(authority);
                  setShowCreateOrEditingAuthorityUserWidget(true);
                }}
              />
              <DeleteAuthority
                data={{
                  item: authority?.attributes?.uuid,
                }}
              />
            </div>
          ),
        },
      ];
    });

    return all_authorities;
  };

  const {
    mutateAsync: sendBullyWarningMutateAsync,
    isLoading: isSendingBullyWarning,
  } = useMutation({
    mutationFn: (data: { authorityUuid: string; bullyUuid: string }) => {
      return AuthorityAPI.sendBullyWarning(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      Notifications.successNotification(data.message);
    },
  });

  return {
    modifyUsersData,
    authority_user_columns,
    deleteMutateAsync,
    isDeleting,
    createAuthorityUserMutateAsync,
    isCreatingAuthorityUser,
    editAuthorityUserMutateAsync,
    isEditingAuthorityUser,
    reportBullyingMutateAsync,
    isReportingBullying,
    sendBullyWarningMutateAsync,
    isSendingBullyWarning,
  };
};

export default useAuthority;
