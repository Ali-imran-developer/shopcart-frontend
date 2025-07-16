import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { productsListColumns } from "./columns";
import TableFooter from "@shared/components/table/footer";
import cn from "@utils/helperFunctions/class-names";
import { startTransition, useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";
import { Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useAppSelector } from "@/hooks/store-hook";
import toast from "react-hot-toast";
import { TabList } from "@/components/shared/tabs";

const filterOptions = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "In Active",
  }
];

export default function ProductsTable({
  hideFooter = false,
  className,
  page,
  limit,
  isLoading,
  activeTab,
  setActiveTab,
  updateParams,
  handleDeleteProducts,
}) {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState({});
  const { data } = useAppSelector((state) => state.Products);

  const { table, setData } = useTanStackTable({
    tableData: ensureArray(data?.products),
    columnConfig: productsListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleSelectRow: (row) => {
          navigate(routes?.products?.ediProduct(row?._id), {
            state: { row },
          });
        },
        handleDeleteProduct: async (row) => {
          try {
            const response = await handleDeleteProducts(row?._id);
            console.log("response", response);
          } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
          }
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(data?.products));

  }, [data?.products]);

  const selectTab = (nextTab) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
    updateParams({ status: nextTab, page: 1 });
  };

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2", className)}>
        <div className="flex items-center justify-between mb-2">
          <TabList
            setSelectedStatus={setSelectedStatus}
            tabs={filterOptions}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            selectTab={selectTab}
            className="ms-2"
          />
          <Input
            type="search"
            clearable={true}
            inputClassName="h-[36px]"
            placeholder="Search by any field..."
            onClear={() => table?.setGlobalFilter("")}
            value={table?.getState()?.globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table?.setGlobalFilter(e?.target?.value)}
            className="w-72 @3xl:order-3 @3xl:ms-auto @3xl:max-w-72 pb-4 lg:pb-0 lg:pt-2"
          />
        </div>
        <Table
          table={table}
          variant="modern"
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter table={table} buttons={selectedStatus} />
        <TablePagination
          table={table}
          currentPage={page}
          totalPages={Math?.ceil(data?.totalProducts / limit) ?? 0}
          updateParams={updateParams}
          className={cn("py-4")}
        />
      </div>
    </>
  );
}
