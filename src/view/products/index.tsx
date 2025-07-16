import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import ProductsTable from "./product-list/table";
import { metaObject } from "@config/site.config";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useMemo, useState } from "react";
import { useProduct } from "@/hooks/product-hook";
import CSVUploadModal from "./CSVUploadModal";

export const metadata = {
  ...metaObject("Products"),
};

const pageHeader = {
  title: "Products",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
    },
  ],
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateParams, params } = useQueryParams();
  const [activeTab, setActiveTab] = useState<string>("active");
  const queryParams = useMemo(() => {
    return {
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
      status: params.get("status") || activeTab,
    };
  }, [params, activeTab]);
  const { handleDeleteProducts, isLoading } = useProduct(queryParams);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="w-40 text-sm lg:text-sm !px-1"
          >
            Upload CSV
          </Button>
          <Button
            as="span"
            className="w-full lg:w-auto cursor-pointer"
            onClick={() => navigate(routes.products.createProducts)}
          >
            <PiPlusBold className="me-1.5 h-[16px] w-[16px]" />
            Add Product
          </Button>
        </div>
      </PageHeader>

      <ProductsTable
        className=""
        activeTab={activeTab}
        isLoading={isLoading}
        page={queryParams?.page}
        limit={queryParams?.limit}
        setActiveTab={setActiveTab}
        updateParams={updateParams}
        handleDeleteProducts={handleDeleteProducts}
      />

      {isModalOpen && (
        <CSVUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductsPage;