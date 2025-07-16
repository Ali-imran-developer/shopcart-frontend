import { Link } from "react-router-dom";
import { Button } from "rizzui";
import WelcomeBanner from "@shared/components/banners/welcome";
import StatCards from "./components/stat-cards";
import ProfitWidget from "./components/profit-widget";
import SalesReport from "./components/sales-report";
import BestSellers from "./components/best-sellers";
import RepeatCustomerRate from "./components/repeat-customer-rate";
import UserLocation from "./components/user-location";
import RecentOrder from "./components/recent-order";
import StockReport from "./components/stock-report";
import { PiPlusBold } from "react-icons/pi";
import HandWaveIcon from "@shared/components/icons/hand-wave";
import AuthController from "@/controllers/authController";
import { useOrders } from "@/hooks/order-hook";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";

export default function EcommerceDashboard() {
  const { handleDashboradStats } = useOrders();
  const { dashboardData } = useAppSelector((state) => state.Orders);

  useEffect(() => {
    handleDashboradStats();
    
  }, []);

  return (
    <>
      {/* <div className="@container">
      <WelcomeBanner
        title={
          <>
            Good Morning {""}
            <HandWaveIcon className="inline-flex h-8 w-8" />
          </>
        }
        description={
          "You don't have a product yet. Create your first product to start managing your store."
        }
        media={
          <div className=" ">
            <img
              src="/assets/images/not-found.png"
              alt="Welcome shop image form freepik"
              className="dark:brightness-95 dark:drop-shadow-md"
              width={200}
              height={200}
            />
          </div>
        }
        contentClassName="@2xl:max-w-[calc(100%-340px)]"
        className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-9"
      >
        <Link to={"/create-products"} className="inline-flex">
          <Button as="span" className="h-[38px] shadow md:h-10">
            <PiPlusBold className="me-1 h-4 w-4" /> Create Product
          </Button>
        </Link>
      </WelcomeBanner>
    </div> */}

      <div className="@container">
        <div className="w-full space-y-4">
          <StatCards dashboardData={dashboardData} className="grid grid-cols-1 lg:grid-cols-3" />

          <div className="flex flex-col lg:flex-row gap-4">
            <ProfitWidget className="w-full lg:w-1/2" />
            <SalesReport className="w-full lg:w-1/2" />
          </div>

          <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" />

          <RepeatCustomerRate className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-8" />

          <div className="flex flex-col lg:flex-row gap-4">
            <BestSellers dashboardData={dashboardData} className="w-full lg:w-1/2" />
            <UserLocation className="w-full lg:w-1/2" />
          </div>

          {/* <StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8" /> */}
        </div>
      </div>
    </>
  );
}
