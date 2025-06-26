import { apiRequest } from "./apiController";

class LoginController {
  static login(data: any) {
    return apiRequest("post", "/api/login", data);
  }
  static register(data: any) {
    return apiRequest("post", "/api/register", data);
  }
  static updateUser(id: String ,data: any) {
    return apiRequest("put", `/api/update/${id}`, data);
  }
}

export default LoginController;