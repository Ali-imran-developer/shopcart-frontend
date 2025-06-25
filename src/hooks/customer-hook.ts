import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import CustomerControllers from "@/controllers/customerController";
import { setCustomer } from "@/store/slices/customerSlice";

export const useCustomer = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCustomer = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await CustomerControllers.fetchAllCustomers();
      dispatch(setCustomer(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddCustomer = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await CustomerControllers.addNewCustomer(values);
      // dispatch(setCustomer(data));
      await handleGetCustomer();
      return data;
    } catch (error) {
      console.log("@Error", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditCustomer = useCallback(async (id: String, values: any) => {
    try {
      setIsLoading(true);
      const data: any = await CustomerControllers.editCustomers(id, values);
      // dispatch(setCustomer(data));
      await handleGetCustomer();
      return data;
    } catch (error) {
      console.log("@Error", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteCustomer = useCallback(async (id: String) => {
    try {
      setIsLoading(true);
      const data: any = await CustomerControllers.deleteCustomers(id);
      // dispatch(setCustomer(data));
      await handleGetCustomer();
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    handleGetCustomer,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    isLoading,
  };
};
