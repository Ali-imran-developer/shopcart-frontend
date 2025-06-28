import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import StripeController from "@/controllers/paymentController";

export const usePayment: any = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPayment = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await StripeController.createStripeUrl(values);
    //   toast.success(data?.clientSecret);
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleAddPayment,
  };
};
