import { apiRequest } from "./apiController";

class ResaleController {
  static getAllResaleProduct() {
    return apiRequest("get","/api/resale/getListed/all");
  }
  static createResaleProduct(data: any) {
    return apiRequest("post", "/api/resale/listed", data);
  }
  static getResaleProduct(queryParams: any) {
    console.log("controller", queryParams);
    return apiRequest("get", `/api/resale/getListed/mine?page=${queryParams?.page}&limit=${queryParams?.limit}&isListed=${queryParams?.isListed}`);
  }
}

export default ResaleController;