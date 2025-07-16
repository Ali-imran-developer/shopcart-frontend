import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { Text } from "rizzui";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";

const columnHelper = createColumnHelper<any>();
export const ordersColumns = () => {
  const columns = [
    columnHelper.display({
      id: "orderName",
      size: 120,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold ms-3">{row?.original?.orderName ?? ""}</Text>
      ),
    }),
    columnHelper.display({
      id: "transactionId",
      size: 120,
      header: "Transaction Id",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold">{row?.original?.transactionId ?? ""}</Text>
      ),
    }),
    columnHelper.display({
      id: "amount",
      size: 120,
      header: "Order Amount",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold text-gray-700 ms-3">
          Rs. {row?.original?.amount ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "customerName",
      size: 120,
      header: "Customer",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold text-gray-700">
          {row?.original?.customerName ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "date",
      size: 120,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.date ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "ordersItems",
      size: 100,
      header: "Order Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {row?.original?.ordersItems ?? 0} Products
        </Text>
      ),
    }),
    columnHelper.display({
      id: "totalReceived",
      size: 100,
      header: "Total",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.totalReceived ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
  ];

  return columns;
};
