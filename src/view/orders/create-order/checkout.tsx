import StripePayment from "@/view/stripe-payment/stripe-payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const VITE_STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
const stripePromise = loadStripe(VITE_STRIPE_KEY);

const CheckoutPage = ({ formik, closeDrawer, prepaid }: any) => {
  return (
    <>
      {prepaid && (
        <Elements stripe={stripePromise}>
          <StripePayment formik={formik} closeDrawer={closeDrawer} />
        </Elements>
      )}
    </>
  );
};

export default CheckoutPage;