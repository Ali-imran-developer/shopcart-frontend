import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import StoreController from "@/controllers/storeController";
import { setStore } from "@/store/slices/storeSlice";

export const useStores = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStore = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await StoreController.getStore();
      dispatch(setStore(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditStore = useCallback(async (id: String, values: any) => {
    try {
      setIsLoading(true);
      const data: any = await StoreController.updateStore(id, values);
      await handleGetStore();
      return data;
    } catch (error) {
      console.log("@Error", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleGetStore,
    handleEditStore,
  };
};
