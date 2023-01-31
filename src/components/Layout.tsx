import { app_atoms, authority_user_atoms, normal_user_atoms } from "@/atoms";
import { type ReactNode } from "react";
import { useRecoilValue } from "recoil";
import {
  CreateOrEditAuthorityUser,
  CreateOrEditNormalUser,
  Sidebar,
  TopHeader,
  Widget,
} from "@/components";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: ReactNode }) => {
  /**
   * component states
   */
  const { is_sidebar_open_state, show_sidebar_state } = app_atoms;
  const show_sidebar = useRecoilValue(show_sidebar_state);
  const is_sidebar_open = useRecoilValue(is_sidebar_open_state);

  const { show_create_or_edit_normal_user_widget_state } = normal_user_atoms;
  const show_create_or_edit_normal_user_widget = useRecoilValue(
    show_create_or_edit_normal_user_widget_state
  );

  const { showCreateOrEditingAuthorityUserWidgetState } = authority_user_atoms;
  const showCreateOrEditingAuthorityUserWidget = useRecoilValue(
    showCreateOrEditingAuthorityUserWidgetState
  );

  return (
    <section className="relative mx-auto flex w-full max-w-[1200px]  sm:px-[20px]">
      {/* the Toaster */}
      <Toaster />

      {/* the sidebar */}
      <div
        className={`absolute  duration-300 sm:left-0  ${
          show_sidebar ? "left-0" : "-left-[100%]"
        }`}
        // ref={sidebarRef}
      >
        <Sidebar />
      </div>

      {/* the rest of the body */}
      <div
        className={`h-screen max-w-[1200px] flex-1 overflow-x-scroll p-2 duration-300 scrollbar-hide  ${
          is_sidebar_open ? "sm:ml-[250px]" : "sm:ml-24"
        }`}
      >
        <TopHeader />

        <div className="mt-5 h-[47rem] overflow-y-scroll  scrollbar-hide xs:h-[40rem] ">
          {children}
        </div>
      </div>

      {/* widgets */}
      <Widget
        widget_state={show_create_or_edit_normal_user_widget}
        component={<CreateOrEditNormalUser />}
        widget_styles="w-[90vw] h-fit"
      />

      <Widget
        widget_state={showCreateOrEditingAuthorityUserWidget}
        component={<CreateOrEditAuthorityUser />}
        widget_styles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Layout;
