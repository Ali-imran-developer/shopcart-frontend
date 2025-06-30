import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { usePayment } from "@/hooks/stripe-hook";
import { Button, Input, Text, Title } from "rizzui";
import { generateOrderNumber } from "@/utils/helperFunctions/formater-helper";

interface StripePaymentProps {
  formik?: any;
  closeDrawer?: any;
}

const StripePayment: React.FC<StripePaymentProps> = ({ formik, closeDrawer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleAddPayment } = usePayment();
   const [isLoading, setIsLoading] = useState(false);
  const amount = formik?.values?.pricing?.totalPrice;
  const email = formik?.values?.shipmentDetails?.email;
  const orderId = generateOrderNumber();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        amount,
        currency: "usd",
        metadata: { email, orderId },
      };
      const response = await handleAddPayment(payload);
      const { clientSecret } = await response;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { email },
        },
      });
      if (result.error) {
        toast.error(result.error.message || "Payment failed.");
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentId = result?.paymentIntent?.id;
        console.log("ClientId", paymentId);
        await formik.setFieldValue("clientSecret", paymentId);
        toast.success("Payment successful!");
        await new Promise((r) => setTimeout(r, 100));
        closeDrawer(false);
        formik?.submitForm();
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment error");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-between p-4">
      <div className="">
        <Title as="h3" className="mb-4">Add Payment</Title>
        <div className="flex items-center flex-col space-y-4 mb-2">
          <Input
            value={formik?.values?.shipmentDetails?.name}
            readOnly
            className="w-full"
            label="Customer Name"
          />
          <Input
            value={formik?.values?.shipmentDetails?.email}
            readOnly
            className="w-full"
            label="Customer Email"
          />
          <Input
            value={formik?.values?.pricing?.totalPrice}
            readOnly
            className="w-full"
            label="Total Payment"
          />
        </div>
        <CardElement className="p-2 border border-gray-300 py-3 mt-6 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={closeDrawer} className="w-full" variant="outline">
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!stripe || isLoading}
          className="w-full py-2 px-4 flex items-center gap-2 bg-blue-600 text-white rounded-lg"
        >
          <span>Pay</span>
          <span>Rs. {amount}</span>
        </Button>
      </div>
    </form>
  );
};

export default StripePayment;