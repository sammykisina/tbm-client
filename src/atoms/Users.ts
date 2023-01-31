import { atom } from "recoil";

const showSelectUserForChatModalState = atom<boolean>({
  key: "showSelectUserForChatModalState",
  default: false,
});

const users_atoms = {
  showSelectUserForChatModalState,
};

export default users_atoms;
