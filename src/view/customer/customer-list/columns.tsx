import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/components/shared/components/table/delete-popover";

const columnHelper = createColumnHelper<any>();
export const CustomerColumn = ({ handleDeleteCustomer }: any) => {
  const columns = [
    // columnHelper.display({
    //   id: "select",
    //   size: 50,
    //   header: ({ table }) => (
    //     <Checkbox
    //       className="ps-0"
    //       aria-label="Select all rows"
    //       checked={table.getIsAllPageRowsSelected()}
    //       onChange={() => table.toggleAllPageRowsSelected()}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       className="ps-0"
    //       aria-label="Select row"
    //       checked={row.getIsSelected()}
    //       onChange={() => row.toggleSelected()}
    //     />
    //   ),
    // }),
    columnHelper.accessor("customerName", {
      id: "name",
      size: 120,
      header: "Customer Name",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold capitalize">
          {row?.original?.customerName ?? ""}
        </Text>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      size: 150,
      header: "Phone",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">0{row?.original?.phone ?? ""}</Text>
      ),
    }),
    columnHelper.accessor("city", {
      id: "city",
      size: 150,
      header: "City",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold capitalize">
          {row?.original?.city ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "createdAt",
      size: 100,
      header: "Create At",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "updatedAt",
      size: 100,
      header: "Update At",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.updatedAt ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "totalOrders",
      size: 100,
      header: "Total Orders",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 text-center">
          {row?.original?.totalOrders ?? 0}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "totalSpent",
      size: 100,
      header: "Total Spent",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 text-center">
          {row?.original?.totalSpent ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "actions",
      size: 50,
      cell: ({ row, table: { options: { meta } } }) => (
        <Flex className="items-center gap-2">
          <Tooltip
            size="sm"
            content="Update Customer"
            placement="top"
            color="invert"
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Update Customer"
              onClick={() => meta?.handleCustomerRow && meta?.handleCustomerRow(row?.original)}
            >
              <PencilIcon className="size-4" />
            </ActionIcon>
          </Tooltip>
          <DeletePopover
            description="Are u really want to delete this customer!"
            onDelete={() => handleDeleteCustomer(row?.original?._id)}
          />
        </Flex>
      ),
    }),
  ];

  return columns;
};
