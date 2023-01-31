import { HiXMark } from "react-icons/hi2";
import { Icon } from "@/components";
import type { FC } from "react";

interface ModalCloseProps {
  close: () => void;
}

const ModalClose: FC<ModalCloseProps> = ({ close }) => {
  return (
    <Icon
      icon={<HiXMark className={`h-5 w-5 text-white`} />}
      purpose={close}
      icon_wrapper_styles="p-1 w-fit h-fit  rounded-full flex justify-center items-center z-50 bg-red-300 hover:bg-red-500"
    />
  );
};

export default ModalClose;
