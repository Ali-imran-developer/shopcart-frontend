import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Avatar, Checkbox, Flex, Text } from "rizzui";
import DateCell from "@/components/ui/date-cell";
import { formatPrice } from "@/utils/helperFunctions/formater-helper";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/components/shared/components/table/delete-popover";

const columnHelper = createColumnHelper<any>();
export const ListForResaleColumns = ({ navigate }: any) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 30,
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
    columnHelper.display({
      id: "title",
      size: 150,
      header: "Name",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Flex className="flex items-center">
            <Avatar
              src={row?.original?.image ?? ""}
              name={row.original?.name}
            />
            <Text className="w-32 font-semibold truncate line-clamp-2">
              {row?.original?.name}
            </Text>
          </Flex>
        );
      },
    }),
    columnHelper.display({
      id: "stock",
      size: 100,
      header: "Stock",
      cell: ({ row }) => (
        <Text className="text-sm">{row?.original?.stock}</Text>
      ),
    }),
    columnHelper.display({
      id: "price",
      size: 100,
      header: "Price",
      cell: ({ row }) => {
        return (
          <Text className="text-sm font-semibold">
            {formatPrice(row?.original?.price)}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: "category",
      size: 120,
      header: "Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">{row?.original?.category}</Text>
      ),
    }),
    columnHelper.display({
      id: "subCategory",
      size: 120,
      header: "SubCategory",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">{row?.original?.subCategory}</Text>
      ),
    }),
    columnHelper.display({
      id: "updatedAt",
      size: 120,
      header: "Created At",
      cell: ({ row }) => <DateCell date={new Date(row?.original?.createdAt)} />,
    }),
    columnHelper.display({
      id: "storeName",
      size: 100,
      header: "Store",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">{row?.original?.store?.storeName}</Text>
      ),
    }),
    // columnHelper.display({
    //   id: "channelDetails.name",
    //   size: 80,
    //   header: "Channels",
    //   enableSorting: false,
    //   cell: ({ row }) => (
    //     <Text className="font-semibold">
    //       {row?.original?.channelDetails?.name}
    //     </Text>
    //   ),
    // }),
    // columnHelper.accessor("status", {
    //   id: "status",
    //   size: 70,
    //   header: "Status",
    //   enableSorting: false,
    //   cell: ({ row }) => getStatusBadge(row.original.status),
    // }),
    columnHelper.display({
      id: "action",
      size: 50,
      cell: ({ row }) => {
        return (
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Edit Product"
            onClick={() =>
              navigate("/create-list-products", {
                state: { listingProduct: [row?.original] },
              })
            }
          >
            <PencilIcon className="text-gray-600 w-4 h-4 cursor-pointer" />
          </ActionIcon>
        );
      },
    }),
  ];

  return columns;
};

export const ListedForResaleColumns = ({ setRow, setIsDrawerOpen }: any) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 30,
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
    columnHelper.display({
      id: "title",
      size: 200,
      header: "Product",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Flex className="flex items-center">
            <Avatar
              src={row?.original?.product?.image ?? ""}
              name={row?.original?.product?.name ?? ""}
            />
            <Text className="w-32 font-semibold truncate line-clamp-2">
              {row?.original?.product?.name ?? ""}
            </Text>
          </Flex>
        );
      },
    }),
    columnHelper.display({
      id: "vendor",
      size: 80,
      header: "Vendor",
      cell: ({ row }) => (
        <Text className="text-sm font-semibold">
          {row?.original?.product?.store?.storeName || ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "price",
      size: 100,
      header: "Price",
      cell: ({ row }) => {
        return (
          <Text className="text-sm font-semibold">
            {row?.original?.product?.price}
          </Text>
        );
      },
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      size: 120,
      header: "Listed On",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "")} />
      ),
    }),
    columnHelper.display({
      id: "category",
      size: 150,
      header: "Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {`${row?.original?.resale?.category} / ${row?.original?.resale?.subCategory}`}
        </Text>
      ),
    }),
    columnHelper.accessor("discount", {
      id: "discount",
      size: 100,
      header: "Discount%",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold ms-3">
          {row?.original?.resale?.discount ?? ""}
        </Text>
      ),
    }),
    columnHelper.accessor("inventory", {
      id: "inventory",
      size: 100,
      header: "Inventory%",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold ms-3">
          {row?.original?.resale?.inventory ?? ""}
        </Text>
      ),
    }),
    columnHelper.accessor("shipping", {
      id: "shipping",
      size: 100,
      header: "Shipping",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Text className="font-semibold">
            {row?.original?.resale?.shipping ?? ""}
          </Text>
        );
      },
    }),
    // columnHelper.display({
    //   id: "status",
    //   size: 120,
    //   header: "Status",
    //   enableSorting: false,
    //   cell: ({ row }) => getStatusBadge(row.original.status),
    // }),
    columnHelper.display({
      id: "action",
      size: 50,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => {
        return (
          <Flex>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Edit Product"
              onClick={() => {
                setIsDrawerOpen(true);
                setRow(row?.original);
              }}
            >
              <PencilIcon className="text-gray-600 w-4 h-4 cursor-pointer" />
            </ActionIcon>
            <DeletePopover
              description="Are u really want to Unlist this product!"
              onDelete={() =>
                meta?.handleDeleteProduct &&
                meta?.handleDeleteProduct(row?.original)
              }
            />
          </Flex>
        );
      },
    }),
  ];

  return columns;
};
