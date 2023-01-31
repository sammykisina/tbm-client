import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useUsers } from "@/hooks";

type DeleteNormalUserProps = {
  data: {
    owner?: string;
    item?: string;
  };
  disabled?: boolean;
};

const DeleteNormalUser: FC<DeleteNormalUserProps> = ({ data, disabled }) => {
  // component states
  const { deleteMutateAsync, isDeleting } = useUsers();

  return (
    <Button
      title={
        isDeleting ? (
          <SpinnerLoader color="fill-c_yellow" size="w-4 h-4" />
        ) : (
          "Delete"
        )
      }
      intent="danger"
      type="small"
      purpose={() => deleteMutateAsync(data.item || "")}
      disabled={disabled}
    />
  );
};

export default DeleteNormalUser;
