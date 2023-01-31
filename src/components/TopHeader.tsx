import React, { type ReactNode, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { app_atoms, users_atoms } from "@/atoms";
import {
  AdminActivityNotifications,
  AuthorityActivityNotifications,
  Dropdown,
  Icon,
  NavLink,
  Profile,
  SpinnerLoader,
  Title,
  UserNotifications,
} from "@/components";
import {
  HiBell,
  HiOutlineBell,
  HiOutlineUser,
  HiUserPlus,
} from "react-icons/hi2";
import { useAuth, useUsers } from "@/hooks";

const TopHeader = () => {
  // component states
  const { show_sidebar_state } = app_atoms;
  const setShowSidebar = useSetRecoilState(show_sidebar_state);
  const pathname = usePathname();
  const [show_profile_dropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState<boolean>(false);

  const { showSelectUserForChatModalState } = users_atoms;
  const setShowSelectUserForChatModal = useSetRecoilState(
    showSelectUserForChatModalState
  );
  const { user } = useAuth();
  const { userInfo, isFetchingUserInfo } = useUsers();

  // component function
  const getTitle: (pathname: string) => string | ReactNode = (pathname) => {
    let title: string | ReactNode = "";

    switch (pathname) {
      case "/":
        title = "Home.";
        break;
      case "/auth/login":
        title = "Oh!. Your Back.";
        break;
      case "/auth/register":
        title = "Join with a few clicks.";
        break;
      case "/ad/users":
        title = "Users.";
        break;
      case "/au/users":
        title = "Users.";
        break;
      case "/ad/notifications":
        title = "Notifications";
        break;

      case "/au/reports":
        title = "Reports";
        break;

      case "/messenger":
        title = (
          <Icon
            purpose={() => setShowSelectUserForChatModal(true)}
            icon={
              isFetchingUserInfo ? (
                <SpinnerLoader color="fill-c_yellow" size="h-4 w-4" />
              ) : (
                <HiUserPlus className="icon" />
              )
            }
            icon_wrapper_styles={`${
              userInfo?.relationships?.blocked.includes(1) ? "hidden" : "block"
            }`}
          />
        );
        break;

      default:
        title = "";
    }

    return title;
  };

  return (
    <nav className="border-c_dark flex h-[50px] items-center justify-between rounded-md border px-2 sm:px-0">
      <div className="flex items-center gap-x-4 ">
        <Icon
          icon={
            <HiOutlineMenuAlt3 className="text-c_green h-5 w-5 sm:hidden" />
          }
          purpose={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
        />

        {/* the current page title */}
        {pathname && (
          <Title
            title={getTitle(pathname)}
            title_styles="first-letter:capitalize text-c_dark text-xl font-semibold tracking-wider"
          />
        )}
      </div>

      {/* the rest of the icons */}
      <div className="flex items-center  gap-x-2">
        {/* the current user dropdown */}
        {user ? (
          <div className="flex ">
            <Dropdown
              active={
                <HiBell
                  className={`icon  hover:text-c_yellow ${
                    showNotificationDropdown && "text-c_yellow"
                  }`}
                />
              }
              inactive={
                <HiOutlineBell
                  className={`icon  hover:text-c_yellow ${
                    showNotificationDropdown && "text-c_yellow"
                  }`}
                />
              }
              dropdown_component={
                user?.role === "admin" ? (
                  <AdminActivityNotifications
                    setDisplayState={setShowNotificationDropdown}
                  />
                ) : user?.role === "authority" ? (
                  <AuthorityActivityNotifications
                    setDisplayState={setShowNotificationDropdown}
                  />
                ) : (
                  <UserNotifications
                    setDisplayState={setShowNotificationDropdown}
                  />
                )
              }
              display_state={showNotificationDropdown}
              setDisplayState={setShowNotificationDropdown}
            />

            <Dropdown
              inactive={
                <HiOutlineUser
                  className={`icon  hover:text-c_yellow ${
                    show_profile_dropdown && "text-c_yellow"
                  }`}
                />
              }
              active={
                <HiOutlineUser
                  className={`icon  hover:text-c_yellow ${
                    show_profile_dropdown && "text-c_yellow"
                  }`}
                />
              }
              dropdown_component={<Profile />}
              display_state={show_profile_dropdown}
              setDisplayState={setShowProfileDropdown}
            />
          </div>
        ) : (
          <div className="flex items-center px-2">
            <NavLink
              route={{ to: "/auth/login", name: "Login" }}
              type="small"
              active={pathname === "/auth/login" && true}
            />
            <NavLink
              route={{ to: "/auth/register", name: "Register" }}
              type="text_only"
              active={pathname === "/auth/register" && "for_text_only"}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
