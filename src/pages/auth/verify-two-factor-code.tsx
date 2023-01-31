import { Button, Error, Logo, SpinnerLoader, Title } from "@/components";
import { useAuth } from "@/hooks";
import { auth_schemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import type { z } from "zod";

const VerifyTwoFactorCode = () => {
  /**
   * page states
   */
  const { verifyMutateAsync, isVerifying, user } = useAuth();
  const router = useRouter();

  const { verify_schema } = auth_schemas;
  type VerifySchema = z.infer<typeof verify_schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VerifySchema>({
    resolver: zodResolver(verify_schema),
  });
  const uuid = Cookies.get("user-uuid");

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<VerifySchema> = async ({ code }) => {
    await verifyMutateAsync({ code, uuid: uuid || "" });
  };

  if (user) router.push("/");

  return (
    <section className="mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-center  sm:px-[24px]">
      {/* pos name */}
      <div className="mb-5 flex flex-col items-center">
        <Logo dot_styles="w-2 h-2 bg-c_yellow" />

        <div className="text-sm text-c_yellow">
          TBM. Verify its you to get started.
        </div>
      </div>

      {/* the Into section */}
      <div className="mt-5 w-full px-6 lg:w-4/5">
        <Title title="Verify Code" title_styles="text-lg pl-8" />

        {/* the login details */}
        <div className="mt-3">
          <form
            className="space-y-1 rounded-[2rem] border px-2  py-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="flex w-full flex-col gap-4 py-3">
              <div className="relative">
                <input
                  type="number"
                  {...register("code")}
                  className="input peer"
                  placeholder="Code"
                />
                <label className="input_label">Code</label>

                {errors["code"] && (
                  <Error error_message={errors["code"].message} />
                )}
              </div>
            </section>

            <div className="flex justify-end">
              <Button
                title={
                  isVerifying ? <SpinnerLoader color="fill-white" /> : "Verify"
                }
                intent="primary"
              />
            </div>
          </form>
        </div>
      </div>

      {/* the Toaster */}
      <Toaster />
    </section>
  );
};

export default VerifyTwoFactorCode;
