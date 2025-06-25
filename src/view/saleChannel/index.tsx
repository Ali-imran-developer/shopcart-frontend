import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import SalesChannelTable from "./salesChannel-list/table";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/store-hook";
import { useStores } from "@/hooks/salesChannel-hook";

export const metadata = {
  ...metaObject("Sales Channel"),
};

const pageHeader = {
  title: "Sales Channel",
};

const SalesChannel = () => {
  const { handleGetStore, isLoading } = useStores();
  const { storeData } = useAppSelector((state) => state.Stores);

  useEffect(() => {
    handleGetStore();

  },[])

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <SalesChannelTable channels={storeData?.store} loading={isLoading} />
    </>
  );
};

export default SalesChannel;
