import { Button, SpinnerLoader, TabTittle, Table } from "@/components";
import React, { FC } from "react";
import { useUsers } from "@/hooks";
import { normal_user_atoms } from "@/atoms";
import { useSetRecoilState } from "recoil";

type NormalUsersProps = {
  users: any;
  isFetchingUsers: boolean;
};

const NormalUsers: FC<NormalUsersProps> = ({ isFetchingUsers, users }) => {
  /**
   * component states
   */
  const normal_users = users?.filter(
    (user: any) => user?.relationships?.role?.attributes?.slug === "user"
  );

  const { modifyUsersData, normal_user_columns } = useUsers();

  const { show_create_or_edit_normal_user_widget_state } = normal_user_atoms;
  const setShowCreateOrEditNormalUserWidget = useSetRecoilState(
    show_create_or_edit_normal_user_widget_state
  );

  return (
    <section className="h-full xs:h-[34.5rem] lg:h-[39rem]">
      {/* title */}
      <div className="flex  justify-between">
        <TabTittle title="Users." />
        <Button
          title="Create A User"
          type="medium"
          intent="primary"
          purpose={() => {
            setShowCreateOrEditNormalUserWidget(true);
          }}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingUsers ? (
          <div className="flex h-full items-center justify-center">
            <SpinnerLoader color="fill-c_yellow" />
          </div>
        ) : normal_users.length > 0 ? (
          <Table
            data={modifyUsersData(normal_users)}
            columns={normal_user_columns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[26.5rem] lg:h-[31rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Users Yet.
            <Button
              title="Create"
              type="medium"
              intent="primary"
              purpose={() => {
                setShowCreateOrEditNormalUserWidget(true);
              }}
            />
          </div>
        )}
      </section>
    </section>
  );
};

export default NormalUsers;
