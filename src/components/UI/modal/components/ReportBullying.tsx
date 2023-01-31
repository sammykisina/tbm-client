import { reportAtoms } from "@/atoms";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Button,
  ModalHeader,
  Notifications,
  Select,
  SpinnerLoader,
} from "@/components";
import { useAuth, useAuthority, useUsers } from "@/hooks";

const ReportBullying = () => {
  /**
   * component states
   */
  const [selectedAuthority, setSelectedAuthority] = useState({
    name: "",
    value: "",
  });
  const { globalNotificationState, showReportBullyingModalState } = reportAtoms;
  const [globalNotification, setGlobalNotification] = useRecoilState(
    globalNotificationState
  );
  const setShowReportBullyingModal = useSetRecoilState(
    showReportBullyingModalState
  );
  const { users, isFetchingUsers, createAuthorityOptions } = useUsers();
  const authority_users = users?.filter(
    (authority: any) =>
      authority?.relationships?.role?.attributes?.slug === "authority"
  );

  const { isReportingBullying, reportBullyingMutateAsync } = useAuthority();
  const { user } = useAuth();

  return (
    <section>
      {/* header */}
      <section className="border-b">
        <ModalHeader
          close={() => {
            setGlobalNotification(null);
            setShowReportBullyingModal(false);
          }}
          title="Report this crime to available authorities."
        />
      </section>

      {/* body */}
      <section className="flex h-[8rem] flex-col justify-between py-2 px-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-500 ">Select Authority</span>
          <Select
            multiple={false}
            options={createAuthorityOptions(authority_users)}
            select_wrapper_styles="border border-c_gray/30 rounded-[0.9rem] py-1 w-[10rem] text-gray-500"
            select_panel_styles="max-h-[5rem] bg-white border border-dark shadow-md text-gray-500"
            selected={selectedAuthority}
            setSelected={setSelectedAuthority}
          />
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isReportingBullying ? (
                <SpinnerLoader color="fill-c_white" />
              ) : (
                "Report"
              )
            }
            purpose={() => {
              if (selectedAuthority.value === "") {
                Notifications.errorNotification("Please select the authority.");
                return;
              }
              reportBullyingMutateAsync({
                admin_uuid: user?.uuid || "",
                authorityEmail: selectedAuthority?.value,
                notificationId: globalNotification?.id,
                receiverEmail: globalNotification?.attributes?.receiver?.email,
                senderEmail: globalNotification?.attributes?.sender?.email,
                message: globalNotification?.attributes?.message,
              });
            }}
          />
        </div>
      </section>
    </section>
  );
};

export default ReportBullying;
