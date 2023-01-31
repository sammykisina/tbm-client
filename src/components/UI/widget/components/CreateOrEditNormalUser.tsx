import { normal_user_atoms } from "@/atoms";
import { Button, Error, SpinnerLoader, WidgetHeader } from "@/components";
import { useUsers } from "@/hooks";
import { users_management_schemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import type { z } from "zod";

const CreateOrEditNormalUser = () => {
  /**
   * component states
   */
  const {
    is_editing_normal_user_state,
    global_normal_user_state,
    show_create_or_edit_normal_user_widget_state,
  } = normal_user_atoms;
  const [is_editing_normal_user, setIsEditingNormalUser] = useRecoilState(
    is_editing_normal_user_state
  );
  const [globalNormalUser, setGlobalNormalUser] = useRecoilState(
    global_normal_user_state
  );
  const setShowCreateOrEditNormalUserWidget = useSetRecoilState(
    show_create_or_edit_normal_user_widget_state
  );

  const { normal_user_schema } = users_management_schemas;
  type NormalUserSchema = z.infer<typeof normal_user_schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NormalUserSchema>({
    resolver: zodResolver(normal_user_schema),
  });

  const {
    createNormalUserMutateAsync,
    isCreatingNormalUser,
    editNormalUserMutateAsync,
    isEditingNormalUser,
  } = useUsers();

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

  const onSubmit: SubmitHandler<NormalUserSchema> = ({
    email,
    name,
    password,
  }) => {
    is_editing_normal_user
      ? editNormalUserMutateAsync({
          uuid: globalNormalUser?.attributes?.uuid,
          normal_user_data: {
            email,
            name,
            password:
              password === "" || password === undefined ? "password" : password,
          },
        })
      : createNormalUserMutateAsync({
          email,
          name,
          password:
            password === undefined || password === "" ? "password" : password,
        });

    clearTable();
  };

  useEffect(() => {
    if (globalNormalUser && is_editing_normal_user) {
      reset({
        name: globalNormalUser?.attributes?.name,
        email: globalNormalUser?.attributes?.email,
      });
    }
  }, [globalNormalUser, is_editing_normal_user, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalNormalUser(undefined);
          setIsEditingNormalUser(false);
          setShowCreateOrEditNormalUserWidget(false);
          clearTable();
        }}
        title={!is_editing_normal_user ? "Creating User." : "Editing User."}
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
              is_editing_normal_user ? (
                isEditingNormalUser ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isCreatingNormalUser ? (
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

export default CreateOrEditNormalUser;
