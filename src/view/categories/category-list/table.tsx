import { CategoriesColumns } from "./columns";
import Table from "@components/shared/components/table/index";
import CustomExpandedComponent from "./expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect, useMemo } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useAppSelector } from "@/hooks/store-hook";
import { useCategories } from "@/hooks/categories";
import TableFooter from "@/components/shared/components/table/footer";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function CategoriesTable({
  className,
  variant = "modern",
  hidePagination = false,
}: {
  className?: string;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const { updateParams, params } = useQueryParams();
  const queryParams = useMemo(() => {
    return {
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
    };
  }, [params]);
  const { Loading, handleDeleteCategory, handleDeleteSubCategory } = useCategories(queryParams);
  const { data } = useAppSelector((state) => state.Categories);

  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(data?.categories),
    columnConfig: CategoriesColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: async (row) => {
          await handleDeleteCategory(row?._id);
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    setData(ensureArray(data?.categories));

  }, [data?.categories]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2",className )}>
        <Table
          table={table}
          data={data?.categories}
          variant="modern"
          isLoading={Loading}
          showLoadingText={Loading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4 max-h-[380px] overflow-y-auto",
            rowClassName: "last:border-0",
          }}
          components={{
            expandedComponent: (row) => (
              <CustomExpandedComponent
                row={row}
                handleDeleteSubCategory={handleDeleteSubCategory}
              />
            ),
          }}
        />
        <TableFooter table={table} />
        <TablePagination
          table={table}
          currentPage={queryParams?.page}
          totalPages={
            Math?.ceil(data?.totalCategories / queryParams?.limit) ?? 0
          }
          updateParams={updateParams}
          className={cn("py-4")}
        />
      </div>
    </>
  );
}
