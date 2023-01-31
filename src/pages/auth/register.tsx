import {
  Logo,
  Title,
  Error,
  Button,
  SpinnerLoader,
  NavLink,
} from "@/components";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth_schemas } from "@/schemas";
import { type z } from "zod";
import { useAuth, useLocation } from "@/hooks";
import { useRouter } from "next/navigation";

const Register = () => {
  /**
   * page states
   */
  const { registerMutateAsync, isRegistering, user } = useAuth();
  const { register_schema } = auth_schemas;
  const { latitude, longitude } = useLocation();
  type RegisterSchema = z.infer<typeof register_schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(register_schema),
  });
  const router = useRouter();
  /**
   * page functions
   */
  const onSubmit: SubmitHandler<RegisterSchema> = async ({
    name,
    email,
    password,
  }) => {
    registerMutateAsync({
      name,
      email,
      password,
      lat: latitude?.toString() || "unknown",
      lon: longitude?.toString() || "unknown",
    });
  };

  if (user) router.push("/");

  return (
    <section className="mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-center  sm:px-[24px]">
      {/* pos name */}
      <div className="mb-5 flex flex-col items-center">
        <Logo dot_styles="w-2 h-2 bg-c_yellow" />

        <div className="text-sm  text-c_yellow">TBM. We keep you safe.</div>
      </div>

      {/* the Into section */}
      <div className="mt-5 w-full px-6 lg:w-4/5">
        <Title title="Register" title_styles="text-lg  pl-8" />

        {/* the login details */}
        <div className="mt-3">
          <form
            className="space-y-1 rounded-[2rem] border px-2  py-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="flex w-full flex-col gap-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  {...register("name")}
                  className="input peer"
                  placeholder="Name"
                />
                <label className="input_label">Name</label>

                {errors["name"] && (
                  <Error error_message={errors["name"].message} />
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className="input peer"
                  placeholder="Email"
                />
                <label className="input_label">Email</label>

                {errors["email"] && (
                  <Error error_message={errors["email"].message} />
                )}
              </div>

              <div className="relative">
                <input
                  type="password"
                  {...register("password")}
                  className="input peer"
                  placeholder="Password"
                />
                <label className="input_label">Password</label>

                {errors["password"] && (
                  <Error error_message={errors["password"].message} />
                )}
              </div>
            </section>

            <div className="flex justify-end">
              <Button
                title={
                  isRegistering ? (
                    <SpinnerLoader color="fill-c_white" />
                  ) : (
                    "Register"
                  )
                }
                intent="primary"
              />
            </div>
          </form>
        </div>

        <div className="mt-3 flex items-center justify-center pl-8">
          <span className=" text-sm">Already have an account?</span>
          <NavLink
            route={{ to: "/auth/login", name: "Login" }}
            type="text_only"
            full_width={false}
          />
        </div>
      </div>

      {/* the Toaster */}
      <Toaster />
    </section>
  );
};

export default Register;
