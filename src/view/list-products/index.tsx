import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import ListProductsTable from "./components/table";
import { useAppSelector } from "@/hooks/store-hook";
import { useProduct } from "@/hooks/product-hook";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useMemo, useState } from "react";
import { useResaleProduct } from "@/hooks/resale-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

export const metadata = {
  ...metaObject("List Product"),
};

const pageHeader = {
  title: "List Product",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "List Product",
    },
  ],
};

export default function ListProduct() {
  const { resellerData } = useAppSelector((state) => state?.ResaleProducts);
  const { updateParams, params } = useQueryParams();
  const [activeTab, setActiveTab] = useState("listForResale");
  const isListed: boolean = activeTab === "listedForResale" ? true : false;
  const queryParams = useMemo(() => {
    return {
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
      isListed: params.get("isListed") || isListed,
    };
  }, [params, activeTab]);
  const { isLoading } = useResaleProduct(queryParams);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <ListProductsTable
          page={queryParams?.page}
          limit={queryParams?.limit}
          data={ensureArray(resellerData?.data)}
          isLoading={isLoading}
          activeTab={activeTab}
          updateParams={updateParams}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
}
