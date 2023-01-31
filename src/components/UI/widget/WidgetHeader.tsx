import { type FC } from "react";
import { Title } from "@/components";
import WidgetClose from "./WidgetClose";

interface WidgetHeader {
  close: () => void;
  title: string;
}

const InfoWidgetHeader: FC<WidgetHeader> = ({ close, title }) => {
  return (
    <section className="border-c_gray  space-y-2 border-b  px-4">
      <WidgetClose close={close} />

      <div className="flex items-center gap-2 px-3">
        <div className="h-5 w-5 rounded-full bg-c_yellow" />
        <Title title={title} title_styles="text-gray-900 tracking-wider" />
      </div>

      <div className="bg-yellow/20 h-[0.3rem] w-full rounded-full" />
    </section>
  );
};

export default InfoWidgetHeader;
