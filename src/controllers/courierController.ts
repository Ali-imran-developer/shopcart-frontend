import { apiRequest } from "./apiController";

class CourierControllers {
  static createCourier(data: any) {
    return apiRequest("post", "/api/courier/create", data);
  }
  static getCourier() {
    return apiRequest("get", "/api/courier/get");
  }
  static deleteCourier(id: String) {
    return apiRequest("delete", `/api/courier/delete/${id}`);
  }
  static editCourier(id: String, data: any) {
    return apiRequest("put", `/api/courier/update/${id}`, data);
  }
  static courierCreds(data: any) {
    return apiRequest("post", `/api/courier/creds`, data);
  }
  static getCourierCreds() {
    return apiRequest("get", `/api/courier/get-creds`);
  }
  static removeCourierCreds(id: String) {
    return apiRequest("delete", `/api/courier/creds/${id}`);
  }
  static defaultCourier(id: String, data: any) {
    return apiRequest("put", `/api/courier/creds/default/${id}`, data);
  }
}

export default CourierControllers;
