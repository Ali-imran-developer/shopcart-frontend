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

  const { isLoading, handleOrdersBooking, handleUpdateDispatchStatus } = useOrders(queryParams);
  const handleFilterApply = () => {
    updateParams({ payment: paymentStatus, page: 1 });
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}/>
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
          bookingOrder={handleOrdersBooking}
          dispatchOrder={handleUpdateDispatchStatus}
        />
      </div>
    </>
  );
}
