import { Drawer, Title } from "rizzui";
import CheckoutPage from "./checkout";

const PaymentDrawer = ({ isDrawerOpen, closeDrawer, formik, prepaid }: any) => {
  return (
    <>
      {prepaid && (
        <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
          <CheckoutPage
            formik={formik}
            closeDrawer={closeDrawer}
            prepaid={prepaid}
          />
        </Drawer>
      )}
    </>
  );
};

export default PaymentDrawer;