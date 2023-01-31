import { format } from "date-fns";
import React, { FC } from "react";
import { Button, Icon, Title } from "@/components";
import { HiShieldExclamation } from "react-icons/hi2";
import { reportAtoms } from "@/atoms";
import { useSetRecoilState } from "recoil";

type SingleNotificationProps = {
  notification: any;
};

const SingleNotification: FC<SingleNotificationProps> = ({ notification }) => {
  /**
   * component states
   */
  const { showReportBullyingModalState, globalNotificationState } = reportAtoms;
  const setShowReportBullyingModal = useSetRecoilState(
    showReportBullyingModalState
  );
  const setGlobalNotification = useSetRecoilState(globalNotificationState);

  return (
    <section className="py-2">
      <div className="-centeitemsr flex gap-4">
        <span className=" whitespace-nowrap">
          {format(
            new Date(notification?.attributes?.created_at),
            "EE, MMM d, yyy"
          )}
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon
              icon={<HiShieldExclamation className="icon text-c_red" />}
              icon_wrapper_styles="bg-c_red/20 p-2 rounded-full w-fit "
            />

            <Title title="Bully Alter" title_styles="text-c_red" />
          </div>

          <div>
            <div className="w-[15rem] rounded-md border border-c_red/10 px-2 py-1">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-gray-500">
                    {notification?.attributes?.sender?.name}
                  </span>
                  <span className="text-c_white">
                    {notification?.attributes?.sender?.email}
                  </span>
                </div>

                {/* actions */}
                <div className="flex flex-col justify-end">
                  <Button
                    title="Report"
                    intent="link"
                    type="small"
                    purpose={() => {
                      setShowReportBullyingModal(true);
                      setGlobalNotification(notification);
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="text-c_red/40">
              This follows a series of inappropriate messages send to another
              user of our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleNotification;
