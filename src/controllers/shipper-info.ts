import { apiRequest } from "./apiController";

class ShipperInfoController {
  static addShipperInfo(data: any) {
    return apiRequest("post", "/api/shipperinfo/create", data);
  }
  static removeShipperInfo(id: String) {
    return apiRequest("delete", `/api/shipperinfo/delete/${id}`);
  }
  static editShipperInfo(payload: any, id: String) {
    return apiRequest("put", `/api/shipperinfo/update/${id}`, payload);
  }
  static getAllShipperInfo() {
    return apiRequest("get", `/api/shipperinfo/get`);
  }
}

export default ShipperInfoController;