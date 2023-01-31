import { atom } from "recoil";

const isEditingAuthorityUserState = atom<boolean>({
  key: "isEditingAuthorityUserState",
  default: false,
});

const showCreateOrEditingAuthorityUserWidgetState = atom({
  key: "showCreateOrEditingAuthorityUserWidgetState",
  default: false,
});

const globalAuthorityUserState = atom({
  key: "globalAuthorityUserState",
  default: undefined,
});

const authority_user_atoms = {
  isEditingAuthorityUserState,
  showCreateOrEditingAuthorityUserWidgetState,
  globalAuthorityUserState,
};

export default authority_user_atoms;
