import { z } from "zod";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./common-rules";

export const resetPasswordSchema = z.object({
  email: validateEmail,
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;



export const verifyCodeSchema = z.object({
  email: validateEmail,
  code: validatePassword,
});

export type VerifyCodeSchema = z.infer<typeof verifyCodeSchema>;



export const forgetPasswordSchema = z.object({
  newPassword: validateConfirmPassword,
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;