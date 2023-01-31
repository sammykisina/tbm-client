import { Button, Icon, NavLink, TabTittle } from "@/components";
import { useAuth, useNotification } from "@/hooks";
import React, { type FC } from "react";
import { HiShieldExclamation } from "react-icons/hi2";
import { type SetterOrUpdater } from "recoil";
import SpinnerLoader from "src/components/reusable/SpinnerLoader";

type AuthorityActivityNotificationsProps = {
  setDisplayState: SetterOrUpdater<boolean>;
};

const AuthorityActivityNotifications: FC<
  AuthorityActivityNotificationsProps
> = ({ setDisplayState }) => {
  /**
   * component states
   */
  const { notifications, isFetchingNotifications } = useNotification();

  return (
    <section className="w-[20rem] duration-300">
      {isFetchingNotifications ? (
        <div>
          <SpinnerLoader color="fill-c_yellow" />
        </div>
      ) : (
        <div>
          {/* title */}
          <div className="flex  items-center justify-between border-b py-2 px-1">
            <TabTittle title="Reports" title_styles="text-gray-800" />
          </div>
          {/* body */}
          <div className="flex h-[20rem] flex-col gap-2 overflow-y-scroll px-2 py-2 scrollbar-hide">
            {notifications.length > 0 ? (
              notifications.map(
                (notification: any, notificationIndex: number) => (
                  <div
                    key={notificationIndex}
                    className=" grid grid-cols-5 gap-2 rounded-[1rem] bg-c_primary/10 px-2 py-1"
                  >
                    <div className="col-span-1">
                      <Icon
                        icon={
                          <HiShieldExclamation className="icon text-c_red" />
                        }
                        icon_wrapper_styles="bg-c_red/20 p-2 rounded-full w-fit "
                      />
                    </div>

                    <div className="col-span-4">
                      {/* title */}
                      <span className=" whitespace-nowrap text-gray-500">
                        Bully Report.
                      </span>

                      {/* info */}
                      <div className="flex justify-between text-gray-900">
                        <div className="flex flex-col">
                          <span className="text-gray-900">
                            {notification?.attributes?.sender?.name}
                          </span>
                          <span className="text-gray-900/30">
                            {notification?.attributes?.sender?.email}
                          </span>
                        </div>

                        {/* actions */}
                        <Button title="Priority" type="small" intent="danger" />
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="flex  justify-center text-gray-900">
                You have no new notifications
              </div>
            )}
          </div>

          {/* footer */}
          <div className="flex items-center justify-center border-t py-2 px-1">
            <NavLink
              route={{
                to: "/au/reports",
                name:
                  notifications.length > 0
                    ? "view more"
                    : "Go to Notifications",
              }}
              type="small"
              active
              moreActions={() => {
                setDisplayState(false);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AuthorityActivityNotifications;
