import React, { type FC } from "react";
import { Title } from "@/components";

type InfoProps = {
  info: any;
  title: string;
};

const Info: FC<InfoProps> = ({ info, title }) => {
  return (
    <div className="w-[15rem] rounded-md border border-c_red/10 px-2 py-1">
      <Title title={title} title_styles="text-sm" />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-500">{info.name}</span>
          <span className="text-c_white">{info.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Info;
