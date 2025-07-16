import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./store-hook";
import ResaleController from "@/controllers/resaleController";
import { setAllResaleProducts, setResaleProducts } from "@/store/slices/resaleSlice";

export const useResaleProduct = (queryParams?: any) => {
  console.log(queryParams);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const getResaleProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ResaleController.getResaleProduct(queryParams);
      dispatch(setResaleProducts(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  const getAllResaleProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await ResaleController.getAllResaleProduct();
      dispatch(setAllResaleProducts(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createResaleProducts = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await ResaleController.createResaleProduct(values);
      dispatch(setResaleProducts(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (queryParams?.page || queryParams?.limit || queryParams?.isListed){
      getResaleProducts();
    }
  }, [queryParams?.page, queryParams?.limit, queryParams?.isListed]);

  return {
    isLoading,
    getResaleProducts,
    getAllResaleProducts,
    createResaleProducts,
  }
};
