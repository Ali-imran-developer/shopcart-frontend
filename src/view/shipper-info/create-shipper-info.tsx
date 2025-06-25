import FormGroup from "@/components/shared/form-group";
import { Form } from "@/components/ui/form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "rizzui";
import { ensureObject } from "@/utils/helperFunctions/formater-helper";
import { addInfoSchema } from "@/utils/validators/addShipperInfo.schema";
import {
  phoneNumberValidator,
  usePhoneNumberMask,
} from "@/utils/helperFunctions/phone-number";
import { useAppDispatch } from "@/hooks/store-hook";
import { useShipperData } from "@/hooks/shipper-hook";

export interface FormValues {
  locationName?: string;
  city?: string;
  storeName?: string;
  phoneNumber?: string;
  address?: string;
  returnAddress?: string;
}

const AddShipperInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { maskRHFValue } = usePhoneNumberMask();
  const params = useParams();
  const { addShipper, updateShipper, isLoading } = useShipperData();

  const editAddress = location?.state?.address;

  const {
    address: {
      storeName = "",
      phoneNumber = "",
      locationName = "",
      city = "",
      returnAddress = "",
      address = "",
      // storeId = "",
    } = {},
    shipperInfo = "",
  } = ensureObject(location?.state) || {};

  const initialValues = {
    storeName: storeName ?? "",
    phoneNumber: phoneNumber ?? "",
    locationName: locationName ?? "",
    city: city ?? "",
    returnAddress: returnAddress ?? "",
    address: address ?? "",
  };

  const onSubmit = async (data: any) => {
    if (shipperInfo === "edit") {
      const response = await updateShipper(data, editAddress?._id);
      console.log("Update response:", response);
    } else {
      const response = await addShipper(data);
      console.log("Add response:", response);
    }
  };

  return (
    <>
      <div className="label-tab-data">
        <Form<FormValues>
          validationSchema={addInfoSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{ defaultValues: initialValues }}
        >
          {({ register, formState: { errors, isValid } }) => (
            <>
              <div className="mb-16 grid gap-7 divide-y divide-dashed divide-gray-100 @2xl:gap-9 @3xl:gap-20">
                <FormGroup
                  title={editAddress ? "Edit Shipper Info" : "Shipper Info"}
                  // title={"Shipper Info"}
                  description={
                    editAddress
                      ? "Update your Shipper Info details here!"
                      : "Add all your Shipper Info details here!"
                  }
                  // description={"Add all your Shipper Info details here!"}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    label="Location Name"
                    placeholder="Enter Your Location Name"
                    {...register("locationName")}
                    error={errors.locationName?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="City (Origin)"
                    placeholder="Enter your City"
                    {...register("city")}
                    error={errors.city?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Display Store Name"
                    placeholder="Enter your Store name"
                    {...register("storeName")}
                    error={errors.storeName?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Support Phone Number"
                    placeholder="Enter your Phone Number"
                    {...register("phoneNumber", phoneNumberValidator)}
                    onChange={maskRHFValue(register("phoneNumber").onChange)}
                    error={errors.phoneNumber?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Address"
                    placeholder="Enter your Address"
                    {...register("address")}
                    error={errors.address?.message}
                    className="flex-grow col-span-full"
                  />
                  <Input
                    label="Return Address for Reselling Orders"
                    placeholder="Enter your Address for Return Orders"
                    {...register("returnAddress")}
                    error={errors.returnAddress?.message}
                    className="flex-grow col-span-full"
                  />
                </FormGroup>
              </div>
              <hr className="py-4" />
              <div className="flex justify-end gap-4">
                <Button
                  className="w-full @lg:w-auto cursor-pointer"
                  type="submit"
                  disabled={!isValid}
                  isLoading={isLoading}
                >
                  {editAddress ? "Update Info" : "Submit"}
                  {/* Submit */}
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default AddShipperInfo;