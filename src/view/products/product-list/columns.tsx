import PencilIcon from "@shared/components/icons/pencil";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Avatar, Checkbox, Flex, Text, Tooltip } from "rizzui";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import DateCell from "@/components/ui/date-cell";
import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";

const columnHelper = createColumnHelper<any>();
export const productsListColumns = [
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
  columnHelper.display({
    id: "name",
    size: 250,
    header: "Name",
    cell: ({ row }) => {
      return (
        <Flex className="items-center gap-2">
          <Avatar
            name={row?.original?.name ?? ""}
            src={row?.original?.image ?? ""}
          />
          <Text className="text-sm font-semibold">
            {row?.original?.name ?? ""}
          </Text>
        </Flex>
      );
    },
  }),
  columnHelper.display({
    id: "createdAt",
    size: 120,
    header: "Created At",
    cell: ({ row }) => <DateCell date={new Date(row?.original?.createdAt)} />,
  }),
  columnHelper.display({
    id: "description",
    size: 200,
    header: "Description",
    cell: ({ row }) => {
      const rawHTML = row?.original?.description || "";
      const plainText = rawHTML.replace(/<[^>]+>/g, "");
      return (
        <div className="font-semibold truncate line-clamp-1">{plainText}</div>
      );
    },
  }),
  columnHelper.display({
    id: "category",
    size: 200,
    header: "Category",
    cell: ({ row }) => (
      <Text className="font-semibold">
        {row?.original?.category ?? ""}
        {" / "}
        {row?.original?.subCategory ?? ""}
      </Text>
    ),
  }),
  columnHelper.display({
    id: "price",
    size: 70,
    header: "Price",
    cell: ({ row }) => (
      <Text className="font-semibold ms-3">{row?.original?.price ?? ""}</Text>
    ),
  }),
  columnHelper.display({
    id: "stock",
    size: 70,
    header: "Stock",
    cell: ({ row }) => (
      <Text className="font-semibold ms-3">{row?.original?.stock ?? ""}</Text>
    ),
  }),
  columnHelper.display({
    id: "status",
    size: 100,
    header: "Status",
    cell: ({ row }) => getStatusBadge(row?.original?.status),
  }),
  columnHelper.display({
    id: "action",
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={"Edit Product"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={"Edit Product"}
            onClick={() =>
              meta?.handleSelectRow && meta?.handleSelectRow(row.original)
            }
          >
            <PencilIcon className="h-4 w-4 cursor-pointer" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          description="Are u really want to delete this product!"
          onDelete={() =>
            meta?.handleDeleteProduct &&
            meta?.handleDeleteProduct(row?.original)
          }
        />
      </Flex>
    ),
  }),
];
