import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import categoriesController from "@/controllers/categories";
import { setCategories } from "@/store/slices/categoriesSlice";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const [Loading, setLoading] = useState(false);

  const handleGetCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data: any = await categoriesController.fetchAllCategory();
      console.log("@hookdata", data);
      dispatch(setCategories(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddCategory = useCallback(async (data: any) => {
    try {
      setLoading(true);
      const response: any = await categoriesController.addNewCategory(data);
      return response;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditCategory = useCallback(async (data: any, id: string) => {
    try {
      setLoading(true);
      const response: any = await categoriesController.editCategory(data, id);
      return response;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteCategory = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response: any = await categoriesController.deleteCategory(id);
      return response;
    } catch (error) {
      console.log("@Error", error);
    }finally{
      setLoading(false);
    }
  }, []);

  const handleDeleteSubCategory = useCallback(async (categoryId: string, subCategoryId: string) => {
    try { 
      setLoading(true);
      const response: any = await categoriesController.deleteSubCategory(categoryId, subCategoryId);
      return response;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    handleGetCategories,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleDeleteSubCategory,
    Loading,
    setLoading,
  };
};
