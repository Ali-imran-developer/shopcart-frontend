import {
  bookedOrdersColumns,
  cancelledOrders,
  confirmOrdersColumns,
} from "./columns";
import Table from "@shared/components/table/table";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { Input, TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { TabList } from "@/components/shared/tabs";
import {
  SetStateAction,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import toast from "react-hot-toast";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { generateShippingLabelPDF } from "../labelPrint";
import { useOrders } from "@/hooks/order-hook";
import { useShipperData } from "@/hooks/shipper-hook";
import { useCouriers } from "@/hooks/courier-hook";
import Filters from "@/view/orders/order-list/filters";

const filterOptions = [
  {
    value: "confirmed",
    label: "Confirmed",
    buttons: [
      { title: "Booked", className: "text-green-dark" },
      { title: "Cancelled", className: "text-red" },
    ],
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "booked",
    label: "Booked",
    buttons: [{ title: "Download Label", className: "text-green-dark" }],
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
  getOrders,
  dispatchOrder,
  bookingOrder,
  variant = "modern",
  hideFilters = false,
  hidePagination = false,
  onDataChange,
}: {
  isLoading?: any;
  page?: any;
  limit?: any;
  paymentStatus?: any;
  setPaymentStatus?: any;
  onFilterApply?: any;
  setUpdateParams?: any;
  activeTab?: any;
  setActiveTab?: any;
  className?: string;
  getOrders?: any;
  bookingOrder?: any;
  dispatchOrder?: any;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
  onDataChange?: (hasData: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderData } = useAppSelector((state) => state?.Orders);
  const { courierCreds } = useAppSelector((state) => state?.Courier);
  const [selectedCouriers, setSelectedCouriers] = useState<{ [key: string]: any }>({});
  const [selectedMethod, setSelectedMethod] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedShipper, setSelectedShipper] = useState();
  const [loading, setLoading] = useState("");
  const [ordersData, setOrderData] = useState<any>([]);
  const { fetchShippers, shippers } = useShipperData();
  const { getCourierKeys } = useCouriers();

  useEffect(() => {
    getCourierKeys();
    fetchShippers();
  }, []);

  useEffect(() => {
    const updatedOrders = ensureArray(orderData?.orders)?.map((order: any) => {
      const shippersData = ensureArray(shippers)?.filter((shipper: any) => {
        return shipper?.user === order?.user;
      });
      const shipperInfo = ensureArray(shippersData)?.map((shipper: any) => {
        return {
          shipperId: shipper?._id ?? null,
          shipperCity: shipper?.city ?? null,
        };
      });
      const courierInfo = ensureArray(courierCreds?.creds)?.map(
        (courier: any) => ({
          courierId: courier?.courier ?? null,
          courierName: courier?.couriersname ?? "",
          logo: courier?.logo ?? "",
          defaultCourier: courier?.isDefault ?? false,
        })
      );
      return {
        ...order,
        shipperInfo: shipperInfo.length ? shipperInfo : [],
        courierInfo: courierInfo?.length ? courierInfo : [],
      };
    });
    setOrderData(updatedOrders);
  }, [orderData?.orders, shippers, courierCreds?.creds]);

  const [expandedRowId, setExpandedRowId] = useState<any>(null);
  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(ordersData),
    columnConfig: [],
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleSelectedValue: (rowId: string, selectedCourier: { value: string, label: string }) => {
          try {
            setSelectedCouriers((prev) => ({
              ...prev,
              [rowId]: selectedCourier,
            }));
            console.log("selectedCourier", selectedCourier?.label);
          } catch (error: any) {
            console.error("Error updating selected courier:", error);
          }
        },
        handleSelectRow: (row) => {
          if (expandedRowId === row?.original?._id) {
            setExpandedRowId(null);
          } else {
            setExpandedRowId(row?.original?._id);
          }
        },
        handlePrintOrderSlip: (row: any) => {
          generateShippingLabelPDF([row]);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(ordersData));
    setExpandedRowId(null);
  }, [ordersData]);

  useEffect(() => {
    if (activeTab === "booked") {
      setColumns(bookedOrdersColumns({ expandedRowId }));
    } else if (activeTab === "confirmed") {
      setColumns(
        confirmOrdersColumns({
          ordersData,
          navigate,
          expandedRowId,
          dispatch,
          setSelectedCouriers,
          setSelectedMethod,
          setSelectedShipper,
        })
      );
    } else {
      setColumns(cancelledOrders({ expandedRowId }));
    }
  }, [expandedRowId, courierCreds?.creds, shippers, activeTab]);

  useEffect(() => {
    const getStatusButton: any = filterOptions.find(
      (item: { value?: string }) => item.value === activeTab
    );
    setSelectedStatus(getStatusButton);
  }, [activeTab]);

  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
  };

  const handleStatusChange = async (
    checkedItems: any[],
    status: SetStateAction<string>,
    row: { original: any }
  ) => {
    // const orderData = row?.original;
    // const initialValues = {
    //   orderId: orderData?._id,
    //   userId: orderData?.user,
    //   courierId: selectedCouriers,
    //   shipmentType: selectedMethod,
    //   shipperId: selectedShipper,
    // };
    try {
      setLoading(status);
      if (status === "Booked") {
        // console.log("initialValues", initialValues, checkedItems);
        try {
          const selectedOrders =
            checkedItems?.length >= 1 ? checkedItems : [row?.original];
          const bookingPromises = selectedOrders.map((orderData: any) => {
            const initialValues = {
              orderId: orderData?._id,
              userId: orderData?.user,
              courierId: selectedCouriers,
              shipmentType: selectedMethod,
              shipperId: selectedShipper,
            };
            return new Promise((resolve) => {
              bookingOrder(initialValues, (status: any, result: any) => {
                if (status === "success") {
                  toast.success(result?.message);
                } else if (status === "error") {
                  toast.error(result?.message || "Something went wrong");
                }
                resolve({ status, result, _id: orderData?._id });
              });
            });
          });
          const results: any[] = await Promise.all(bookingPromises);
          setData((prev) => ensureArray(prev)?.filter((order) => !results.some((res) => res?.status === "success" && res?._id === order?._id)));
        } catch (error: any) {
          console.log("error", error);
          toast.error(error?.message || "Something went wrong");
        }
      } else if (status === "Cancelled") {
        try {
          let hasStatusUpdate =
            checkedItems?.length >= 1
              ? checkedItems?.map((obj) => ({
                  ...obj,
                  status: status?.toLowerCase(),
                }))
              : [{ ...row?.original, status: status?.toLowerCase() }];
          const response: any = await Promise.all(
            hasStatusUpdate.map((item) =>
              dispatchOrder(
                item._id,
                { status: item.status },
                (status: any, result: any) => {
                  if (status === "success") {
                    console.log(result?.message);
                  } else if (status === "error") {
                    console.log(result?.message);
                  }
                }
              )
            )
          );
          ensureArray(response)?.forEach((res) => {
            if (res?.message) {
              toast.success(res.message);
            }
          });
          setData((prev) =>
            ensureArray(prev)?.filter(
              (order) =>
                !hasStatusUpdate?.some((updated) => updated?._id === order?._id)
            )
          );
        } catch (error: any) {
          console.log("error", error);
          toast.error(error.message || "Failed to update status");
        }
      } else if (status === "Download Label") {
        let selectedOrders: any[] =
          checkedItems?.length >= 1 ? checkedItems : [{ ...row?.original }];
        try {
          generateShippingLabelPDF(selectedOrders);
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading("");
      table.resetRowSelection();
      table.resetExpanded();
    }
  };

  useEffect(() => {
    table.resetExpanded();
    table.resetRowSelection();
  }, [activeTab]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4", className)}>
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
          variant={variant}
          expandedRowId={expandedRowId}
          showLoadingText={isLoading}
          isLoading={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4 max-h-[360px] overflow-y-auto",
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
