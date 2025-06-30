import { Drawer, Title } from "rizzui";
import CheckoutPage from "./checkout";

const PaymentDrawer = ({ isDrawerOpen, closeDrawer, formik }: any) => {

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>  
      <CheckoutPage formik={formik} closeDrawer={closeDrawer} />
    </Drawer>
  );
};

export default PaymentDrawer;