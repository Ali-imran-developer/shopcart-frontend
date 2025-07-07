import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import OrdersTable from "./order-list/table";
import { PiPlusBold } from "react-icons/pi";
// import { orderData } from "@data/order-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ParamsType } from "@/types";
import { useOrders } from "@/hooks/order-hook";

export const metadata = {
  ...metaObject("Dispatch Orders"),
};

const pageHeader = {
  title: "Dispatch Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dispatch Orders",
    },
  ],
};

export default function ConfirmOrdersPage() {
  const [isOrderData, setIsOrderData] = useState(false);
  const { updateParams, params } = useQueryParams();
  const [activeTab, setActiveTab] = useState<string>("confirmed");
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  const queryParams: ParamsType = useMemo(() => {
    return {
      payment: params.get("payment") || paymentStatus,
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
      status: params.get("status") || activeTab,
    };
  }, [params, activeTab]);

  const { isLoading } = useOrders(queryParams);
  const handleFilterApply = () => {
    updateParams({ payment: paymentStatus, page: 1 });
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={[]}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Link
            to={isOrderData ? "/load-sheets" : "#"}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="@lg:w-auto" disabled={!isOrderData}>
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create LoadSheet
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <OrdersTable
          isLoading={isLoading}
          setUpdateParams={updateParams}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          page={queryParams?.page}
          limit={queryParams?.limit}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          onFilterApply={handleFilterApply}
          onDataChange={setIsOrderData}
        />
      </div>
    </>
  );
}
