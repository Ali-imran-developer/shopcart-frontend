import { useCallback } from "react";
import toast from "react-hot-toast";
import StripeController from "@/controllers/paymentController";

export const usePayment: any = () => {

  const handleAddPayment = useCallback(async (values: any) => {
    try {
      const data = await StripeController.createStripeUrl(values);
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    }
  }, []);

  return {
    handleAddPayment,
  };
};
