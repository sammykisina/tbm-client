import { message_schema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, SpinnerLoader } from "@/components";
import type { z } from "zod";
import { HiPaperAirplane } from "react-icons/hi2";
import { useAuth, useChat, useUsers } from "@/hooks";
import { chat_atoms } from "@/atoms";
import { useRecoilValue } from "recoil";

type SendMessageProps = {
  conversation: any;
};

const SendMessage: FC<SendMessageProps> = ({ conversation }) => {
  /**
   * component states
   */
  type MessageSchema = z.infer<typeof message_schema>;
  const { register, handleSubmit, reset } = useForm<MessageSchema>({
    resolver: zodResolver(message_schema),
  });
  const { user } = useAuth();
  const { createMessageMutateAsync, isCreatingMessage } = useChat();
  const { userInfo, isFetchingUserInfo } = useUsers();

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<MessageSchema> = async ({ message }) => {
    await createMessageMutateAsync({
      body: message,
      conversation_uuid: conversation?.attributes?.uuid,
      receiver_id:
        conversation?.relationships?.receiver?.attributes?.uuid === user?.uuid
          ? conversation?.relationships?.sender?.id
          : conversation?.relationships?.receiver?.id,
      sender_id: user?.id || 0,
    });

    reset({
      message: "",
    });
  };

  return (
    <form
      className={`flex items-center justify-between gap-2 border-t py-2 px-1 lg:px-2 ${
        !conversation && "hidden"
      } ${userInfo?.relationships?.blocked.includes(1) && "hidden"} `}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="h-10 flex-1 rounded-full bg-c_gary/20 pl-2 pr-1">
        <input
          className=" h-full w-full bg-transparent outline-none"
          type="text"
          {...register("message")}
          placeholder="Message"
        />
      </div>

      <Button
        icon={
          isCreatingMessage ? (
            <SpinnerLoader color="fill-white" size="h-4 w-4" />
          ) : (
            <HiPaperAirplane className="icon" />
          )
        }
        intent="primary"
      />
    </form>
  );
};

export default SendMessage;
