import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useAuthority } from "@/hooks";

type DeleteAuthorityProps = {
  data: {
    owner?: string;
    item?: string;
  };
};

const DeleteAuthority: FC<DeleteAuthorityProps> = ({ data }) => {
  // component states
  const { isDeleting, deleteMutateAsync } = useAuthority();

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
    />
  );
};

export default DeleteAuthority;
