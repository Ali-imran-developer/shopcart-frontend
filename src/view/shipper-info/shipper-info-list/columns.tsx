import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import PencilIcon from "@/components/shared/components/icons/pencil";
import toast from "react-hot-toast";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import { useShipperData } from "@/hooks/shipper-hook";

const columnHelper = createColumnHelper<any>();

export const ShipperInfoColumn = ({ navigate }: any) => {
  const handleEditAddress = (address: any) => {
    navigate(`/add-shipper-info`, {
      state: { address, shipperInfo: "edit" },
    });
  };

  const columns = [
    columnHelper.display({
      id: "name",
      size: 120,
      header: "Name",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.storeName ?? ""}</>,
    }),
    columnHelper.display({
      id: "contact",
      size: 150,
      header: "Contact",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.phoneNumber || ""}</Text>,
    }),
    columnHelper.display({
      id: "address",
      size: 150,
      header: "Address",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.address || ""}</Text>,
    }),
    columnHelper.display({
      id: "location",
      size: 150,
      header: "Location",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.locationName || ""}</Text>,
    }),
    columnHelper.display({
      id: "city",
      size: 150,
      header: "City (Origin)",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.city || ""}</Text>,
    }),
    columnHelper.display({
      id: "returnAddress",
      size: 150,
      header: "Return Address:",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.returnAddress || ""}</Text>,
    }),
    columnHelper.display({
      id: "actions",
      size: 50,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <>
          <Flex className="items-center gap-2">
            <Tooltip
              size="sm"
              content="Edit Shipper"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Shipper"
                className="cursor-pointer"
                onClick={() => handleEditAddress(row?.original)}
              >
                <PencilIcon className="h-4 w-4 cursor-pointer" />
              </ActionIcon>
            </Tooltip>
            <DeletePopover
              onDelete={() => meta?.handleDeleteRow && meta?.handleDeleteRow(row?.original)}
              description="Are u really want to delete this shipper info!"
            />
          </Flex>
        </>
      ),
    }),
  ];

  return columns;
};
