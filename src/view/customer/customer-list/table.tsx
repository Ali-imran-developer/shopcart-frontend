import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { CustomerColumn } from "./columns";
import CustomerDrawer from "../drawer";
import { useCustomer } from "@/hooks/customer-hook";

export default function CustomerTable({
  className,
  variant = "modern",
  hidePagination = false,
  data,
  open,
  setOpen,
  isDataLoaded,
}: {
  className?: string;
  data: any;
  open: any;
  setOpen: any;
  isDataLoaded: any;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const [ customerData, setCustomerData ] = useState();
  const { handleDeleteCustomer } = useCustomer();

  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(data?.customer),
    columnConfig: CustomerColumn({ handleDeleteCustomer }),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
        columnPinning: {
          left: ["expandedHandler"],
          right: ["action"],
        },
      },
      meta: {
        handleCustomerRow : (row: any) => {
          setOpen(true);
          setCustomerData(row);
        },
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(data?.customer));

  }, [data?.customer]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4", className)}>
        <Table
          table={table}
          variant={variant}
          showLoadingText={isDataLoaded}
          isLoading={isDataLoaded}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
      </div>

      <CustomerDrawer
        isDrawerOpen={open}
        closeDrawer={() => setOpen(false)}
        customerData={customerData}
      />
    </>
  );
}
