import { ChatAPI, UserAPI } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import useAuth from "./useAuth";
import { chat_atoms, users_atoms } from "@/atoms";
import { useSetRecoilState } from "recoil";
import useLocalStorage from "./useLocalStorage";
import { AvatarCell, Button } from "@/components";

const useChat = () => {
  /**
   * hook states
   */
  const { data: users, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserAPI.anyAuthenticatedUserGetAll(),
  });
  const { user } = useAuth();
  const current_user_uuid = user?.uuid;
  const queryClient = useQueryClient();

  const { currentConversationState } = chat_atoms;
  const setCurrentConversation = useSetRecoilState(currentConversationState);

  const { showSelectUserForChatModalState } = users_atoms;
  const setShowSelectUserForChatModal = useSetRecoilState(
    showSelectUserForChatModalState
  );

  const messages_columns = useMemo(
    () => [
      {
        Header: "Sender",
        accessor: "sender_name",
        Cell: AvatarCell,
        emailAccessor: "sender_email",
      },
      {
        Header: "Receiver",
        accessor: "receiver_name",
        Cell: AvatarCell,
        emailAccessor: "receiver_email",
      },
      {
        Header: "Message",
        accessor: "body",
      },
      {
        Header: "Time Send",
        accessor: "time_send",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  /**
   * hook functions
   */
  const { data: conversations, isLoading: isFetchingConversations } = useQuery({
    queryKey: ["conversations", current_user_uuid],
    queryFn: async ({ queryKey }) => {
      const [_, current_user_uuid] = queryKey;
      if (current_user_uuid) {
        const data = ChatAPI.getAllConversations({
          current_user_id: current_user_uuid,
        });

        return data;
      }

      return [];
    },
    refetchOnWindowFocus: true,
    // refetchInterval: 6000,
  });

  const {
    mutateAsync: checkIfConversationExistMutateAsync,
    isLoading: isChecking,
  } = useMutation({
    mutationFn: (data: { receiver_id: number; sender_id: number }) => {
      return ChatAPI.checkIfConversationExist(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setShowSelectUserForChatModal(false);
    },
  });

  const {
    mutateAsync: createMessageMutateAsync,
    isLoading: isCreatingMessage,
  } = useMutation({
    mutationFn: (data: {
      receiver_id: number;
      sender_id: number;
      body: string;
      conversation_uuid: string;
    }) =>
      ChatAPI.createMessage({
        body: data.body,
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        conversation_uuid: data.conversation_uuid,
      }),

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setCurrentConversation(data.conversation);
    },
  });

  const { mutateAsync: deleteMessageMutateAsync, isLoading: isDeleting } =
    useMutation({
      mutationFn: (data: { conversation_uuid: string; message_uuid: string }) =>
        ChatAPI.deleteMessage(data.conversation_uuid, data.message_uuid),

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        setCurrentConversation(data.conversation);
      },
    });

  const modifyDeletedMessages = (deletedMessages: any) => {
    let all_deleted_messages = [] as any;

    deletedMessages?.map((deletedMessage: any) => {
      all_deleted_messages = [
        ...all_deleted_messages,
        {
          body: deletedMessage?.attributes?.body,
          time_send: deletedMessage?.attributes?.time_send,
          sender_name: deletedMessage?.relationships?.sender?.attributes?.name,
          sender_email:
            deletedMessage?.relationships?.sender?.attributes?.email,
          receiver_name:
            deletedMessage?.relationships?.receiver?.attributes?.name,
          receiver_email:
            deletedMessage?.relationships?.receiver?.attributes?.email,
          actions: (
            <div className={`flex w-full items-center  gap-2  `}>
              <Button
                title="Delete"
                intent="danger"
                type="small"
                purpose={() => {
                  // setIsEditingNormalUser(true);
                  // setGlobalNormalUser(user);
                  // setShowCreateOrEditNormalUserWidget(true);
                }}
                // disabled={authenticatedUser?.role === "authority" && true}
              />

              <Button
                title="Report"
                intent="secondary"
                type="small"
                purpose={() => {
                  // setIsEditingNormalUser(true);
                  // setGlobalNormalUser(user);
                  // setShowCreateOrEditNormalUserWidget(true);
                }}
                // disabled={authenticatedUser?.role === "authority" && true}
              />

              <Button
                title="Block Sender"
                intent="link"
                type="small"
                purpose={() => {
                  // setIsEditingNormalUser(true);
                  // setGlobalNormalUser(user);
                  // setShowCreateOrEditNormalUserWidget(true);
                }}
                // disabled={authenticatedUser?.role === "authority" && true}
              />
              {/* <DeleteNormalUser
                data={{
                  item: user?.attributes?.uuid,
                }}
                disabled={authenticatedUser?.role === "authority" && true}
              /> */}
            </div>
          ),
        },
      ];
    });

    return all_deleted_messages;
  };

  return {
    users,
    isFetchingUsers,
    isChecking,
    checkIfConversationExistMutateAsync,
    conversations,
    isFetchingConversations,
    createMessageMutateAsync,
    isCreatingMessage,
    deleteMessageMutateAsync,
    isDeleting,
    // deletedMessages,
    // isFetchingDeletedMessages,
    modifyDeletedMessages,
    messages_columns,
  };
};

export default useChat;
