import StripePayment from "@/view/stripe-payment/stripe-payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const VITE_STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
const stripePromise = loadStripe(VITE_STRIPE_KEY);

const CheckoutPage = () => {
  const amount = 45000;
  const email = "zahidGill@gmail.com";
  const orderId = "S1035";

  return (
    <div className="min-h-screen bg-gray-50">
      <Elements stripe={stripePromise}>
        <StripePayment amount={amount} email={email} orderId={orderId} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;