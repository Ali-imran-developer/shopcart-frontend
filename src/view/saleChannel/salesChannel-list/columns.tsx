import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Avatar, Text, Tooltip } from "rizzui";
import DateCell from "@/components/ui/date-cell";
import PencilIcon from "@/components/shared/components/icons/pencil";
import { routes } from "@/config/routes";

const columnHelper = createColumnHelper<any>();
export const SalesChannelColumns = ({ navigate }: any) => {
  const handleNavigate = (row: any) => {
    navigate(routes.settings.stores.addChannel, {
      state: { row },
    });
  };

  const columns = [
    columnHelper.display({
      id: "logo",
      size: 50,
      header: "Logo",
      enableSorting: false,
      cell: ({ row }) => (
        <Avatar
          name={row?.original?.storeName ?? ""}
          src={row?.original?.storeLogo ?? ""}
        />
      ),
    }),
    columnHelper.display({
      id: "storeName",
      size: 100,
      enableSorting: false,
      header: "Store Name",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {row?.original?.storeName ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "storeDomain",
      size: 100,
      header: "Store Domain",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {row?.original?.storeDomain || ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "createdAt",
      size: 100,
      enableSorting: false,
      header: "Store Create",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "totalProducts",
      size: 100,
      enableSorting: false,
      header: "Total Products",
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.totalProducts ?? 0} Products
        </Text>
      ),
    }),
    columnHelper.display({
      id: "totalOrders",
      size: 100,
      enableSorting: false,
      header: "Total Orders",
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.totalOrders ?? 0} Orders
        </Text>
      ),
    }),
    columnHelper.display({
      id: "totalCustomers",
      size: 100,
      header: "Total Customers",
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.totalCustomers ?? 0} Customers
        </Text>
      ),
    }),
    columnHelper.display({
      id: "actions",
      size: 50,
      cell: ({ row }) => (
          <Tooltip size="sm" content="Edit Store" placement="top" color="invert">
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Edit Store"
              onClick={() => handleNavigate(row?.original)}
            >
              <PencilIcon className="size-4" />
            </ActionIcon>
          </Tooltip>
      ),
    }),
  ];

  return columns;
};
