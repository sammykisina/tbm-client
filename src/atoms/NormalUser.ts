import { atom } from "recoil";

const is_editing_normal_user_state = atom<boolean>({
  key: "is_editing_normal_user_state",
  default: false,
});

const show_create_or_edit_normal_user_widget_state = atom({
  key: "show_create_or_edit_normal_user_widget_state",
  default: false,
});

const global_normal_user_state = atom({
  key: "global_normal_user_state",
  default: undefined,
});

const normal_user_atoms = {
  is_editing_normal_user_state,
  global_normal_user_state,
  show_create_or_edit_normal_user_widget_state,
};

export default normal_user_atoms;
