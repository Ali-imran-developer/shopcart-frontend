import { Link } from "react-router-dom";
import { Button, Input, Text } from "rizzui";
import { routes } from "../../config/routes";
import { Form, Formik } from "formik";
import { useAuth } from "@/hooks/auth-hooks";
import { signUpSchema } from "@/validators/signup.schema";
import  GoogleAuthButton from "../google-authentication";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  // const googleLogin = useGoogleAuth();
  const { handlePrimarySignup, isLoading } = useAuth();

  const handleSubmit = async (values: any) => {
    await handlePrimarySignup(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, errors, touched }) => (
          <Form className="flex flex-col gap-2">
            <Input
              type="text"
              size="md"
              label="User Name"
              placeholder="Enter user name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...getFieldProps("userName")}
              error={touched.userName && (errors.userName as any)}
            />
            <Input
              size="md"
              label="email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...getFieldProps("email")}
              error={touched.email && (errors.email as any)}
            />

            <Input
              type="text"
              size="md"
              label="Password"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your password"
              {...getFieldProps("password")}
              error={touched.password && (errors.password as any)}
            />
            <div className="mt-4 flex flex-col gap-3 items-center">
              <Button
                type="submit"
                className="bg-blue-600 w-full"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Sign Up
              </Button>
              <div className="w-full">
                <GoogleAuthButton />
              </div>
            </div>
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
