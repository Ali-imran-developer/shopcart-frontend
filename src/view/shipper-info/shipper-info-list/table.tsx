import { ShipperInfoColumn } from "./columns";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect, useMemo } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";
import { useShipperData } from "@/hooks/shipper-hook";
import { useAppSelector } from "@/hooks/store-hook";
import { useQueryParams } from "@/hooks/useQueryParams";

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
  const { updateParams, params } = useQueryParams();
  const { shipperData } = useAppSelector((state) => state.Shipper);
  const queryParams = useMemo(() => {
    return {
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
    };
  }, [params]);
  const { deleteShipper, isLoading } = useShipperData(queryParams);

  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(shipperData?.shipper),
    columnConfig: ShipperInfoColumn({ navigate }),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
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
    setData(ensureArray(shipperData?.shipper));

  }, [shipperData?.shipper]);

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
        <TablePagination
          table={table}
          currentPage={queryParams?.page}
          totalPages={Math?.ceil(shipperData?.totalShippers / queryParams?.limit) ?? 0}
          updateParams={updateParams}
          className={cn("py-4")}
        />
      </div>
    </>
  );
}
