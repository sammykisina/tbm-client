import type { FC, ReactNode } from "react";

type WidgetProps = {
  component: ReactNode;
  widget_state: boolean;
  widget_styles: string;
};

const Widget: FC<WidgetProps> = ({
  component,
  widget_state,
  widget_styles,
}) => {
  return (
    <aside
      className={`${widget_state ? "widget-wrapper show " : "widget-wrapper"} `}
    >
      <div className={`widget ${widget_styles} flex flex-col gap-y-4 py-5`}>
        {component}
      </div>
    </aside>
  );
};

export default Widget;
