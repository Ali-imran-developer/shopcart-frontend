import { z, ZodType } from "zod";
import * as Yup from "yup";

export const signUpSchema = Yup.object({
  userName: Yup.string().required("userName is required"),
  email: Yup.string().required("email is required"),
  password: Yup.string().required("Password is required"),
});

export type formType = {
  apiKey: string;
  securityKey: string;
  password: string;
};
export const courierSchema: ZodType<formType> = z.object({
  apiKey: z.string(),
  securityKey: z.string(),
  password: z.string(),
});
export type CourierSchema = z.infer<typeof courierSchema>;
export type SignUpSchema = Yup.InferType<typeof signUpSchema>;
