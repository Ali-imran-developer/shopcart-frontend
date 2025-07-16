import { apiRequest } from "./apiController";

class ProductController {
  static getAllProducts(queryParams: any) {
    return apiRequest("get", `/api/products/get?page=${queryParams?.page}&limit=${queryParams?.limit}&status=${queryParams?.status}`);
  }
  static createProduct(data: any) {
    return apiRequest("post", "/api/products/create", data);
  }
  static updateProduct(data: any, id: any) {
    return apiRequest("put", `/api/products/update/${id}`, data);
  }
  static deleteProduct(id: string) {
    return apiRequest("delete", `/api/products/delete/${id}`);
  }
}

export default ProductController;