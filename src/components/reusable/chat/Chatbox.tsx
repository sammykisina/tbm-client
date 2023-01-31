import React, { useEffect, useRef, useState } from "react";
import { Icon, Message, SendMessage } from "@/components";
import { HiArrowLongLeft, HiCheck } from "react-icons/hi2";
import { app_utils } from "@/utils";
import { useAuth } from "@/hooks";
import { chat_atoms } from "@/atoms";
import { useRecoilValue } from "recoil";

const Chatbox = () => {
  /**
   * component states
   */
  const { generateAvatar } = app_utils;
  const { user } = useAuth();

  const { currentConversationState } = chat_atoms;
  const currentConversation = useRecoilValue(currentConversationState);
  const [conversation, setConversation] = useState<any>();

  /**
   * component functions
   */
  useEffect(() => {
    if (currentConversation !== undefined) {
      setConversation(currentConversation);
    }
  }, [currentConversation]);

  return (
    <section
      className={`hidden flex-1 flex-col md:flex ${conversation && "divide-y"}`}
    >
      {/* the header */}
      {conversation && (
        <div className={`flex h-[3rem] items-center justify-between  px-2`}>
          <Icon icon={<HiArrowLongLeft />} />
          <div className="flex flex-shrink-0 items-center gap-2">
            <img
              src={generateAvatar(
                conversation?.relationships?.receiver?.attributes?.uuid ===
                  user?.uuid
                  ? conversation?.relationships?.sender?.attributes?.name
                  : conversation?.relationships?.receiver?.attributes?.name,
                "20332A",
                "fff",
                true
              )}
              alt=""
              className="h-10 w-10  rounded-full"
            />
            <span>
              {conversation?.relationships?.receiver?.attributes?.uuid ===
              user?.uuid
                ? conversation?.relationships?.sender?.attributes?.name
                : conversation?.relationships?.receiver?.attributes?.name}
            </span>
          </div>
        </div>
      )}

      {/* the chat and the send box */}

      {conversation === null ? (
        <div className="flex h-[32rem] items-center justify-center">
          No Conversation Selected
        </div>
      ) : (
        <div className={`flex flex-1 flex-col`}>
          {/* the chat  */}
          <div className="flex flex-col gap-3 overflow-y-scroll px-2 py-2 scrollbar-hide sm:h-[32rem]">
            {/* TODO: Move to a separate component when looping*/}
            {conversation?.relationships?.messages.length > 0 ? (
              conversation?.relationships?.messages?.map(
                (message: any, messageIndex: number) => (
                  <Message key={messageIndex} message={message} />
                )
              )
            ) : (
              <div className="flex h-full items-center justify-center">
                No messages yet
              </div>
            )}
          </div>

          {/* the input */}
          <SendMessage conversation={conversation} />
        </div>
      )}
    </section>
  );
};

export default Chatbox;
