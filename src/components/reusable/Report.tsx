import { format } from "date-fns";
import React, { useRef, type FC } from "react";
import { Button, Icon, Info, Title } from "@/components";
import { HiShieldExclamation } from "react-icons/hi2";
import { useReactToPrint } from "react-to-print";

type ReportProps = {
  report: any;
};

const Report: FC<ReportProps> = ({ report }) => {
  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  return (
    <section className="py-2 print:bg-c_gary" ref={reportRef}>
      <div className=" flex gap-4">
        <span className=" whitespace-nowrap">
          {format(new Date(report?.attributes?.created_at), "EE, MMM d, yyy")}
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon
                icon={<HiShieldExclamation className="icon text-c_red" />}
                icon_wrapper_styles="bg-c_red/20 p-2 rounded-full w-fit "
              />

              <Title title="Bully Report" title_styles="text-c_red" />
            </div>

            <div className="print:hidden">
              <Button
                title="To PDF"
                intent="link"
                type="small"
                purpose={() => {
                  handlePrint();
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center  gap-3 lg:flex-row">
                <div className="flex flex-col gap-3">
                  <Info info={report?.attributes?.sender} title="Offender" />
                  <Info info={report?.attributes?.receiver} title="Offended" />
                  <Info
                    info={report?.attributes?.reporter}
                    title="Whistleblower"
                  />
                </div>

                <div className="">
                  <Title title="Location:" title_styles="text-sm cols-span-1" />

                  <div className="col-span-3 flex flex-col">
                    <span className="text-c_red">
                      Latitude: {report?.attributes?.receiverLocation?.lat}
                    </span>
                    <span className="text-c_red">
                      Longitude: {report?.attributes?.receiverLocation?.lon}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 md:flex">
                <span className="col-span-1 text-gray-300/50 print:text-gray-500">
                  Message
                </span>
                <p className="col-span-3">{report?.attributes?.message}</p>
              </div>
            </div>

            <p className="text-c_red/40">
              This follows a series of inappropriate messages send to the
              receiver on our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
