import type { FC } from "react";
import { ModalClose, Title } from "@/components";

interface ModalHeaderProps {
  close: () => void;
  createTitle?: string;
  editTitle?: string;
  isEditing?: boolean;
  titleStyles?: string;
  title?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  close,
  createTitle,
  editTitle,
  isEditing,
  titleStyles,
  title,
}) => {
  return (
    <section className="space-y-2  py-1 px-4">
      <ModalClose close={close} />

      {title ? (
        <Title
          title={title}
          title_styles={titleStyles ? titleStyles : "text-gray-900 uppercase"}
        />
      ) : (
        <Title
          title={isEditing ? editTitle : createTitle}
          title_styles={titleStyles ? titleStyles : "text-gray-900 uppercase"}
        />
      )}

      <div className="bg-yellow/20 h-[0.3rem] w-full rounded-full" />
    </section>
  );
};

export default ModalHeader;
