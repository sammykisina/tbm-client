import { authority_user_atoms } from "@/atoms";
import { Button, SpinnerLoader, TabTittle, Table } from "@/components";
import { useAuthority } from "@/hooks";
import React, { type FC } from "react";
import { useSetRecoilState } from "recoil";

type AuthorityUsersProps = {
  users: any;
  isFetchingUsers: boolean;
};

const AuthorityUsers: FC<AuthorityUsersProps> = ({
  users,
  isFetchingUsers,
}) => {
  /**
   * component states
   */
  const { modifyUsersData, authority_user_columns } = useAuthority();
  const authority_users = users?.filter(
    (authority: any) =>
      authority?.relationships?.role?.attributes?.slug === "authority"
  );

  const { showCreateOrEditingAuthorityUserWidgetState } = authority_user_atoms;
  const setShowCreateOrEditingAuthorityUserWidget = useSetRecoilState(
    showCreateOrEditingAuthorityUserWidgetState
  );

  /**
   * component functions
   */
  return (
    <section className="h-full xs:h-[34.5rem] lg:h-[39rem]">
      {/* title */}
      <div className="flex  justify-between">
        <TabTittle title="Authority." />
        <Button
          title="Create Authority."
          type="medium"
          intent="primary"
          purpose={() => setShowCreateOrEditingAuthorityUserWidget(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingUsers ? (
          <div className="flex h-full items-center justify-center">
            <SpinnerLoader color="fill-c_yellow" />
          </div>
        ) : authority_users.length > 0 ? (
          <Table
            data={modifyUsersData(authority_users)}
            columns={authority_user_columns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[26.5rem] lg:h-[31rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Authority Users Yet.
            <Button
              title="Create"
              type="medium"
              intent="primary"
              purpose={() => setShowCreateOrEditingAuthorityUserWidget(true)}
            />
          </div>
        )}
      </section>
    </section>
  );
};

export default AuthorityUsers;
