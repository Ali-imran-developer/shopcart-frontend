import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShipperInfoController from "@/controllers/shipper-info";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";

interface ShipperInfoType {
  _id?: string;
  labelStoreName?: string;
  phoneNumber?: string;
  locationName?: string;
  city?: string;
  returnAddress?: string;
  address?: string;
  storeId: string;
}

export const useShipperData = () => {
  const [shippers, setShippers] = useState<ShipperInfoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchShippers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.getAllShipperInfo();
      setShippers(response?.shipper);
    } catch (error) {
      console.error("Error fetching shippers:", error);
      toast.error("Failed to fetch shippers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addShipper = useCallback(async (values: ShipperInfoType, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.addShipperInfo(values);
      setShippers((prev) => [...prev, response]);
      toast.success("Shipper added successfully!");
      navigate(routes.orders.shipperInfo);
    } catch (error) {
      console.error("Error adding shipper:", error);
      callback?.("error", error);
      toast.error("Failed to add shipper");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateShipper = useCallback(async (values: ShipperInfoType, id: String, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.editShipperInfo(values, id);
      setShippers((prev) => prev.map((item) => (item._id === values._id ? response : item)));
      callback?.("success", response);
      toast.success("Shipper updated successfully!");
      navigate(routes.orders.shipperInfo);
    } catch (error) {
      console.error("Error updating shipper:", error);
      callback?.("error", error);
      toast.error("Failed to update shipper");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteShipper = useCallback(async (shipperId: string, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      await ShipperInfoController.removeShipperInfo(shipperId);
      setShippers((prev) => prev.filter((item) => item._id !== shipperId));
      callback?.("success");
      toast.success("Shipper deleted successfully!");
    } catch (error) {
      console.error("Error deleting shipper:", error);
      callback?.("error", error);
      toast.error("Failed to delete shipper");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    shippers,
    isLoading,
    fetchShippers,
    addShipper,
    updateShipper,
    deleteShipper,
  };
};
