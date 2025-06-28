import { useCallback, useState } from "react";
import { CALLBACK_STATUS } from "../config/enums";
import { useAppDispatch } from "./store-hook";
import toast from "react-hot-toast";
import OrdersController from "@/controllers/ordersController";
import { setBookedOrders, setDashboardData, setOrders } from "@/store/slices/ordersSlice";

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await OrdersController.getAllOrders();
      dispatch(setOrders(data));
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      await handleGetOrders();
    } catch (error) {
      console.log("@Error", error);
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
