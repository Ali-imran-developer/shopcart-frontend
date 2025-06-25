import { apiRequest } from "./apiController";

class CustomerControllers {
  static fetchAllCustomers() {
    return apiRequest("get", "/api/customer/get");
  }
  static addNewCustomer(data: any) {
    return apiRequest("post", "/api/customer/create", data);
  }
  static editCustomers(id: String, data: any) {
    return apiRequest("put", `/api/customer/update/${id}`, data);
  }
  static deleteCustomers(id: String) {
    return apiRequest("delete", `/api/customer/delete/${id}`);
  }
}

export default CustomerControllers;