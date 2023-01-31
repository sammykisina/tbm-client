import { Button, Icon } from "@/components";
import type { TabsData } from "src/types/typings.t";
import type { FC } from "react";

interface TabProps {
  tabs_data: TabsData[];
  tabs_body_styles: string;
  icons_only_tabs?: boolean;
  icons_only_tabs_styles?: string;
  labels_only_tabs_styles?: string;
  tabs_content_height: string;
  index: number;
  setIndex: (index: number) => void;
}

const Tab: FC<TabProps> = ({
  tabs_data,
  tabs_body_styles,
  icons_only_tabs,
  icons_only_tabs_styles,
  labels_only_tabs_styles,
  tabs_content_height,
  index,
  setIndex,
}) => {
  /**
   * Component states
   */
  const { content } = tabs_data[index];

  return (
    <section>
      <section className={`${tabs_body_styles}`}>
        {/* Tab Btns */}
        <section
          className={`duration-300 ${
            icons_only_tabs ? icons_only_tabs_styles : labels_only_tabs_styles
          }`}
        >
          {tabs_data.map(
            (single_tabs_data: TabsData, single_tabs_data_index: number) =>
              icons_only_tabs ? (
                <Icon
                  key={single_tabs_data_index}
                  icon={single_tabs_data.icon}
                  icon_wrapper_styles={`flex items-center gap-x-2 px-6 py-3  rounded-xl  uppercase text-sm w-fit border ${
                    single_tabs_data_index === index
                      ? "text-c_yellow border-c_yellow"
                      : "text-c_white"
                  } `}
                  purpose={() => setIndex(single_tabs_data_index)}
                />
              ) : (
                <div className={`duration-300 `} key={single_tabs_data_index}>
                  <button
                    className={`duration-300 ${
                      single_tabs_data_index === index
                        ? "text-c_dark font-semibold tracking-wider"
                        : "text-c_dark"
                    }`}
                    onClick={() => setIndex(single_tabs_data_index)}
                  >
                    {single_tabs_data?.label}
                  </button>

                  <div
                    className={`h-[5px] w-[30px] rounded-full  duration-300 ${
                      single_tabs_data_index === index
                        ? "bg-c_green"
                        : "bg-c_green/60 h-[5px] w-[5px]"
                    }`}
                  />
                </div>
              )
          )}
        </section>

        {/* Tab Info */}
        <section
          className={`col-span-5 overflow-y-scroll duration-300 ${tabs_content_height}  scrollbar-hide  ${
            icons_only_tabs && "lg:-ml-4 xl:-ml-10"
          }`}
        >
          {content}
        </section>
      </section>
    </section>
  );
};

export default Tab;
