import { ShipperInfoColumn } from "./columns";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";
import { useShipperData } from "@/hooks/shipper-hook";

export interface ShipperInfoType {
  _id?: string;
  labelStoreName?: string;
  phoneNumber?: string;
  locationName?: string;
  city?: string;
  returnAddress?: string;
  address?: string;
  storeId: string;
  onClose?: any;
}

export default function OrderTable({
  className,
  variant = "modern",
  hidePagination = false,
}: {
  className?: string;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const navigate = useNavigate();
  const { fetchShippers, deleteShipper, shippers, isLoading } = useShipperData();

  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(shippers),
    columnConfig: ShipperInfoColumn({ navigate, deleteShipper }),
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
        handleDeleteRow: async (row) => {
          const data: any = await deleteShipper(row?._id);
          setData((prev) => prev.filter((item) => item?._id !== data?._id));
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    fetchShippers();

  },[]);

  useEffect(() => {
    setData(ensureArray(shippers));

  }, [shippers]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2 mt-4", className)}>
        <Table
          table={table}
          variant={variant}
          showLoadingText={isLoading}
          isLoading={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter table={table} />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
