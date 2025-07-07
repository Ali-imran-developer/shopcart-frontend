import { ordersColumns } from "./columns";
import Table from "@shared/components/table/table";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import cn from "@/utils/helperFunctions/class-names";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect, useState, useMemo } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { routes } from "@/config/routes";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { TabList } from "@/components/shared/tabs";
import toast from "react-hot-toast";
import OrdersController from "@/controllers/ordersController";
import Filters from "@/view/orders/order-list/filters";
import { Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const filterOptions = [
  {
    value: "open",
    label: "Open",
    buttons: [
      { title: "Confirmed", className: "text-green-dark" },
      { title: "Pending", className: "" },
      { title: "Cancelled", className: "text-red-dark" },
    ],
  },
  {
    value: "pending",
    label: "Pending",
    buttons: [
      { title: "Confirmed", className: "text-green-dark" },
      { title: "Pending", className: "" },
      { title: "Cancelled", className: "text-red-dark" },
    ],
  },
  {
    value: "cancelled",
    label: "Cancelled",
    buttons: [
      { title: "Confirmed", className: "text-green-dark" },
      { title: "Pending", className: "" },
      { title: "Cancelled", className: "text-red-dark" },
    ],
  },
];

export default function OrderTable({
  className,
  isLoading,
  page,
  limit,
  paymentStatus,
  setPaymentStatus,
  onFilterApply,
  setUpdateParams,
  activeTab,
  setActiveTab,
  variant = "modern",
  hideFilters = false,
  hidePagination = false,
}) {
  const navigate = useNavigate();
  const { orderData } = useAppSelector((state) => state.Orders);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  const { table, setData, setColumns } = useTanStackTable({
    tableData: ensureArray(orderData?.orders),
    columnConfig: ordersColumns({ expandedRowId }),
    options: {
      initialState: {},
      meta: {
        handleSelectedRow: (row) => {
          console.log("@row", row);
          navigate(routes.orders.createOrder(row._id), {
            state: { selectedOrder: row },
          });
        },
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

  useEffect(() => {
    table.resetExpanded();
    table.resetRowSelection();
  }, [activeTab]);

  useEffect(() => {
    setData(ensureArray(orderData?.orders));
    setExpandedRowId(null);
  }, [ensureArray(orderData?.orders)]);

  useEffect(() => {
    setColumns(ordersColumns({ expandedRowId }));
  }, [expandedRowId]);

  useEffect(() => {
    const getStatusButton = filterOptions.find(
      (item) => item?.value === activeTab
    );
    setSelectedStatus(getStatusButton);
  }, [activeTab]);

  const selectTab = (nextTab) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
    setUpdateParams({ status: nextTab, page: 1 });
  };

  const handleStatusChange = async (checkedItems, status, row) => {
    try {
      setLoading(status);
      let hasStatusUpdate =
        checkedItems?.length >= 1
          ? checkedItems?.map((obj) => ({
              ...obj,
              status: status?.toLowerCase(),
            }))
          : [{ ...row?.original, status: status?.toLowerCase() }];

      const response = await Promise.all(
        hasStatusUpdate.map((item) =>
          OrdersController.updateOrderStatus(item?._id, {
            status: item?.status,
          })
        )
      );
      toast.success(response.message || "Status updated successfully");
      setData((prev) =>
        ensureArray(prev)?.filter(
          (order) =>
            !hasStatusUpdate?.some((updated) => updated?._id === order?._id)
        )
      );
      table.resetRowSelection();
      table.resetExpanded();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Failed to update status");
    } finally {
      setLoading("");
    }
  };

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2", className)}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <TabList
              setSelectedStatus={setSelectedStatus}
              tabs={filterOptions}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              selectTab={selectTab}
              className="ms-2"
            />
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
          <Filters
            table={table}
            isLoading={isLoading}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            onFilterApply={onFilterApply}
          />
        </div>
        <Table
          table={table}
          activeTab={activeTab}
          variant={variant}
          expandedRowId={expandedRowId}
          showLoadingText={isLoading}
          isLoading={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
          components={{
            expandedComponent: (row) => (
              <CustomExpandedComponent
                row={row}
                table={table}
                selectedStatus={selectedStatus}
                isLoading={loading}
                handleStatusChange={handleStatusChange}
              />
            ),
          }}
        />
        <TableFooter
          table={table}
          buttons={selectedStatus}
          isLoading={loading}
          handleStatusChange={handleStatusChange}
        />
        <TablePagination
          table={table}
          currentPage={page}
          totalPages={Math?.ceil(orderData?.totalOrders / limit) ?? 0}
          updateParams={setUpdateParams}
          className={cn("py-4")}
        />
      </div>
    </>
  );
}
