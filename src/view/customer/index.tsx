import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import CustomerTable from "./customer-list/table";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@config/site.config";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect, useMemo, useState } from "react";
import { useCustomer } from "@/hooks/customer-hook";
import { useQueryParams } from "@/hooks/useQueryParams";

export const metadata = {
  ...metaObject("Customer"),
};

const pageHeader = {
  title: "Customer",
};

export default function CustomerDetail() {
  const [open, setOpen] = useState(false);
  const { updateParams, params } = useQueryParams();
  const queryParams = useMemo(() => {
    return {
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
    };
  }, [params]);
  const { isLoading } = useCustomer(queryParams);
  const { customerData } = useAppSelector((state) => state?.Customer);

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            as="span"
            className="w-full @lg:w-auto cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Customer
          </Button>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <CustomerTable
          open={open}
          setOpen={setOpen}
          data={customerData}
          isDataLoaded={isLoading}
          page={queryParams?.page}
          limit={queryParams?.limit}
          updateParams={updateParams}
        />
      </div>
    </>
  );
}
