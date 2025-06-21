import UnderlineShape from "../../components/shape/underline";
import SignUpForm from "./sign-up-form";
import AuthWrapperOne from "../../components/shared/auth-layout/auth-wrapper-one";
import { metaObject } from "../../config/site.config";

export const metadata = {
  ...metaObject("Sign Up 1"),
};

const SignUp = () => {
  return (
    <AuthWrapperOne
      title={
        <>
          Shopilam is goin to save you About 40 man hours daily -{" "}
          <span className="relative inline-block">
            SIGN UP!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      // description="By signing up, you will gain access to exclusive content, special offers, and be the first to hear about exciting news and updates."
      // bannerTitle="The simplest way to manage your E-commerce."
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <img
            src={
              "https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp"
            }
            alt="Sign Up Thumbnail"
            sizes="(max-width: 768px) 100vw"
            className="object-cover max-w-[768px] max-h-[100vw]"
          />
        </div>
      }
    >
      <SignUpForm />
    </AuthWrapperOne>
  );
};
export default SignUp;
