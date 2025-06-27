import ForgetPasswordForm from "./reset-password-form";
import AuthWrapperOne from "./auth-wrapper-one";
import { Text } from "rizzui";

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          <span className="relative inline-block">
            Enters the new Password!
          </span>
          <Text className="text-xs">
            The password you entering is now your new password!
          </Text>
        </>
      }
      bannerTitle=""
      bannerDescription=""
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <img
            src={
              "https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp"
            }
            alt="Sign Up Thumbnail"
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <ForgetPasswordForm />
    </AuthWrapperOne>
  );
}
