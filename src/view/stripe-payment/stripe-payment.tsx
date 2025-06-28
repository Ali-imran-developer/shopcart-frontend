import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { usePayment } from "@/hooks/stripe-hook";
import { Button } from "rizzui";

interface StripePaymentProps {
  amount: number;
  email: string;
  orderId?: string;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  email,
  orderId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleAddPayment, isLoading } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    try {
      const payload = {
        amount,
        currency: "usd",
        metadata: { email, orderId },
      };
      const response = await handleAddPayment(payload);
      console.log(response);
      const { clientSecret } = await response;
      console.log("clientSecret", clientSecret);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { email },
        },
      });
      if (result.error) {
        toast.error(result.error.message || "Payment failed.");
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-semibold">Enter your card details</h2>
      <CardElement className="p-2 border border-gray-300 rounded" />
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!stripe || isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded"
      >
        {`Pay ${amount}`}
      </Button>
    </form>
  );
};

export default StripePayment;