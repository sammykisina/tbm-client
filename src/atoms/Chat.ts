import { atom } from "recoil";

const showChatBoxState = atom<boolean>({
  key: "showMessageBoxState",
  default: false,
});

const currentConversationState = atom({
  key: "currentConversationState",
  default: null,
});

const showChatlistState = atom({
  key: "showChatlistState",
  default: true,
});


const chat_atoms = {
  showChatBoxState,
  currentConversationState,
  showChatlistState,
};

export default chat_atoms;
