import { atom } from "recoil";

const showReportBullyingModalState = atom({
  key: "showReportBullyingModalState",
  default: false,
});

const globalNotificationState = atom<any>({
  key: "globalNotificationState",
  default: null,
});

const reportAtoms = {
  showReportBullyingModalState,
  globalNotificationState,
};

export default reportAtoms;
