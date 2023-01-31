import { useUsers } from "@/hooks";
import { app_utils } from "@/utils";
import React from "react";
import SpinnerLoader from "src/components/reusable/SpinnerLoader";

const Profile = () => {
  /**
   * component states
   */
  const { generateAvatar } = app_utils;
  const { userInfo, isFetchingUserInfo } = useUsers();

  return (
    <section className="w-[15rem] px-2">
      {isFetchingUserInfo ? (
        <SpinnerLoader color="fill-c_yellow" />
      ) : (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={generateAvatar(
                userInfo?.attributes?.name,
                "20332A",
                "fff",
                true
              )}
              alt=""
              className="h-10 w-10  rounded-full"
            />
          </div>

          <div className="ml-1">
            <div className="text-xs font-semibold capitalize text-gray-900">
              {userInfo?.attributes?.name}
            </div>

            <div className="whitespace-nowrap text-sm text-gray-900/30">
              {userInfo?.attributes?.email}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
