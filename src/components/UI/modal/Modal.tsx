import type { FC, ReactNode } from "react";

interface ModalProps {
  modal_state: boolean;
  modal_styles: string;
  component: ReactNode;
}

const Modal: FC<ModalProps> = ({ modal_state, modal_styles, component }) => {
  return (
    <section
      className={`${modal_state ? "modal-wrapper show " : "modal-wrapper"} `}
    >
      <div className={`modal ${modal_styles} flex flex-col gap-y-4 py-5`}>
        {component}
      </div>
    </section>
  );
};

export default Modal;
