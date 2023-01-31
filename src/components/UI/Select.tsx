import { useClickOutside } from "@/hooks";
import { type FC, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import type { SelectionOption } from "src/types/typings.t";
import { Icon } from "@/components";

interface SelectProps {
  selected: any;
  setSelected: any;
  title?: string;
  select_wrapper_styles: string;
  select_label?: string;
  select_label_styles?: string;
  options: SelectionOption[] | string[];
  multiple: boolean;
  select_panel_styles: string;
}

const Select: FC<SelectProps> = ({
  selected,
  title,
  setSelected,
  options,
  multiple,
  select_wrapper_styles,
  select_panel_styles,
  select_label,
  select_label_styles,
}) => {
  /**
   * Component states
   */
  const [isSelectPanelOpen, setIsSelectPanelOpen] = useState(false);
  const select_ref = useRef<HTMLSelectElement>(null);

  /**
   * Component functions
   */
  const selectOption = (option: SelectionOption | string) => {
    if (multiple) {
      checkIfOptionIsInSelectedArray(option)
        ? setSelected(
            selected.filter((selected_option: SelectionOption | string) =>
              typeof option === "object" && typeof selected_option === "object"
                ? selected_option?.name.toLowerCase() !==
                  option.name.toLowerCase()
                : (selected_option as string).toLowerCase() !==
                  (option as string).toLowerCase()
            )
          )
        : setSelected([...selected, option]);
    } else {
      // If The Selected Is Not Equal To The Currently Clicked Option
      if (option !== selected) setSelected(option);
    }
  };

  const getActiveOptionClass = (option: SelectionOption | string) => {
    let active_option_styles = "";

    if (Array.isArray(selected)) {
      checkIfOptionIsInSelectedArray(option)
        ? (active_option_styles = "bg-c_yellow/20")
        : "";
    } else {
      typeof option === "object"
        ? option?.name.toLowerCase() === selected.name.toLowerCase()
          ? (active_option_styles = "bg-c_yellow/20 ")
          : ""
        : option.toLowerCase() === selected.toLowerCase()
        ? (active_option_styles = "bg-c_yellow/20   ")
        : "";
    }

    return active_option_styles;
  };

  const checkIfOptionIsInSelectedArray = (option: SelectionOption | string) => {
    let value: SelectionOption | string | null = null;

    selected.find((selected_option: SelectionOption | string) => {
      if (typeof option === "object" && typeof selected_option === "object") {
        selected_option.name.toLowerCase() === option.name.toLowerCase()
          ? (value = selected_option)
          : "";
      } else {
        (selected_option as string).toLowerCase() ===
        (option as string).toLowerCase()
          ? (value = selected_option)
          : "";
      }
    });

    return value;
  };

  useClickOutside(select_ref, () => setIsSelectPanelOpen(false));

  return (
    <section
      ref={select_ref}
      tabIndex={0}
      className={`relative cursor-pointer gap-[0.5rem]  px-2 outline-none  ${select_wrapper_styles}`}
      onClick={() =>
        setIsSelectPanelOpen(
          (prevIsSelectPanelOpenState) => !prevIsSelectPanelOpenState
        )
      }
    >
      <div className={`flex items-center justify-between gap-1`}>
        <div className="text-dark/90 flex flex-1 gap-1 overflow-x-auto whitespace-nowrap text-sm font-semibold capitalize scrollbar-hide">
          {selected.length === 0 || !selected
            ? title
            : multiple && Array.isArray(selected)
            ? selected.map((selected_option, selected_option_index) => (
                <div
                  key={selected_option_index}
                  onClick={(event) => {
                    event.stopPropagation();
                    selectOption(selected_option);
                  }}
                  className="bg-yellow/20 flex items-center rounded-full px-2 tracking-wider"
                >
                  <Icon icon={<HiX />} />
                  <span>
                    {typeof selected_option === "object" ? "" : selected_option}
                  </span>
                </div>
              ))
            : typeof selected === "object"
            ? (selected as SelectionOption).name
            : selected}
        </div>

        <span
          className={`hover:bg-dark hover:bg-c_dark ml-4 flex items-center justify-center rounded-full p-1 duration-300 hover:text-white ${
            isSelectPanelOpen && "bg-c_dark rotate-180  rounded-full text-white"
          }`}
        >
          <HiChevronDown className="h-4 w-4" />
        </span>
      </div>

      <ul
        className={`absolute left-0 top-[calc(100%+.25rem)] z-50 flex h-fit  w-full  flex-col
         gap-2 overflow-y-auto rounded-md p-[5px]  text-sm
         ${select_panel_styles} ${isSelectPanelOpen ? "block" : "hidden"}`}
      >
        {options.map((option, option_index) => (
          <li
            onClick={(event) => {
              event.stopPropagation();
              selectOption(option);
              setIsSelectPanelOpen(false);
            }}
            key={option_index}
            className={` hover:text-c_dark w-fit rounded-2xl px-2 py-1 font-semibold  capitalize hover:bg-c_yellow/20 hover:font-normal ${getActiveOptionClass(
              option || ""
            )}`}
          >
            {typeof option === "object" ? option.name : option}
          </li>
        ))}
      </ul>

      {/* label */}
      <label
        className={`absolute -top-[15px] max-h-[5rem] bg-white text-sm  ${select_label_styles}`}
      >
        {select_label}
      </label>
    </section>
  );
};

export default Select;
