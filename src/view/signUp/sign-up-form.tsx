import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Text } from "rizzui";
import { routes } from "../../config/routes";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import { useAppDispatch } from "@/hooks/store-hook";
import { signUp } from "@/store/slices/authSlice";
import AuthController from "@/controllers/authController";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    console.log("values", values);
    try {
      setIsLoading(true);
      const response = await dispatch(signUp(values)).unwrap();
      toast.success("Sign up successfully!");
      if (response?.token) {
        AuthController.set({ token: response?.token });
        AuthController.set({ user: response?.user });
      }
      navigate("/");
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message || error?.data?.message || error?.message;
      toast.error(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, errors, touched }) => (
          <Form className="space-y-4">
            <Input
              type="text"
              size="md"
              label="User Name"
              placeholder="Enter user name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...getFieldProps("userName")}
            />
            <Input
              size="md"
              label="email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...getFieldProps("email")}
            />

            <Input
              type="text"
              size="md"
              label="Password"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your password"
              {...getFieldProps("password")}
            />

            <Button
              type="submit"
              className="bg-blue-600 w-full my-4"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Text className="mt-2 text-center leading-loose text-gray-500 lg:mt-2 lg:text-start">
        Don’t have an account?{" "}
        <Link
          to={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
