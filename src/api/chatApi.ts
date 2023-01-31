import { API } from "./api";

const ChatAPI = {
  checkIfConversationExist: async (data: {
    receiver_id: number;
    sender_id: number;
  }) => await API.post("/members/conversations/exists", data),

  getAllConversations: async (data: { current_user_id: string }) =>
    await API.get(`/members/conversations/${data.current_user_id}`),

  createMessage: async (data: {
    receiver_id: number;
    sender_id: number;
    body: string;
    conversation_uuid: string;
  }) =>
    await API.post(`/members/conversations/${data.conversation_uuid}`, data),

  deleteMessage: async (conversation_uuid: string, message_uuid: string) =>
    await API.delete(
      `/members/conversations/${conversation_uuid}/messages/${message_uuid}`
    ),

  deletedMessages: async () => await API.get("/admin/messages"),
};

export default ChatAPI;
