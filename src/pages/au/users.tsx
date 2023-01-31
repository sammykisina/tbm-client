import { UserAPI } from "@/api";
import { SpinnerLoader, TabTittle, Table } from "@/components";
import { useUsers } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Users = () => {
  /**
   * page states
   */
  const { data: users, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserAPI.authorityGetAll(),
  });
  const normal_users = users?.filter(
    (user: any) => user?.relationships?.role?.attributes?.slug === "user"
  );

  const { modifyUsersData, normal_user_columns } = useUsers();
  const router = useRouter();

  /**
   * page functions
   */
  useEffect(() => {
    if (Cookies.get("token") === "" || Cookies.get("token") === undefined) {
      router.push("/");
    }
  }, []);

  return (
    <section className="h-full xs:h-[34.5rem] lg:h-[39rem]">
      {/* title */}
      <TabTittle title="Users." />

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
            table_height="h-[32rem] xs:h-[32.5rem] lg:h-[33.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Users Yet.
          </div>
        )}
      </section>
    </section>
  );
};

export default Users;
