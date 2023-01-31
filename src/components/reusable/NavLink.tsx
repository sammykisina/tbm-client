import { app_atoms } from "@/atoms";
import { useAuth } from "@/hooks";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { type Route } from "src/types/typings.t";

const navlink_styles = cva(
  "flex items-center rounded-full hover:text-white  focus:outline-none w-full px-4 py-2 text-c_dark gap-3 duration-300",
  {
    variants: {
      type: {
        small: "h-[38px] gap-[6px] text-[14px] hover:bg-c_yellow",
        medium: "h-[40px] gap-[8px] px-[16px] text-[16px] hover:bg-c_yellow",
        large: "h-[56px] gap-[8px] px-[20px] text-[18px] hover:bg-c_dark",
        text_only:
          "text-[14px] py-1 px-0 hover:text-c_yellow  duration-300 hover:tracking-wider",
      },
      full_width: {
        true: "w-full",
        false: "w-fit",
      },
      active: {
        true: "bg-c_yellow w-full text-white",
        for_text_only: "tracking-wider text-c_yellow",
      },
    },
  }
);

interface NavLinkProps extends VariantProps<typeof navlink_styles> {
  route: Route;
  moreActions?: () => void;
}

const NavLink: FC<NavLinkProps> = ({
  full_width,
  type,
  route,
  moreActions,
  active,
}) => {
  /**
   * component states
   */
  const { show_sidebar_state, is_sidebar_open_state } = app_atoms;
  const setShowSidebar = useSetRecoilState(show_sidebar_state);
  const is_sidebar_open = useRecoilValue(is_sidebar_open_state);
  const { user } = useAuth();

  return (
    <Link
      href={route.to}
      className={`${
        route.is_for_admin && user?.role !== "admin" ? "hidden" : ""
      }`}
      onClick={() => {
        setShowSidebar(false);
        moreActions && moreActions();
      }}
    >
      <div className={navlink_styles({ full_width, type, active })}>
        <div className={` ${active && "text-white duration-300"}`}>
          {active ? route.active_icon : route.inactive_icon}
        </div>

        <span
          className={`${!is_sidebar_open && "hidden"} ${
            active && "duration-300"
          }`}
        >
          {route.name}
        </span>
      </div>
    </Link>
  );
};

export default NavLink;
