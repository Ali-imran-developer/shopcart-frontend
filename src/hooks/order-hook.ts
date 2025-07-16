import { useCallback, useEffect, useState } from "react";
import { CALLBACK_STATUS } from "../config/enums";
import { useAppDispatch } from "./store-hook";
import toast from "react-hot-toast";
import OrdersController from "@/controllers/ordersController";
import { setBookedOrders, setDashboardData, setOrders, setPaymentData } from "@/store/slices/ordersSlice";
import { ParamsType } from "@/types";

export const useOrders: any = (queryParams: ParamsType) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await OrdersController.getAllOrders(queryParams);
      dispatch(setOrders(data));
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    if (queryParams?.status || queryParams?.page || queryParams?.limit || queryParams?.payment){
      handleGetOrders();
    }
  }, [queryParams?.status, queryParams?.page, queryParams?.limit, queryParams?.payment]);

  const handleAddOrders = useCallback(
    async (values: any, callback: (status: any, value: any) => void) => {
      try {
        const response: any = await OrdersController.createOrder(values);
        toast.success(response.message);
        // response && dispatch(setOrders(response));
        // callback && callback(CALLBACK_STATUS.SUCCESS, response);
        return response;
      } catch (error: any) {
        toast.error(error.message);
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  const handleUpdateShipmentDetails = useCallback(
    async (id: String, values: any, callback: (status: any, value: any) => void
    ) => {
      try {
        setIsLoading(true);
        const response: any = await OrdersController.updateShipmentDetails(id, values);
        // response && dispatch(setOrders(response));
        callback && callback(CALLBACK_STATUS.SUCCESS, response);
        return response;
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
        return null;
      } finally {
        setIsLoading(false);
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  const handleDeleteOrders = useCallback(async (id: string) => {
    try {
      const data: any = await OrdersController.orderDelete(id);
      toast.success(data?.response ?? "Product Delete Successfully");
      // await handleGetOrders();
    } catch (error) {
      console.log("@Error", error);
    }
  }, []);

  const getPayments = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await OrdersController.paymentData(queryParams);
      dispatch(setPaymentData(data));
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally{
      setIsLoading(false);
    }
  }, []);

  const handleUpdateDispatchStatus = useCallback(
    async (id: String, status: any, callback: (status: any, value: any) => void
    ) => {
      try {
        const response: any = await OrdersController.updateOrderStatus(id, status);
        // response && dispatch(setOrders(response));
        callback && callback(CALLBACK_STATUS.SUCCESS, response);
        return response;
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    }, []);

  const handleGetBookedOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await OrdersController.getBookedOrders();
      dispatch(setBookedOrders(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOrdersBooking = useCallback(
    async (values: any, callback: (status: any, value: any) => void) => {
      try {
        const response: any = await OrdersController.orderBooking(values);
        response && dispatch(setBookedOrders(response));
        await OrdersController.getAllOrders(queryParams);
        callback && callback(CALLBACK_STATUS.SUCCESS, response);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
        }
        finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
        }
    }, []);

  const handleDashboradStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await OrdersController.dashboradData();
      dispatch(setDashboardData(data));
      return data;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    getPayments,
    handleGetOrders,
    handleAddOrders,
    handleDeleteOrders,
    handleOrdersBooking,
    handleDashboradStats,
    handleGetBookedOrders,
    handleUpdateDispatchStatus,
    handleUpdateShipmentDetails,
  };
};
