import { useAuth, useNotification } from "@/hooks";
import React, { FC } from "react";
import { Button, Icon, NavLink, SpinnerLoader, TabTittle } from "@/components";
import { HiShieldExclamation } from "react-icons/hi2";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { reportAtoms } from "@/atoms";

type NotificationsProps = {
  setDisplayState: SetterOrUpdater<boolean>;
};

const Notifications: FC<NotificationsProps> = ({ setDisplayState }) => {
  /**
   * component states
   */
  const { notifications, isFetchingNotifications } = useNotification();
  const { showReportBullyingModalState, globalNotificationState } = reportAtoms;
  const setShowReportBullyingModal = useSetRecoilState(
    showReportBullyingModalState
  );
  const setGlobalNotification = useSetRecoilState(globalNotificationState);
  const unreadNotifications = notifications?.filter(
    (notification: any) => notification?.attributes?.status === "unread"
  );
  const { user } = useAuth();

  return (
    <section className="w-[20rem] duration-300">
      {isFetchingNotifications ? (
        <div>
          <SpinnerLoader color="fill-c_yellow" />
        </div>
      ) : (
        <div>
          {/* title */}
          <div className="flex items-center justify-between border-b py-2 px-1">
            <TabTittle title="Notifications" title_styles="text-gray-800" />

            {unreadNotifications.length > 0 && (
              <Button
                title="mark all as read"
                type="small"
                intent="secondary"
              />
            )}
          </div>
          {/* body */}
          <div className="flex h-[20rem] flex-col gap-2 overflow-y-scroll px-2 py-2 scrollbar-hide">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map(
                (unreadNotification: any, unreadNotificationIndex: number) => (
                  <div
                    key={unreadNotificationIndex}
                    className=" grid grid-cols-5 gap-2 rounded-[1rem] px-2 py-1 hover:bg-c_primary/10"
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
                        Bully Alert.
                      </span>

                      {/* info */}
                      <div className="flex justify-between text-gray-900">
                        <div className="flex flex-col">
                          <span className="text-gray-900">
                            {unreadNotification?.attributes?.sender?.name}
                          </span>
                          <span className="text-gray-900/30">
                            {unreadNotification?.attributes?.sender?.email}
                          </span>
                        </div>

                        {/* actions */}
                        <Button
                          title="Report"
                          intent="link"
                          type="small"
                          purpose={() => {
                            setShowReportBullyingModal(true);
                            setGlobalNotification(unreadNotification);
                          }}
                        />
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
                to: user?.role === "admin" ? "/ad/notifications" : "",
                name:
                  unreadNotifications.length > 0
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

export default Notifications;
