import { useCallback, useEffect, useState } from "react";
import ProductController from "../controllers/productController";
import { useAppDispatch } from "./store-hook";
import { setProducts } from "../store/slices/productSlice";
import toast from "react-hot-toast";
import { routes } from "@/config/routes";
import { useNavigate } from "react-router-dom";

export const useProduct = (queryParams?: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ProductController.getAllProducts(queryParams);
      dispatch(setProducts(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  const handleAddProduct = async (values: any) => {
    try {
      setIsLoading(true);
      const response: any = await ProductController.createProduct(values);
      toast.success(response?.message);
      navigate(routes.products.products);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (values: any, id: String) => {
    try {
      setIsLoading(true);
      const response: any = await ProductController.updateProduct(values, id);
      toast.success(response?.message);
      navigate(routes.products.products);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProducts = async (product_id: string) => {
    try {
      const data: any = await ProductController.deleteProduct(product_id);
      toast.success(data?.response);
      await handleGetProducts();
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if(queryParams?.page || queryParams?.limit || queryParams?.status){
      handleGetProducts()
    }
  },[queryParams?.page, queryParams?.limit, queryParams?.status])

  return {
    isLoading,
    handleGetProducts,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProducts,
  };
};
