import { routes } from "@config/routes";
import { PiHouse, PiBasket, PiSquaresFour, PiUsers, PiGearSix, PiMoney, PiSpotifyLogo, PiSquareHalfBottom, PiSpeedometer, PiSpeakerHigh, PiSkipBackCircle, PiShuffleSimple, PiShoppingCartThin, PiShoppingCart, PiAirplane, PiAlignRight } from "react-icons/pi";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: <PiHouse className="w-5 h-5" />,
  },
  {
    name: "Orders",
    href: "#",
    icon: <PiBasket className="w-5 h-5"/>,
    dropdownItems: [
      {
        name: "New Orders",
        href: routes.orders.orders,
      },
      {
        name: "Dispatch",
        href: routes.orders.dispatch,
      },
      {
        name: "Shipper Info",
        href: routes.orders.shipperInfo,
      },
    ],
  },
  {
    name: "All Products",
    href: "#",
    icon: <PiSquaresFour className="w-5 h-5"/>,
    dropdownItems: [
      { name: "All Products", href: routes.products.products },
      { name: "Categories", href: routes.products.categories },
    ],
  },
  {
    name: "Resale",
    href: "#",
    icon: <PiShoppingCart className="w-5 h-5"/>,
    dropdownItems: [
      { name: "List Poducts", href: routes.resale.listPoducts },
      // { name: "Reselling Orders", href: routes.resale.resellingOrders },
      // { name: "My Resellers", href: routes.resale.myResellers },
    ],
  },
  {
    name: "MarketPlace",
    href: "#",
    icon: <PiAlignRight className="w-5 h-5"/>,
    dropdownItems: [
      { name: "ShowCase", href: routes.marketPlace.showCase },
      // { name: "My Listing", href: routes.marketPlace.myListing },
      // { name: "My Orders", href: routes.marketPlace.myOrders },
    ],
  },
  {
    name: "Payments",
    href: "#",
    icon: <PiMoney className="w-5 h-5"/>,
    dropdownItems: [
      { name: "Dashboard", href: routes.payments.dashboard },
      // {
      //   name: "History",
      //   href: "",
      //   dropdownItems: [
      //     {
      //       name: "View Details",
      //       href: "View Details",
      //       dropdownItems: [
      //         {
      //           name: "Print",
      //           href: routes.payments.history.viewDetails.print,
      //         },
      //       ],
      //     },
      //     { name: "Dispute", href: routes.payments.history.dispute },
      //   ],
      // },
    ],
  },
  {
    name: "Customer",
    href: routes.customer,
    icon: <PiUsers className="w-5 h-5"/>,
  },
  {
    name: "Settings",
    href: "#",
    icon: <PiGearSix className="w-5 h-5"/>,
    dropdownItems: [
      {
        name: "Couriers",
        href: routes.settings.couriers.courierManagement,
      },
      {
        name: "Channels",
        href: routes.settings.stores.channels,
      },
    ],
  },
];
