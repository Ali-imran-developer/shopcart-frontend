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
  static forgetPassword(data: any) {
    return apiRequest("post", "/api/forgot-password", data);
  }
  static verifyCode(data: any) {
    return apiRequest("post", "/api/verify-code", data);
  }
  static resetPassword(data: any) {
    return apiRequest("post", "/api/reset-password", data);
  }
}

export default LoginController;