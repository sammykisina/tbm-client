import { useAuth, useAuthority } from "@/hooks";
import React, { FC } from "react";
import { Button, SpinnerLoader } from "@/components";

type SendBullyWarningProps = {
  bullyUuid: string;
};

const SendBullyWarning: FC<SendBullyWarningProps> = ({ bullyUuid }) => {
  /**
   * component states
   */
  const { user } = useAuth();
  const { sendBullyWarningMutateAsync, isSendingBullyWarning } = useAuthority();

  return (
    <Button
      title={
        isSendingBullyWarning ? (
          <SpinnerLoader color="fill-c_white" />
        ) : (
          "Send A Bully Warning"
        )
      }
      intent="danger"
      type="small"
      purpose={() =>
        sendBullyWarningMutateAsync({
          authorityUuid: user?.uuid || "",
          bullyUuid: bullyUuid,
        })
      }
      hidden={user?.role === "admin" && true}
    />
  );
};

export default SendBullyWarning;
