import {
  HiBell,
  HiDocument,
  HiHome,
  HiOutlineBell,
  HiOutlineDocument,
  HiOutlineHome,
  HiOutlinePaperAirplane,
  HiOutlineUserGroup,
  HiPaperAirplane,
  HiUserGroup,
} from "react-icons/hi2";
import type { Route } from "src/types/typings.t";

const common_routes = [
  {
    name: "Home",
    inactive_icon: <HiOutlineHome className="icon" />,
    active_icon: <HiHome className="icon" />,
    to: "/",
  },
];

const admin_routes: Route[] = [
  {
    name: "Users",
    to: "/ad/users",
    inactive_icon: <HiOutlineUserGroup className="icon" />,
    active_icon: <HiUserGroup className="icon" />,
  },
  {
    name: "Messenger",
    inactive_icon: <HiOutlinePaperAirplane className="icon" />,
    active_icon: <HiPaperAirplane className="icon" />,
    to: "/messenger",
  },
  {
    name: "Notifications",
    inactive_icon: <HiOutlineBell className="icon" />,
    active_icon: <HiBell className="icon" />,
    to: "/ad/notifications",
  },
];

const authority_routes: Route[] = [
  {
    name: "Users",
    to: "/au/users",
    inactive_icon: <HiOutlineUserGroup className="icon" />,
    active_icon: <HiUserGroup className="icon" />,
  },
  {
    name: "Messenger",
    inactive_icon: <HiOutlinePaperAirplane className="icon" />,
    active_icon: <HiPaperAirplane className="icon" />,
    to: "/messenger",
  },
  {
    name: "Reports",
    inactive_icon: <HiOutlineDocument className="icon" />,
    active_icon: <HiDocument className="icon" />,
    to: "/au/reports",
  },
];

const user_routes: Route[] = [
  {
    name: "Messenger",
    inactive_icon: <HiOutlinePaperAirplane className="icon" />,
    active_icon: <HiPaperAirplane className="icon" />,
    to: "/messenger",
  },
];

const routes = {
  common_routes,
  admin_routes,
  authority_routes,
  user_routes,
};

export default routes;
