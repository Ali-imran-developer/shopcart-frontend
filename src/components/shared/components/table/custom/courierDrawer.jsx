import { Form } from "@/components/ui/form";
import { useOrders } from "@/hooks/order-hook";
import { phoneNumberValidator, usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";
import validationSchema from "@/validators/shipping-info";
import { useState } from "react";
import toast from "react-hot-toast";
import { Drawer, Input, Button } from "rizzui";

export default function CourierDrawer({
  isDrawerOpen,
  closeDrawer,
  name,
  email,
  address,
  phone,
  city,
  row,
}) {
  // const [isLoading, setIsLoading ] = useState(false);
  const { maskRHFValue } = usePhoneNumberMask();
  const { handleUpdateShipmentDetails, handleGetOrders, isLoading } = useOrders();

  const initialValues = {
    name: name ?? "",
    email: email ?? "",
    address: address ?? "",
    phone: phone?.toString() ?? "",
    city: city ?? "",
  };

  const onSubmit = async (data) => {
    try {
      await handleUpdateShipmentDetails(row?.original?._id, { shipmentDetails: data });
      closeDrawer();
      await handleGetOrders();
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  };

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
      <Form
        onSubmit={onSubmit}
        className="@container !h-full"
        validationSchema={validationSchema}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, handleSubmit, formState: { errors } }) => (
          <div className="space-y-3 !h-full py-10 px-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-col space-y-3">
                <Input
                  label="City"
                  placeholder="Enter your city"
                  {...register("city")}
                  error={errors.city?.message}
                  className="flex-grow"
                />
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register("name")}
                  error={errors.name?.message}
                  className="flex-grow"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                  className="flex-grow"
                />
                <Input
                  label="Address"
                  placeholder="Enter your address1"
                  {...register("address")}
                  error={errors.address?.message}
                  className="flex-grow"
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  {...register("phone", phoneNumberValidator)}
                  onChange={maskRHFValue(register("phone").onChange)}
                  error={errors.phone?.message}
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={closeDrawer}
              >
                Cancel
              </Button>
              <Button
                className="text-white bg-black flex-1"
                size="lg"
                type="submit"
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Drawer>
  );
}
