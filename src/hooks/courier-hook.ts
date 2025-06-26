import CourierControllers from "@/controllers/courierController";
import { setCourier, setCourierCreds } from "../store/slices/courierSlice";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useCouriers = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const getCourier = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CourierControllers.getCourier();
      dispatch(setCourier(data));
      return data;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourier = useCallback(async (values: any) => {
    try {
      const data = await CourierControllers.createCourier(values);
      toast.success(data?.message);
      await getCourier();
      return data;
    } catch (error: any) {
      console.error("Failed to load couriers:", error);
      return error;
    }
  }, []);

  const editCourier = useCallback(async (id: String, values: any) => {
    try {
      const data = await CourierControllers.editCourier(id, values);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.error("Failed to load couriers:", error);
      toast.error("Failed to add courier. Please try again.");
      return error;
    }
  }, []);

  const deleteCourier = useCallback(async (id: String) => {
    try {
      const data = await CourierControllers.deleteCourier(id);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.error("Failed to load couriers:", error);
      toast.error("Failed to add courier. Please try again.");
      return error;
    }
  }, []);

  const getCourierKeys = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CourierControllers.getCourierCreds();
      dispatch(setCourierCreds(data));
      return data;
    } catch (error: any) {
      console.error("Failed to get couriers creds:", error);
      toast.error("Failed to get courier creds!");
      return error;
    } finally{
      setLoading(false);
    }
  }, []);

  const addCourierKeys = useCallback(async (values: any) => {
    try {
      setLoading(true);
      const data = await CourierControllers.courierCreds(values);
      toast.success(data?.message);
      await getCourierKeys();
      return data;
    } catch (error: any) {
      console.error("Failed to load couriers:", error);
      toast.error("Failed to add courier. Please try again.");
      return error;
    } finally{
      setLoading(false);
    }
  }, []);

  const deleteCourierKeys = useCallback(async (id: String) => {
    try {
      setLoading(true);
      const data = await CourierControllers.removeCourierCreds(id);
      await getCourierKeys();
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.error("Failed to remove courier creds:", error);
      toast.error("Failed to remove courier creds!");
      return error;
    } finally{
      setLoading(false);
    }
  }, []);

  const defaultCouriers = useCallback(async (id: String, values: any) => {
    try {
      setLoading(true);
      const data = await CourierControllers.defaultCourier(id, values);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.error("Failed to remove courier creds:", error);
      toast.error("Failed to remove courier creds!");
      return error;
    } finally{
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    getCourier,
    editCourier,
    deleteCourier,
    createCourier,
    addCourierKeys,
    getCourierKeys,
    defaultCouriers,
    deleteCourierKeys,
  };
};
