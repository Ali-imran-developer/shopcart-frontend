import { apiRequest } from "./apiController";

class StoreController {
  static getStore() {
    return apiRequest("get", "/api/store/get");
  }
  static updateStore(id: String, data: any) {
    return apiRequest("put", `/api/store/update/${id}`, data);
  }
}

export default StoreController;
