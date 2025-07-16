import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./store-hook";
import categoriesController from "@/controllers/categories";
import { setCategories, setPublicCategories } from "@/store/slices/categoriesSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";

export const useCategories = (queryParams?: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const handleGetCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data: any = await categoriesController.fetchAllCategory(queryParams);
      dispatch(setCategories(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  const getPublicCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data: any = await categoriesController.getPublicCategory(queryParams);
      dispatch(setPublicCategories(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  const handleAddCategory = async (data: any) => {
    try {
      setLoading(true);
      const response: any = await categoriesController.addNewCategory(data);
      toast.success(response?.message);
      navigate(routes?.products?.categories);
      return response;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (data: any, id: string) => {
    try {
      setLoading(true);
      const response: any = await categoriesController.editCategory(data, id);
      toast.success(response?.message);
      navigate(routes?.products?.categories);
      return response;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setLoading(true);
      const response: any = await categoriesController.deleteCategory(id);
      toast.success(response?.message);
      await handleGetCategories();
      return response;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    }finally{
      setLoading(false);
    }
  };

  const handleDeleteSubCategory = useCallback(async (categoryId: string, subCategoryId: string) => {
    try { 
      setLoading(true);
      const response: any = await categoriesController.deleteSubCategory(categoryId, subCategoryId);
      toast.success(response?.message);
      await handleGetCategories();
      return response;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(queryParams?.page || queryParams?.limit){
      handleGetCategories()
    }
  },[queryParams?.page, queryParams?.limit])

  return {
    Loading,
    setLoading,
    handleAddCategory,
    handleEditCategory,
    handleGetCategories,
    getPublicCategories,
    handleDeleteCategory,
    handleDeleteSubCategory,
  }
};
