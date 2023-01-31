import { Icon, TabTittle } from "@/components";
import { useNotification } from "@/hooks";
import { format } from "date-fns";
import React, { FC } from "react";
import { SetterOrUpdater } from "recoil";
import SpinnerLoader from "src/components/reusable/SpinnerLoader";

type UserNotificationsProps = {
  setDisplayState: SetterOrUpdater<boolean>;
};

const UserNotifications: FC<UserNotificationsProps> = ({ setDisplayState }) => {
  const { notifications, isFetchingNotifications } = useNotification();
  console.log("nit", notifications);

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
            <TabTittle title="Notifications" title_styles="text-gray-800" />
          </div>
          {/* body */}
          <div className="flex h-[20rem] flex-col gap-2 overflow-y-scroll px-2 py-2 scrollbar-hide">
            {notifications.length > 0 ? (
              notifications.map(
                (notification: any, notificationIndex: number) => (
                  <div key={notificationIndex}>
                    {notification?.attributes?.type === "notify" ? (
                      <div className="grid grid-cols-5 gap-2 rounded-[1rem] bg-green-500/10 px-2 py-1">
                        <span className=" col-span-2 h-fit whitespace-nowrap text-gray-900">
                          {format(
                            new Date(notification?.attributes?.created_at),
                            "EE, MMM d, yyy"
                          )}
                        </span>

                        <p className="col-span-3 text-indigo-500">
                          {notification?.attributes?.message}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-5 gap-2 rounded-[1rem] bg-c_red/10 px-2 py-1">
                        <span className=" col-span-2 h-fit whitespace-nowrap text-gray-900">
                          {format(
                            new Date(notification?.attributes?.created_at),
                            "EE, MMM d, yyy"
                          )}
                        </span>

                        <div className="col-span-3">
                          <p className="text-red-400">
                            {notification?.attributes?.message}
                          </p>

                          <div>
                            <div className="text-xs font-semibold capitalize text-gray-900">
                              {notification?.attributes?.authority?.name}
                            </div>

                            <div className="whitespace-nowrap text-sm text-gray-900/30">
                              {notification?.attributes?.authority?.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )
            ) : (
              <div className="flex  justify-center text-gray-900">
                You have no new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserNotifications;
