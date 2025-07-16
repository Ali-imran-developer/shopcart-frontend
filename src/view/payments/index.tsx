import PageHeader from "@/components/shared/page-header";
import PaymentTable from "./components/table";

const pageHeader = {
  title: "Payments",
  breadcrumb: [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Payments",
    },
  ],
};

const Payments = () => {

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <PaymentTable />
      </div>
    </div>
  );
};

export default Payments;