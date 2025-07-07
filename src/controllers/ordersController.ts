import { ParamsType } from "@/types";
import { apiRequest } from "./apiController";

class OrdersController {
  static getAllOrders(queryParams: ParamsType) {
    return apiRequest(
      "get",
      `/api/orders/get?status=${queryParams?.status}&page=${queryParams?.page}&limit=${queryParams?.limit}&payment=${queryParams?.payment}`
    );
  }
  static getBookedOrders() {
    return apiRequest("get", `/api/orders/booking/get`);
  }
  static createOrder(data: any) {
    return apiRequest("post", `/api/orders/create`, data);
  }
  static updateShipmentDetails(id: String, data: any) {
    return apiRequest("put", `/api/orders/update/${id}`, data);
  }
  static updateOrderStatus(id: String, status: String) {
    return apiRequest("put", `/api/orders/status/update/${id}`, status);
  }
  static orderBooking(data: any) {
    return apiRequest("post", `/api/orders/booking`, data);
  }
  static orderDelete(id: String) {
    return apiRequest("delete", `/api/orders/delete/${id}`);
  }
  static dashboradData() {
    return apiRequest("get", "/api/orders/dashboard-stats");
  }
}

export default OrdersController;