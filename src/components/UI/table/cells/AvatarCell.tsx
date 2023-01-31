import React, { type FC } from "react";
import { app_utils } from "@/utils";

type AvatarCellProps = {
  value: string;
  column: any;
  row: any;
};

const AvatarCell: FC<AvatarCellProps> = ({ value, column, row }) => {
  // component functions
  const { generateAvatar } = app_utils;

  // component functions

  return (
    <section className="flex items-center">
      <div className="flex-shrink-0">
        <img
          src={generateAvatar(value, "20332A", "fff", true)}
          alt=""
          className="h-10 w-10  rounded-full"
        />
      </div>

      <div className="ml-1">
        <div className="text-xs font-semibold capitalize text-gray-900">
          {value}
        </div>

        <div className="whitespace-nowrap text-sm text-gray-900/30">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </section>
  );
};

export default AvatarCell;
