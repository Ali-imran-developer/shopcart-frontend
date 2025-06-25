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
import { useOrders } from "@/hooks/order-hook";

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
    value: "cancel",
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
  variant = "modern",
  hideFilters = false,
  hidePagination = false,
}) {
  const navigate = useNavigate();
  const { orderData } = useAppSelector((state) => state.Orders);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const { handleGetOrders, handleUpdateDispatchStatus, handleDeleteOrders, isLoading } = useOrders();

  const filteredOrders = useMemo(() => {
    const options = filterOptions.reduce((acc, item) => {
      acc[item.value] = item.label.toLowerCase();
      return acc;
    }, {});
    return ensureArray(orderData?.orders).filter(
      (order) => order.status === options[activeTab]
    );
  }, [orderData?.orders, activeTab]);

  const { table, setData, setColumns } = useTanStackTable({
    tableData: filteredOrders,
    columnConfig: ordersColumns({ expandedRowId, handleDeleteOrders }),
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
    handleGetOrders();

  }, []);

  useEffect(() => {
    setData(filteredOrders);
    setExpandedRowId(null);

  }, [filteredOrders]);

  useEffect(() => {
    setColumns(ordersColumns({ expandedRowId, handleDeleteOrders }));

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
          handleUpdateDispatchStatus(item?._id, {status: item?.status})
        )
      );
      toast.success(response.message || "Status updated successfully");
      await handleGetOrders();
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
        <TabList
          tabs={filterOptions}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          selectTab={selectTab}
        />
        <Table
          table={table}
          activeTab={activeTab}
          variant={variant}
          expandedRowId={expandedRowId}
          showLoadingText={isLoading}
          isLoading={isLoading}
          data={filteredOrders}
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
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
