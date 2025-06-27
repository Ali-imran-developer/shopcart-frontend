import { useState } from "react";
import { Button, Input, Password } from "rizzui";
import { Form } from "@components/ui/form";
import { forgetPasswordSchema, ForgetPasswordSchema } from "../../validators/reset-password.schema";
import { useAuth } from "@/hooks/auth-hooks";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  // token: "",
  newPassword: "",
};

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [reset, setReset] = useState({});
  const { handleResetPassword, isLoading } = useAuth();

  const onSubmit = async (data: any) => {
    const payload = {
      token,
      newPassword: data.newPassword,
    };
    console.log("Sending payload: ", payload);
    const response = await handleResetPassword(payload);
    if(response?.message === "Password reset successful"){
      navigate("/login");
      setReset(initialValues);
    }
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
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
            {/* <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("code")}
              error={errors.code?.message}
            /> */}
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />
            <Button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
              type="submit"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Verify new password
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
