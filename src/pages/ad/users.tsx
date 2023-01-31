import {
  AuthorityUsers,
  MessengerManagement,
  NormalUsers,
  Tab,
} from "@/components";
import { useAuth, useUsers } from "@/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiShieldCheck, HiSquares2X2, HiUsers } from "react-icons/hi2";

const Users = () => {
  /**
   * pages states
   */
  const { isFetchingUsers, users } = useUsers();
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const usersTabs = [
    {
      label: "Normal Users",
      content: <NormalUsers users={users} isFetchingUsers={isFetchingUsers} />,
      icon: <HiUsers className="icon" />,
    },
    {
      label: "Authority Users",
      content: (
        <AuthorityUsers users={users} isFetchingUsers={isFetchingUsers} />
      ),
      icon: <HiShieldCheck className="icon" />,
    },
    {
      label: "Manage Chats",
      content: <MessengerManagement />,
      icon: <HiSquares2X2 className="icon" />,
    },
  ];

  useEffect(() => {
    if (Cookies.get("token") === "" || Cookies.get("token") === undefined) {
      router.push("/");
    }
  }, []);

  return (
    <section className="h-full">
      <Tab
        tabs_data={usersTabs}
        tabs_body_styles="lg:grid grid-cols-6 duration-300"
        index={index}
        icons_only_tabs
        setIndex={setIndex}
        icons_only_tabs_styles="flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1"
        tabs_content_height="mt-[1rem] py-2 lg:mt-0 scrollbar-hide "
      />
    </section>
  );
};

export default Users;
