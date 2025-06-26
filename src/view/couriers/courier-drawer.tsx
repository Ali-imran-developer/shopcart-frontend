import { useCouriers } from "@/hooks/courier-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useFormik } from "formik";
import { Drawer, Input, Button } from "rizzui";

const courierFields: Record<
  string,
  { label: string; name: string; type: string }[]
> = {
  "M&P": [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Security Key", name: "apiPassword", type: "password" },
  ],
  TPL: [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Security Key", name: "apiPassword", type: "password" },
  ],
  Swyft: [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Security Key", name: "apiPassword", type: "password" },
  ],
  Trax: [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Password", name: "apiPassword", type: "password" },
  ],
  PostEx: [{ label: "API Key", name: "apiKey", type: "text" }],
  Leopard: [
    { label: "API Key", name: "apiKey", type: "text" },
    // { label: "Password", name: "apiPassword", type: "password" },
  ],
  HoneyBee: [
    { label: "HBC API Key", name: "apiKey", type: "text" },
    { label: "Merchant ID", name: "apiPassword", type: "password" },
  ],
};

const CourierDrawer = ({
  isDrawerOpen,
  closeDrawer,
  courier,
  selectedCourier,
  cancelCloseDrawer,
}: {
  isDrawerOpen: boolean;
  courier: {
    find(arg0: (c: any) => boolean): unknown;
    name: string;
    _id: string;
  };
  closeDrawer: () => void;
  selectedCourier: any;
  cancelCloseDrawer: () => void;
}) => {
  const { addCourierKeys, isLoading, getCourierKeys } = useCouriers();

  const drawerCloseHandler = () => {
    formik.resetForm();
    closeDrawer();
    if (!selectedCourierData) {
      cancelCloseDrawer();
    }
  };

  const selectedCourierData: any = ensureArray(selectedCourier).find(
    (c: any) => c.name === courier.name
  );
  const formik: any = useFormik({
    initialValues:
      courierFields[courier.name]?.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: selectedCourierData?.[field.name] || "",
        }),
        {}
      ) || {},
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        isDefault: false,
        courierName: courier?.name,
        courierId: courier?._id,
      };
      await addCourierKeys(payload);
      await getCourierKeys();
      drawerCloseHandler();
    },
  });

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={drawerCloseHandler}>
      <form
        className="space-y-3 h-full p-12 flex flex-col justify-between"
        onSubmit={formik.handleSubmit}
        autoComplete="new-password"
      >
        <div className="space-y-3">
          {courierFields[courier.name]?.map((item) => {
            return (
              <Input
                key={item.name}
                label={item.label}
                name={item.name}
                type={item.type as any}
                value={formik.values[item.name]}
                onChange={formik.handleChange}
                required
                autoComplete="new-password"
              />
            );
          })}
        </div>

        <div className="flex space-x-6">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={drawerCloseHandler}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-black flex-1"
            size="lg"
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default CourierDrawer;