import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Text } from "rizzui";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const columnHelper = createColumnHelper();
export const ordersColumns = ({ expandedRowId }) => {
  const columns = [
    columnHelper.display({
      id: "expandedHandler",
      size: 60,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <>
          {row.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
    columnHelper.display({
      id: "select",
      size: 50,
      header: ({ table }) => (
        <Checkbox
          className="ps-0"
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          onChange={() => table.toggleAllPageRowsSelected()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="ps-0"
          aria-label="Select row"
          checked={row.getIsSelected()}
          onChange={() => row.toggleSelected()}
        />
      ),
    }),
    columnHelper.accessor("_id", {
      id: "id",
      size: 140,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.name ?? ""}</>,
    }),
    columnHelper.accessor("shipmentDetails.name", {
      id: "shipmentDetails.name",
      size: 150,
      header: "Customer",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <>
          <Flex className="flex-col gap-1 items-start">
            <Text className="font-semibold text-gray-700">
              {row?.original?.shipmentDetails?.name ?? ""}
            </Text>
            <Text className="font-semibold text-gray-500">
              {row?.original?.shipmentDetails?.email ?? ""}
            </Text>
          </Flex>
        </>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 150,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.accessor("lineItems", {
      id: "lineItems",
      size: 100,
      header: "Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 ms-3">
          {row?.original?.products?.length ?? 0}
        </Text>
      ),
    }),
    // columnHelper.accessor("pricing.shipping", {
    //   id: "pricing.shipping",
    //   size: 100,
    //   header: "Shipping",
    //   enableGlobalFilter: true,
    //   cell: ({ row }) => {
    //     const price = row?.original?.pricing?.shipping ?? 0;
    //     return (
    //       <Text className="font-medium text-gray-700">
    //         Rs. {formatNumberWithCommas(Math.floor(price))}
    //       </Text>
    //     );
    //   },
    // }),
    columnHelper.accessor("pricing.totalPrice", {
      id: "pricing.totalPrice",
      size: 100,
      header: "Total",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.totalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.accessor("shipperCity", {
      id: "shipperCity",
      size: 120,
      header: "Shipper",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold ms-3">
          {row?.original?.shipperCity ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "payment",
      size: 120,
      header: "Payment",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.payment ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
    // columnHelper.display({
    //   id: "actions",
    //   size: 50,
    //   cell: ({ row }) => (
    //     <DeletePopover
    //       description="Are u really want to delete this order!"
    //       onDelete={() => handleDeleteOrders(row?.original?._id)}
    //     />
    //   ),
    // }),
  ];

  return columns;
};
