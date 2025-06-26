import toast from "react-hot-toast";
import { useFormik } from "formik";
import FormGroup from "@shared/form-group";
import { Input } from "rizzui";
import { PiEnvelopeSimple } from "react-icons/pi";
import FormFooter from "@/components/shared/components/form-footer";
import UploadZone from "./upload-zone";
import { useState } from "react";
import { usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";
import AuthController from "@/controllers/authController";
import { useAuth } from "@/hooks/auth-hooks";

const PersonalInfoView = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { maskFormikValue } = usePhoneNumberMask();
  const { profile } = AuthController.get();
  const { handleUpdateUser, isLoading } = useAuth();

  const initialValues = {
    name: profile?.userName ?? "",
    email: profile?.email ?? "",
    address: profile?.address ?? "",
    phoneNumber: profile?.phoneNumber ?? "",
    image: profile?.image ?? "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Submitted values:", values);
      const Data = {
        ...values,
        image: uploadedImageUrl || values.image,
      };
      await handleUpdateUser(profile?._id, Data);
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="@container">
        <div className="mb-24 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          <FormGroup
            title="Profile Details"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />
            <Input
              name="email"
              placeholder="email@gmail.com"
              value={profile?.email}
              disabled
              prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
            />
            <Input
              name="phoneNumber"
              placeholder="Phone (optional)"
              value={formik.values.phoneNumber}
              onChange={maskFormikValue(
                formik?.handleChange,
                formik?.setFieldValue
              )}
              error={formik.errors.phoneNumber}
            />
            <Input
              name="address"
              placeholder="Address (optional)"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
          </FormGroup>

          <FormGroup
            title="Your Photo"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            description="This will be displayed on your profile."
          >
            <UploadZone
              formik={formik}
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
            />
          </FormGroup>
        </div>
        <FormFooter
          altBtnText="Cancel"
          submitBtnText="Save"
          isLoading={isLoading}
          disabled={imageLoadingState || isLoading}
        />
      </form>
    </>
  );
};

export default PersonalInfoView;