import { object, string } from "zod";

const normal_user_schema = object({
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
    .optional(),
});

const authority_user_schema = object({
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
    .optional(),
});

const users_management_schemas = {
  normal_user_schema,
  authority_user_schema,
};

export default users_management_schemas;
