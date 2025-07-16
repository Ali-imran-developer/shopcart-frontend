import { useEffect, useState, useTransition } from "react";
import cn from "@/utils/helperFunctions/class-names";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import TablePagination from "@shared/components/table/pagination";
import { ListForResaleColumns, ListedForResaleColumns } from "./columns";
import TableFooter from "./footer";
import ListDrawer from "./drawer";
import { TabList } from "@/components/shared/tabs";
import { TableVariantProps } from "rizzui";
import { useNavigate } from "react-router-dom";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@/components/shared/components/table/custom/use-TanStack-Table";

const filterOptions = [
  { value: "listForResale", label: "List For Resale" },
  { value: "listedForResale", label: "Listed For Resale" },
];

interface ResellersProductTableProps {
  className?: string;
  data?: any;
  listingProductData?: any[];
  isLoading?: boolean;
  isLoadingProduct?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
  page: number;
  limit: number;
  updateParams: (page: Record<string, string | number>) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
}

export default function ResellersProductTable({
  className,
  data,
  isLoading,
  hidePagination = false,
  variant = "modern",
  page,
  updateParams,
  limit,
  activeTab,
  setActiveTab,
}: ResellersProductTableProps) {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [row, setRow] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(data) ?? [],
    columnConfig: [],
    options: {
      meta: {
        // handleDeleteProduct: async (row: any) => {
        //   console.log(row);
        //   const base64List = [];
        //   for (const imgPath of row?.images || []) {
        //     const base64 = await imageUrlToBase64(imgPath?.url);
        //     if (base64?.url) {
        //       base64List.push({ id: Date.now(), url: base64?.url });
        //     }
        //   }
        //   const preparedValues = {
        //     ...row,
        //     images: base64List,
        //     listForResale: null,
        //   };
        //   console.log(preparedValues);
        //   const response = await ProductController.updateProduct(
        //     preparedValues,
        //     row?._id
        //   );
        //   toast.success(response?.message || "Product Unlist successfully!");
        //   setData((prev) => prev?.filter((r) => r?._id !== row?._id));
        //   await handleGetProducts(page);
        // },
        handleDeleteRow: (row) =>
          setData((prev) => prev.filter((r) => r.id !== row.id)),
      },
      enableColumnResizing: false,
    },
  });

  // const AllRowsId = table?.getSelectedRowModel()?.rows?.map((row) => row?.original?._id);

  useEffect(() => {
    setData(ensureArray(data))
    if (activeTab === "listForResale") {
      setColumns(ListForResaleColumns({ navigate, setRow, setIsDrawerOpen }));
    } else {
      setColumns(ListedForResaleColumns({ setRow, setIsDrawerOpen }));
    }
  }, [data, activeTab, setData, setColumns]);

  // const handleTabSelect = (tab: string) => {
  //   startTransition(() => setActiveTab(tab));
  // };

  // useEffect(() => {
  //   handleGetProducts();

  // },[])

  // const closeDrawer = () => setIsDrawerOpen(false);
  const handleStatusChange = (data: any) => {
    navigate("/create-list-products", {
      state: { listingProduct: data },
    });
  };

  const selectTab = (nextTab: any) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
    // setUpdateParams({ status: nextTab, page: 1 });
  };

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4", className)}>
        <TabList
          setSelectedStatus={setSelectedStatus}
          tabs={filterOptions}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          selectTab={selectTab}
          className="ms-2"
        />
        <Table
          table={table}
          variant={variant}
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4 max-h-[360px] overflow-y-auto",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter
          table={table}
          isDrawerOpen={isDrawerOpen}
          handleStatusChange={handleStatusChange}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        {!hidePagination && (
          <TablePagination
            table={table}
            currentPage={page}
            totalPages={Math.ceil((data?.len ?? 0) / limit)}
            updateParams={updateParams}
            className={cn("py-4")}
          />
        )}
      </div>
      {/* {isDrawerOpen && (
        <ListDrawer
          handleGetProducts={handleGetProducts}
          row={row}
          table={table}
          allRows={AllRowsId}
          isDrawerOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
        />
      )} */}
    </>
  );
}
