import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Text, Input, Password } from "rizzui";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@components/ui/form";
import { routes } from "@config/routes";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../../validators/reset-password.schema";
import { useAuth } from "@/hooks/auth-hooks";

const initialValues = {
  email: "",
  // password: "",
  // confirmPassword: "",
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const { handleforgetPassword, isLoading } = useAuth();

  const onSubmit = async (data: any) => {
    console.log(data);
    await handleforgetPassword(data);
    setReset(initialValues);
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("email")}
              error={errors.email?.message}
            />
            {/* <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("password")}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            /> */}
            <Button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
              type="submit"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Verify Email
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{" "}
        <Link
          to={routes.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
