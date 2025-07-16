import { ordersColumns } from "./columns";
import Table from "@shared/components/table/table";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect, useMemo, useState } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { cn, Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import TablePagination from "@/components/shared/components/table/pagination";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useOrders } from "@/hooks/order-hook";
import OrdersController from "@/controllers/ordersController";
import toast from "react-hot-toast";

export default function PaymentTable() {
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [payments, setPayments] = useState<any>([]);
  const { updateParams, params } = useQueryParams();
  const queryParams = useMemo(() => {
    return {
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
    };
  }, [params]);
  const { isLoading } = useOrders();

  useEffect(() => {
      OrdersController.paymentData(queryParams)
        .then((data) => setPayments(data))
        .catch((error) => toast.error(error?.message));
  }, []);

  const { table, setData, setColumns } = useTanStackTable({
    tableData: ensureArray(payments?.transactions),
    columnConfig: ordersColumns(),
    options: {
      initialState: {},
      meta: {
        handleSelectRow: (row) => {
          if (expandedRowId === row?.original?._id) {
            setExpandedRowId(null);
          } else {
            setExpandedRowId(row?.original?._id);
          }
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  const transactions = useMemo(() => ensureArray(payments?.transactions), [payments?.transactions]);
  useEffect(() => {
    setData(transactions);
    setExpandedRowId(null);
  }, [transactions]);

  useEffect(() => {
    setColumns(ordersColumns());
  }, [expandedRowId]);

  return (
    <div className="rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2">
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
        expandedRowId={expandedRowId}
        showLoadingText={isLoading}
        isLoading={isLoading}
        classNames={{
          container:
            "border border-muted rounded-md border-t-0 mt-4 max-h-[380px] overflow-y-auto",
          rowClassName: "last:border-0",
        }}
        components={{
          expandedComponent: (row) => (
            <CustomExpandedComponent row={row} table={table} />
          ),
        }}
      />
      <TableFooter table={table} />
      <TablePagination
        table={table}
        currentPage={queryParams?.page}
        totalPages={
          Math?.ceil(payments?.totalPayments / queryParams?.limit) ?? 0
        }
        updateParams={updateParams}
        className={cn("py-4")}
      />
    </div>
  );
}
