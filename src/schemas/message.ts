import { object, string } from "zod";

const message_schema = object({
  message: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(1, { message: "Name should be at least 5 characters" }),
});

export default message_schema;
