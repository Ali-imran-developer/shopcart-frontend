import { apiRequest } from "./apiController";

class categoriesController {
  static fetchAllCategory() {
    return apiRequest("get", "/api/categories/get");
  }
  static addNewCategory(data: any) {
    return apiRequest("post", "/api/categories/create", data);
  }
  static editCategory(data: any, id: string) {
    return apiRequest("put", `/api/categories/update/${id}`, data);
  }
  static deleteCategory(id: string) {
    return apiRequest("delete", `/api/categories/delete/${id}`);
  }
  static deleteSubCategory(categoryId: string, subCategoryId: string) {
    return apiRequest("delete", `/api/subcategories/delete/${categoryId}/${subCategoryId}`);
  }
}

export default categoriesController;