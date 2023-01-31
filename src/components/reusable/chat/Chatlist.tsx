import { chat_atoms } from "@/atoms";
import { SpinnerLoader, TabTittle } from "@/components";
import { useAuth } from "@/hooks";
import { app_utils } from "@/utils";
import React, { type FC } from "react";
import { useSetRecoilState } from "recoil";

type ChatlistProps = {
  conversations: any;
  isFetchingConversations: boolean;
};

const Chatlist: FC<ChatlistProps> = ({
  conversations,
  isFetchingConversations,
}) => {
  /**
   * component states
   */
  const { generateAvatar } = app_utils;
  const { currentConversationState } = chat_atoms;
  const setCurrentConversation = useSetRecoilState(currentConversationState);
  const { user } = useAuth();

  return (
    <section
      className={`h-[39rem] flex-col divide-y md:w-[12rem] lg:w-[15rem]`}
    >
      {/* the header */}
      <div className="flex h-[3rem] items-center justify-between  px-2">
        <TabTittle title="Chat" />
      </div>

      {/* the body */}
      <div className="flex-1 py-2 pr-2">
        {/* the lists */}
        {/* TODO: move to component when looping */}
        {isFetchingConversations ? (
          <div className="flex h-[30rem] justify-center">
            <SpinnerLoader color="fill-c_yellow" />
          </div>
        ) : conversations !== undefined && conversations?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {conversations?.map(
              (conversation: any, conversation_index: number) => {
                let last_message_index;
                let last_message = "";
                if (conversation?.relationships?.messages.length > 0) {
                  last_message_index =
                    conversation?.relationships?.messages.length - 1;

                  last_message =
                    conversation?.relationships?.messages[last_message_index]
                      ?.attributes?.body;
                }

                return (
                  <div
                    onClick={() => {
                      setCurrentConversation(conversation);
                    }}
                    key={conversation_index}
                    className="flex cursor-pointer items-center gap-1 rounded-full bg-c_gary/10 px-2 py-1 hover:bg-c_gary/30"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={generateAvatar(
                          conversation?.relationships?.receiver?.attributes
                            ?.uuid === user?.uuid
                            ? conversation?.relationships?.sender?.attributes
                                ?.name
                            : conversation?.relationships?.receiver?.attributes
                                ?.name,
                          "20332A",
                          "fff",
                          true
                        )}
                        alt=""
                        className="h-10 w-10  rounded-full"
                      />
                    </div>

                    <div className="w-full pr-2">
                      {/* the name and time if last message */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {conversation?.relationships?.receiver?.attributes
                            ?.uuid === user?.uuid
                            ? conversation?.relationships?.sender?.attributes
                                ?.name
                            : conversation?.relationships?.receiver?.attributes
                                ?.name}
                        </span>
                        <span>
                          {last_message_index !== undefined
                            ? conversation?.relationships?.messages[
                                last_message_index
                              ]?.attributes?.created_at
                            : ""}
                        </span>
                      </div>

                      {/* current message and unread messages number */}

                      {/* Todo: Find a better way to do this */}
                      {last_message.length > 0 ? (
                        <div className="flex justify-between">
                          {last_message.length >
                          last_message.substring(0, 10).length ? (
                            <>
                              <p className="currentMessage whitespace-nowrap  sm:hidden">
                                {last_message.substring(0, 45)}
                                ...
                              </p>

                              <p className="currentMessage hidden whitespace-nowrap sm:block md:hidden">
                                {last_message.substring(0, 30)}
                              </p>

                              <p className="currentMessage hidden whitespace-nowrap md:block lg:hidden">
                                {last_message.substring(0, 12)}
                                ...
                              </p>

                              <p className="currentMessage hidden whitespace-nowrap lg:block">
                                {last_message.substring(0, 20)}
                                ...
                              </p>
                            </>
                          ) : (
                            <p className="currentMessage whitespace-nowrap">
                              {last_message}
                            </p>
                          )}

                          {/* TODO: add number of unread messages */}
                          <span className="text-c_red "></span>
                        </div>
                      ) : (
                        <div className="currentMessage whitespace-nowrap">
                          No messages yet.
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="flex h-[30rem] items-center justify-center">
            You have no conversations
          </div>
        )}
      </div>
    </section>
  );
};

export default Chatlist;
