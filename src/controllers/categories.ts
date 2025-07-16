import { apiRequest } from "./apiController";

class categoriesController {
  static fetchAllCategory(queryParams: any) {
    return apiRequest("get", `/api/categories/get?page=${queryParams?.page}&limit=${queryParams?.limit}`);
  }
  static getPublicCategory(queryParams: any) {
    return apiRequest("get", `/api/categories/get/public?page=${queryParams?.page}&limit=${queryParams?.limit}`);
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