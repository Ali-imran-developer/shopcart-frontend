import { useEffect, useState } from "react";
import { useFormik } from "formik";
import DifferentBillingAddress from "./different-billing-address";
import AddressInfo from "./address-info";
import cn from "@utils/helperFunctions/class-names";
import { CartPageWrapper } from "./index";
import { SelectProduct } from "./selectProduct/index";
import { Button, Radio } from "rizzui";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { routes } from "@/config/routes";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import CustomerInfo from "./customer-info";
import { useOrders } from "@/hooks/order-hook";
import { shipmentDetailsSchema } from "@/validators/create-order.schema";
import PaymentDrawer from "./payment-drawer";

export default function CreateOrder() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [prepaid, setPrepaid] = useState(false);
  const { handleAddOrders } = useOrders();
  const selectedProducts = ensureArray(products)?.filter((p) => p?.checked);

  const initialValues = {
    tags: [],
    products: [
      {
        productId: "",
        productQty: 1,
      },
    ],
    status: "open",
    promoCode: "",
    paymentMethod: "",
    clientSecret: "",
    shipperCity: "",
    shipmentDetails: {
      email: "",
      name: "",
      phone: "",
      city: "",
      address: "",
    },
    pricing: {
      subTotal: 0,
      orderTax: 0,
      paid: 0,
      shipping: 0,
      totalPrice: 0,
    },
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: shipmentDetailsSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (values?.products[0]?.productId === "") {
          toast.error("Please select product!");
        } else {
          const response = await handleAddOrders(values);
          if (response.message === "Order created successfully!") {
            navigate(routes.orders.orders);
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!formik?.values?.paymentMethod) {
      formik.setFieldValue("paymentMethod", "cod");
    }
  }, []);

  const isOrderInfoComplete = () => {
    const hasProduct = formik?.values?.products?.some(
      (p) => p?.productId && p?.productQty > 0
    );
    const hasShipmentDetails = Object.values(
      formik?.values?.shipmentDetails
    )?.every((v) => v && v?.trim() !== "");
    return hasProduct && hasShipmentDetails;
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={cn(
          "isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium"
        )}
      >
        <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
          <div className="flex-grow @5xl:col-span-8 @6xl:col-span-7">
            <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
              <SelectProduct
                formik={formik}
                products={products}
                setProducts={setProducts}
              />
              <AddressInfo
                formik={formik}
                type="billingAddress"
                title="Shipping Information"
              />
              {/* <DifferentBillingAddress formik={formik} /> */}
            </div>
          </div>

          <div className="pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3">
            <CustomerInfo className="" formik={formik} />
            <CartPageWrapper
              formik={formik}
              selectedProducts={selectedProducts}
            />
            <div className="flex items-center gap-6 mt-4">
              <Radio
                label="Cash on Delivery"
                name="paymentMethod"
                size="md"
                value="cod"
                className="!mt-0"
                onChange={() => {
                  formik?.setFieldValue("paymentMethod", "cod");
                  setPrepaid(false);
                }}
                checked={formik?.values?.paymentMethod === "cod"}
              />
              <Radio
                label="Card Payment"
                name="paymentMethod"
                size="md"
                value="paid"
                className="!mt-0"
                onChange={() => {
                  if (isOrderInfoComplete()) {
                    formik.setFieldValue("paymentMethod", "paid");
                    setPrepaid(true);
                  } else {
                    toast.error(
                      "Please select product and fill required fields"
                    );
                    formik.setFieldValue("paymentMethod", "cod");
                  }
                }}
                checked={formik.values.paymentMethod === "paid"}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-end me-28">
          <Button
            size="lg"
            className="w-60 rounded-xl"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create Order
          </Button>
        </div>
      </form>
      {prepaid && (
        <PaymentDrawer
          prepaid={prepaid}
          isDrawerOpen={prepaid}
          closeDrawer={() => {
            setPrepaid(false);
            // if (shouldReset) {
              formik.setFieldValue("paymentMethod", "cod");
            // }
          }}
          formik={formik}
        />
      )}
    </>
  );
}
