import { apiRequest } from "./apiController";

class ProfileController {
  static fetchProfile() {
    return apiRequest("get", `/api/profile/get`);
  }
  static addNewProfile(data: any) {
    return apiRequest("post", `/api/profile/create`, data);
  }
  static editProfile(data: any, id: string) {
    return apiRequest("put", `/api/profile/update/${id}`, data);
  }
}

export default ProfileController;