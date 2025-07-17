import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import { Input, TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { CustomerColumn } from "./columns";
import CustomerDrawer from "../drawer";
import TablePagination from "@shared/components/table/pagination";
import { useCustomer } from "@/hooks/customer-hook";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default function CustomerTable({
  className,
  variant = "modern",
  hidePagination = false,
  data,
  open,
  page,
  limit,
  updateParams,
  setOpen,
  isDataLoaded,
}: {
  className?: string;
  data: any;
  open: any;
  page: any;
  limit: any;
  updateParams: any;
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
          pageSize: 10,
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
        <div className="flex items-end justify-end">
          <Input
            type="search"
            placeholder="Search by name..."
            value={table.getState().globalFilter ?? ""}
            onClear={() => table.setGlobalFilter("")}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
        </div>
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
        <TablePagination
          table={table}
          currentPage={page}
          totalPages={Math?.ceil(data?.totalCustomers / limit) ?? 0}
          updateParams={updateParams}
          className={cn("py-4")}
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
