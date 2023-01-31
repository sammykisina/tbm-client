import { useAuth, useChat } from "@/hooks";
import React, { type FC } from "react";
import { Icon, SpinnerLoader } from "@/components";
import { HiTrash } from "react-icons/hi2";
import { chat_atoms } from "@/atoms";
import { useRecoilValue } from "recoil";

type MessageProps = {
  message: any;
};

const Message: FC<MessageProps> = ({ message }) => {
  /**
   * component states
   */
  const { user } = useAuth();
  const { deleteMessageMutateAsync, isDeleting } = useChat();

  const { currentConversationState } = chat_atoms;
  const currentConversation: any = useRecoilValue(currentConversationState);

  return (
    <div>
      {message?.relationships?.sender?.attributes?.uuid === user?.uuid ? (
        <div className={`sender_message_container group`}>
          <div className="sender_message_body">
            <p className="text-c_white/80">{message?.attributes?.body}</p>

            <div className="flex items-center justify-end gap-2 duration-300">
              {/* time send */}
              <span className="text-gray-400">
                {message.attributes?.created_at}
              </span>

              {/* the read or unread icon indicator */}
              <Icon
                icon={
                  isDeleting ? (
                    <SpinnerLoader color="fill-c_white" size="h-4 w-4" />
                  ) : (
                    <HiTrash className="hidden h-4 w-4 text-c_red group-hover:block " />
                  )
                }
                purpose={() =>
                  deleteMessageMutateAsync({
                    conversation_uuid: currentConversation?.attributes?.uuid,
                    message_uuid: message?.attributes?.uuid,
                  })
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="receiver_message_container">
          <div className="receiver_message_body">
            <p className="text-c_white/80">{message?.attributes?.body}</p>

            <div className="flex items-center justify-end gap-2">
              {/* time send */}
              <span className="text-gray-400">
                {message.attributes?.created_at}
              </span>

              {/* the read or unread icon indicator */}
              {/* <Icon icon={<HiCheck className="h-5 w-5 " />} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
