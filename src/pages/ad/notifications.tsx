import { reportAtoms } from "@/atoms";
import {
  Modal,
  ReportBullying,
  SingleNotification,
  SpinnerLoader,
  TabTittle,
  Title,
} from "@/components";
import { useNotification } from "@/hooks";
import { format, isEqual } from "date-fns";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Notifications = () => {
  /**
   * page states
   */
  const notification_wrapper_styles =
    "w-full space-y-3 rounded-xl border border-yellow px-3 py-2";
  const { notifications, isFetchingNotifications } = useNotification();
  const todays_notifications = notifications?.filter((notification: any) =>
    isEqual(
      new Date(format(new Date(), "EE, MMM d, yyy")),
      new Date(
        format(new Date(notification?.attributes?.created_at), "EE, MMM d, yyy")
      )
    )
  );

  const { showReportBullyingModalState } = reportAtoms;
  const showReportBullyingModal = useRecoilValue(showReportBullyingModalState);
  const router = useRouter();

  /**
   * page functions
   */
  const earlier_notifications = notifications?.filter(
    (notification: any) =>
      !isEqual(
        new Date(format(new Date(), "EE, MMM d, yyy")),
        new Date(
          format(
            new Date(notification?.attributes?.created_at),
            "EE, MMM d, yyy"
          )
        )
      )
  );

  useEffect(() => {
    if (Cookies.get("token") === "" || Cookies.get("token") === undefined) {
      router.push("/");
    }
  }, []);

  return (
    <section className="mt-2 flex h-[44.5rem] flex-col gap-2  overflow-y-scroll  px-2 scrollbar-hide xs:h-[39rem] xl:h-[39rem]">
      {/* Title */}
      <TabTittle title="Your Activities" title_styles="text-lg" />

      <div className="flex h-[44.5rem]   flex-col gap-5  space-y-4 overflow-y-scroll  pt-2   scrollbar-hide xs:h-[39rem] xl:h-[39rem] ">
        {/* Todays Notifications */}
        <div
          className={`h-[24rem] xs:h-[20.5rem] ${notification_wrapper_styles}`}
        >
          {/* Title */}
          <Title title="Today" title_styles="text-base" />

          {/* Notifications */}
          <div>
            {isFetchingNotifications ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader color="fill-c_yellow" />
              </div>
            ) : todays_notifications?.length !== 0 ? (
              <div className="flex h-[19.5rem] flex-col gap-2 divide-y divide-c_yellow overflow-y-scroll py-2 scrollbar-hide xs:h-[17rem]">
                {todays_notifications.map(
                  (notification: any, notificationIndex: number) => (
                    <SingleNotification
                      notification={notification}
                      key={notificationIndex}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                No new notifications.
              </div>
            )}
          </div>
        </div>

        {/* Other Days Notifications */}
        <div
          className={`h-[24rem] xs:h-[20.5rem]  ${notification_wrapper_styles}`}
        >
          {/* Title */}
          <Title title="Earlier" title_styles="text-base" />

          {/* Notifications */}
          <div>
            {isFetchingNotifications ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader color="fill-c_yellow" />
              </div>
            ) : earlier_notifications?.length !== 0 ? (
              <div className="flex h-[11rem] flex-col gap-2 divide-y divide-c_yellow  overflow-y-scroll py-2 scrollbar-hide  ">
                {earlier_notifications.map(
                  (notification: any, notificationIndex: number) => (
                    <SingleNotification
                      notification={notification}
                      key={notificationIndex}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                No new notifications.
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        modal_state={showReportBullyingModal}
        modal_styles="w-[80vw] sm:w-[70vw] md:w-[60vw] xmd:w-[50vw]  lg:w-[40vw] xl:w-[30vw] h-[15rem] duration-300"
        component={<ReportBullying />}
      />
    </section>
  );
};

export default Notifications;
