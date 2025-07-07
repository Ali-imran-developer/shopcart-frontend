import { useNavigate } from "react-router-dom";
import { routes } from "@config/routes";
import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import OrdersTable from "./order-list/table";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@config/site.config";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useMemo, useState } from "react";
import { useOrders } from "@/hooks/order-hook";
import { ParamsType } from "@/types";

export const metadata = {
  ...metaObject("Orders"),
};

const pageHeader = {
  title: "Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Orders",
    },
  ],
};

export default function ConfirmOrdersPage() {
  const navigate = useNavigate();
  const { updateParams, params } = useQueryParams();
  const [activeTab, setActiveTab] = useState<string>("open");
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
        <div className="mt-4 flex items-center cursor-pointer lg:gap-3 gap-1 @lg:mt-0 flex-wrap">
          <Button
            as="span"
            className="@lg:w-auto cursor-pointer"
            onClick={() => navigate(routes?.orders?.createOrder)}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Order
          </Button>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <OrdersTable
          className=""
          isLoading={isLoading}
          setUpdateParams={updateParams}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          page={queryParams?.page}
          limit={queryParams?.limit}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          onFilterApply={handleFilterApply}
        />
      </div>
    </>
  );
}
