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
import { useRouter } from "next/router";
import { useAuth, useLocation } from "@/hooks";

const Login = () => {
  // page states
  const { login_schema } = auth_schemas;
  const router = useRouter();
  type LoginSchema = z.infer<typeof login_schema>;
  const { loginMutateAsync, isLogging, user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(login_schema),
  });

  const { latitude, longitude } = useLocation();
  // page functions
  const onSubmit: SubmitHandler<LoginSchema> = async ({ email, password }) => {
    await loginMutateAsync({
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

        <div className="text-sm text-c_yellow">TBM. Its All You.</div>
      </div>

      {/* the Into section */}
      <div className="mt-5 w-full px-6 lg:w-4/5">
        <Title title="Login" title_styles="text-lg pl-8" />

        {/* the login details */}
        <div className="mt-3">
          <form
            className="space-y-1 rounded-[2rem] border px-2  py-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="flex w-full flex-col gap-4 py-3">
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
                  isLogging ? <SpinnerLoader color="fill-white" /> : "Login"
                }
                intent="primary"
              />
            </div>
          </form>
        </div>

        <div className="mt-2 flex flex-col items-center">
          <NavLink
            route={{ to: "/forgot-password", name: "Forgot Password?" }}
            type="text_only"
            full_width={false}
          />

          <div className="flex items-center pl-8">
            <span>Don&lsquo;t have an account yet?</span>
            <NavLink
              route={{ to: "/signup", name: "Sign Up" }}
              type="text_only"
              full_width={false}
            />
          </div>
        </div>
      </div>

      {/* the Toaster */}
      <Toaster />
    </section>
  );
};

export default Login;
