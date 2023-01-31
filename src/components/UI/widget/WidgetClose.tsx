import { type FC } from "react";
import { Icon } from "@/components";
import { HiXMark } from "react-icons/hi2";

interface WidgetCloseProps {
  close: () => void;
}

const WidgetClose: FC<WidgetCloseProps> = ({ close }) => {
  return (
    <Icon
      icon={<HiXMark className={`text-c_dark h-5 w-5`} />}
      purpose={close}
      icon_wrapper_styles="p-1 w-fit h-fit  rounded-full flex justify-center items-center z-50 bg-red-300 hover:bg-red-500"
    />
  );
};

export default WidgetClose;
