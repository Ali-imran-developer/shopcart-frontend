import { apiRequest } from "./apiController";

class categoriesController {
  static fetchAllCategory() {
    return apiRequest("get", "/api/categories/get");
  }
}

export default categoriesController;