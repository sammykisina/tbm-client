import { object, string } from "zod";

const login_schema = object({
  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(4, { message: "Password should be at least than 5 character" }),
});

const register_schema = object({
  name: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(5, { message: "Name should be at least 5 characters" }),
  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5, { message: "Password should be at least than 5 character" }),
});

const verify_schema = object({
  code: string({
    required_error: "Code is required.",
  })
    .trim()
    .min(6, {
      message: "The code must be 6 numbers.",
    }),
});

const auth_schemas = { login_schema, register_schema, verify_schema };

export default auth_schemas;
