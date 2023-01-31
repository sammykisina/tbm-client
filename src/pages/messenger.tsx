import { users_atoms } from "@/atoms";
import { Chatbox, Chatlist, Modal, Users } from "@/components";
import { useChat } from "@/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Messenger = () => {
  /**
   * page states
   */
  const { showSelectUserForChatModalState } = users_atoms;
  const showSelectUserForChatModal = useRecoilValue(
    showSelectUserForChatModalState
  );

  const { conversations, isFetchingConversations } = useChat();
  const router = useRouter();

  /**
   * page functions
   */

  useEffect(() => {
    if (Cookies.get("token") === "" || Cookies.get("token") === undefined) {
      router.push("/");
    }
  }, []);

  return (
    <section className="divide-x rounded-[2rem] border px-2 md:flex">
      {/* left side, the chat list  */}
      <Chatlist
        conversations={conversations}
        isFetchingConversations={isFetchingConversations}
      />

      {/* right side, the chat box */}
      <Chatbox />

      <Modal
        modal_state={showSelectUserForChatModal}
        modal_styles="w-[80vw] sm:w-[70vw] md:w-[60vw] xmd:w-[50vw]  lg:w-[40vw] xl:w-[30vw] h-[30rem] duration-300"
        component={<Users />}
      />
    </section>
  );
};

export default Messenger;
