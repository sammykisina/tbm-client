import { useAuth, useChat } from "@/hooks";
import React from "react";
import { Icon, ModalHeader, SpinnerLoader, Title } from "@/components";
import { users_atoms } from "@/atoms";
import { useSetRecoilState } from "recoil";
import { app_utils } from "@/utils";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Users = () => {
  /**
   * component states
   */
  const { user: currentLoggedInUser } = useAuth();
  const {
    users,
    isFetchingUsers,
    checkIfConversationExistMutateAsync,
    isChecking,
  } = useChat();
  const { generateAvatar } = app_utils;
  const usersExcludingTheCurrentUser = users?.filter(
    (user: any) => user?.attributes?.uuid !== currentLoggedInUser?.uuid
  );

  const { showSelectUserForChatModalState } = users_atoms;
  const setShowSelectUserForChatModal = useSetRecoilState(
    showSelectUserForChatModalState
  );


  return (
    <section>
      {/* header */}
      <section className="border-b">
        <ModalHeader
          close={() => {
            setShowSelectUserForChatModal(false);
          }}
          title="New Message"
        />
      </section>

      {/* body */}
      <section>
        {isFetchingUsers ? (
          <div className="flex h-[20rem] justify-center">
            <SpinnerLoader color="fill-c_yellow" />
          </div>
        ) : usersExcludingTheCurrentUser?.length > 0 ? (
          <>
            <div className="flex h-[21rem] flex-col gap-2 overflow-y-scroll px-4 py-2 scrollbar-hide">
              {usersExcludingTheCurrentUser.map(
                (user: any, userIndex: number) => (
                  <div
                    key={userIndex}
                    className="group flex items-center justify-between rounded-full bg-gray-200 py-2 px-2 text-gray-900"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <img
                          src={generateAvatar(
                            user?.attributes?.name,
                            "20332A",
                            "fff",
                            true
                          )}
                          alt=""
                          className="h-10 w-10  rounded-full"
                        />
                      </div>

                      <div className="ml-1">
                        <div className="text-xs font-semibold capitalize text-gray-900">
                          {user?.attributes?.name}
                        </div>

                        <div className="whitespace-nowrap text-sm text-gray-900/30">
                          {user?.attributes?.email}
                        </div>
                      </div>
                    </div>

                    <Icon
                      icon_wrapper_styles={`bg-c_yellow p-2 rounded-full hidden group-hover:block`}
                      icon={<HiOutlineArrowLongRight className="icon" />}
                      purpose={() =>
                        checkIfConversationExistMutateAsync({
                          receiver_id: user?.id,
                          sender_id: currentLoggedInUser?.id || 0,
                        })
                      }
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-2 flex justify-center">
              <Title title="Chat confidently without fear of cyberbullying." />
            </div>
          </>
        ) : (
          <div className="flex h-[20rem] items-center justify-center font-semibold tracking-wider text-gray-900">
            <p>No users to chat with yet.</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default Users;
