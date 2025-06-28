import { apiRequest } from "./apiController";

class StripeController {
  static createStripeUrl(data: any) {
    return apiRequest("post", `/api/stripe/create-payment-intent`, data);
  }
}

export default StripeController;