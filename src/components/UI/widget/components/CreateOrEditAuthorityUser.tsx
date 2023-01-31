import { authority_user_atoms } from "@/atoms";
import { Button, Error, SpinnerLoader, WidgetHeader } from "@/components";
import { users_management_schemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import type { z } from "zod";
import { useAuthority } from "@/hooks";

const CreateOrEditAuthorityUser = () => {
  /**
   * component states
   */
  const {
    isEditingAuthorityUserState,
    globalAuthorityUserState,
    showCreateOrEditingAuthorityUserWidgetState,
  } = authority_user_atoms;
  const [isEditingAuthorityUser, setIsEditingAuthorityUser] = useRecoilState(
    isEditingAuthorityUserState
  );
  const [globalAuthorityUser, setGlobalAuthorityUser] = useRecoilState(
    globalAuthorityUserState
  );
  const setShowCreateOrEditingAuthorityUserWidget = useSetRecoilState(
    showCreateOrEditingAuthorityUserWidgetState
  );

  const { authority_user_schema } = users_management_schemas;
  type AuthorityUserSchema = z.infer<typeof authority_user_schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorityUserSchema>({
    resolver: zodResolver(authority_user_schema),
  });

  const {
    isCreatingAuthorityUser,
    createAuthorityUserMutateAsync,
    isEditingAuthorityUser: isEditing,
    editAuthorityUserMutateAsync,
  } = useAuthority();

  /**
   * component functions
   */
  const clearTable = () => {
    reset({
      email: "",
      name: "",
      password: "",
    });
  };

  const onSubmit: SubmitHandler<AuthorityUserSchema> = ({
    email,
    name,
    password,
  }) => {
    isEditingAuthorityUser
      ? editAuthorityUserMutateAsync({
          uuid: globalAuthorityUser?.attributes?.uuid,
          authority_user_data: {
            email,
            name,
            password:
              password === "" || password === undefined ? "password" : password,
          },
        })
      : createAuthorityUserMutateAsync({
          email,
          name,
          password:
            password === undefined || password === "" ? "password" : password,
        });
    clearTable();
  };

  useEffect(() => {
    if (globalAuthorityUser && isEditingAuthorityUser) {
      reset({
        name: globalAuthorityUser?.attributes?.name,
        email: globalAuthorityUser?.attributes?.email,
      });
    }
  }, [globalAuthorityUser, isEditingAuthorityUser, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalAuthorityUser(undefined);
          setIsEditingAuthorityUser(false);
          setShowCreateOrEditingAuthorityUserWidget(false);
          clearTable();
        }}
        title={!isEditingAuthorityUser ? "Creating User." : "Editing User."}
      />

      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 px-2"
      >
        <div className="flex  w-full flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide">
          {/* names */}
          <div className="border-c_dark/10 flex flex-col gap-y-5 rounded-md border py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <label className="input_label">Name</label>

              {errors["name"] && (
                <Error error_message={errors["name"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                className="input peer"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <label className="input_label">Email</label>

              {errors["email"] && (
                <Error error_message={errors["email"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                className="input peer"
                placeholder="password"
                {...register("password")}
              />
              <label className="input_label">Password</label>

              {errors["password"] && (
                <Error error_message={errors["password"].message} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isEditingAuthorityUser ? (
                isEditing ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isCreatingAuthorityUser ? (
                <SpinnerLoader color="fill-white" />
              ) : (
                "Create"
              )
            }
            intent="primary"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditAuthorityUser;
