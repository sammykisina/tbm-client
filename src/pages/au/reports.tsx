import { Report, SpinnerLoader, TabTittle, Title } from "@/components";
import { useNotification } from "@/hooks";
import { format, isEqual } from "date-fns";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Reports = () => {
  /**
   * page states
   */
  const report_wrapper_styles =
    "w-full space-y-3 rounded-xl border border-yellow px-3 py-2";
  const { notifications: reports, isFetchingNotifications: isFetchingReports } =
    useNotification();

  const todays_reports = reports?.filter((report: any) =>
    isEqual(
      new Date(format(new Date(), "EE, MMM d, yyy")),
      new Date(
        format(new Date(report?.attributes?.created_at), "EE, MMM d, yyy")
      )
    )
  );
  const router = useRouter();

  /**
   * page functions
   */
  const earlier_reports = reports?.filter(
    (report: any) =>
      !isEqual(
        new Date(format(new Date(), "EE, MMM d, yyy")),
        new Date(
          format(new Date(report?.attributes?.created_at), "EE, MMM d, yyy")
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
      <TabTittle title="Your Reports" title_styles="text-lg" />

      <div className="flex h-[44.5rem]   flex-col gap-5  space-y-4 overflow-y-scroll  pt-2   scrollbar-hide xs:h-[39rem] xl:h-[39rem] ">
        {/* Todays reports */}
        <div className={`h-[24rem] xs:h-[20.5rem] ${report_wrapper_styles}`}>
          {/* Title */}
          <Title title="Today" title_styles="text-base" />

          {/* reports */}
          <div>
            {isFetchingReports ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader color="fill-c_yellow" />
              </div>
            ) : todays_reports?.length !== 0 ? (
              <div className="flex  h-[19.5rem]  flex-col gap-2 divide-y divide-c_yellow overflow-y-scroll py-2 scrollbar-hide xs:h-[17rem]">
                {todays_reports.map((report: any, reportIndex: number) => (
                  <Report report={report} key={reportIndex} />
                ))}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                No new reports.
              </div>
            )}
          </div>
        </div>

        {/* Other Days reports */}
        <div className={`h-[14rem]  ${report_wrapper_styles}`}>
          {/* Title */}
          <Title title="Earlier" title_styles="text-base" />

          {/* reports */}
          <div>
            {isFetchingReports ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader color="fill-c_yellow" />
              </div>
            ) : earlier_reports?.length !== 0 ? (
              <div className="flex  h-[11rem] flex-col gap-2 divide-y  divide-c_yellow overflow-y-scroll py-2 scrollbar-hide ">
                {earlier_reports.map((report: any, reportIndex: number) => (
                  <Report report={report} key={reportIndex} />
                ))}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                No new notifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
