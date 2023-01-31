import { ChatAPI } from "@/api";
import { SpinnerLoader, TabTittle, Table } from "@/components";
import { useChat } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MessengerManagement = () => {
  /**
   * component states
   */
  const {
    // deletedMessages,
    // isFetchingDeletedMessages,
    modifyDeletedMessages,
    messages_columns,
  } = useChat();

  const { data: deletedMessages, isLoading: isFetchingDeletedMessages } =
    useQuery({
      queryKey: ["deleted_messages"],
      queryFn: async () => ChatAPI.deletedMessages(),
    });

  return (
    <section className="h-full xs:h-[34.5rem] lg:h-[39rem]">
      {/* title */}
      <div className="flex  justify-between">
        <TabTittle title="Manage Chats." />
        {/* <Button
          title="Create Authority."
          type="medium"
          intent="primary"
          purpose={() => setShowCreateOrEditingAuthorityUserWidget(true)}
        /> */}
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingDeletedMessages ? (
          <div className="flex h-full items-center justify-center">
            <SpinnerLoader color="fill-c_yellow" />
          </div>
        ) : deletedMessages.length > 0 ? (
          <Table
            data={modifyDeletedMessages(deletedMessages)}
            columns={messages_columns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[27.5rem] lg:h-[33rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Messages
          </div>
        )}
      </section>
    </section>
  );
};

export default MessengerManagement;
