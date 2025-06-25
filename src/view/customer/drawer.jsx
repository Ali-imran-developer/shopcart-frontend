import { Form } from "@/components/ui/form";
import { useCustomer } from "@/hooks/customer-hook";
import toast from "react-hot-toast";
import { Drawer, Input, Button } from "rizzui";

export default function CustomerDrawer({
  isDrawerOpen,
  closeDrawer,
  customerData,
}) {
  const isEdit = Boolean(customerData);
  const { handleAddCustomer, handleEditCustomer, isLoading } = useCustomer();

  const onSubmit = async (data) => {
    if (isEdit) {
      try {
        const response = await handleEditCustomer(customerData?._id, data);
        toast.success(response.message);
        closeDrawer();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const response = await handleAddCustomer(data);
        toast.success(response.message);
        closeDrawer();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
      <Form
        onSubmit={onSubmit}
        className="@container !h-full"
        useFormProps={{
          defaultValues: {
            customerName: customerData?.customerName || "",
            phone: customerData?.phone || "",
            city: customerData?.city || "",
            totalOrders: customerData?.totalOrders || 0,
            totalSpent: customerData?.totalSpent || 0,
          },
        }}
      >
        {({ register, handleSubmit, formState: { errors } }) => (
          <div className="space-y-3 !h-full py-10 px-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-col space-y-3">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register("customerName")}
                  error={errors.customerName?.message}
                  className="flex-grow"
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                  className="flex-grow"
                />
                <Input
                  label="City"
                  placeholder="Enter your city"
                  {...register("city")}
                  error={errors.city?.message}
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
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
                type="submit"
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                {isEdit ? "Edit Customer" : "Create Customer"}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Drawer>
  );
}
