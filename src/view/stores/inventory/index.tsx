import PageHeader from "@shared/page-header";
import { routes } from "@config/routes";
import { Box } from "rizzui";
import InventoryTable from "@/view/stores/inventory/table/table";

const pageHeader = {
  title: "Inventory",
  breadcrumb: [
    {
      href: routes.settings.stores.inventory,
      name: "Inventory",
    },
  ],
};

const Inventory = () => {

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Box className="space-y-8">
        <InventoryTable data={[]} isDataLoaded={false} />
      </Box>
    </>
  );
};

export default Inventory;
