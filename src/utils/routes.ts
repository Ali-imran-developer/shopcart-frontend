import { routes } from "@/config/routes";
import { LazyExoticComponent, lazy } from "react";

type section = "auth" | "product" | "common";

export interface IRoute {
  name: string;
  section: section;
  route: string;
  component: LazyExoticComponent<(data: any) => JSX.Element>;
  protections?: "admin" | "token";
  sidebar?: boolean;
}

const allRoutes: IRoute[] = [
  {
    name: "Dashboard",
    section: "common",
    route: "/",
    component: lazy(() => import("../view/dashboard")),
    protections: "token",
    sidebar: true,
  },
  {
    name: "Login",
    section: "auth",
    route: "/login",
    component: lazy(() => import("../view/signIn")),
  },
  {
    name: "resetPassword",
    section: "auth",
    route: "/reset-password/:token",
    component: lazy(() => import("../view/reset-password")),
  },
  {
    name: "SignUP",
    section: "auth",
    route: "/sign-up",
    component: lazy(() => import("../view/signUp")),
  },
  {
    name: "forgotPassword",
    section: "auth",
    route: "/forgot-password",
    component: lazy(() => import("../view/forget-password")),
  },
  {
    name: "orders",
    section: "common",
    route: "/orders",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders")),
  },
  {
    name: "createCourier",
    section: "common",
    route: "/create-courier-management",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/couriers/create-courier")),
  },
  {
    name: "ordersDetail",
    section: "common",
    route: "/orders/:id",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders/order-detail")),
  },
  // {
  //   name: "testing",
  //   section: "common",
  //   route: "/testing",
  //   protections: "token",
  //   sidebar: true,
  //   component: lazy(() => import("../view/testing")),
  // },
  {
    name: "checkout",
    section: "common",
    route: "/checkout",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders/create-order/checkout")),
  },
  {
    name: "dispatch",
    section: "common",
    route: "/dispatch",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/dispatch")),
  },
  {
    name: "orders",
    section: "common",
    route: "/create-orders",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders/create-order/create-order")),
  },
  {
    name: "products",
    section: "common",
    route: "/products",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/products")),
  },
  {
    name: "create product",
    section: "common",
    route: "/create-products",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/products/create-products")),
  },
  {
    name: "edit production",
    section: "common",
    route: "/products/:id/edit",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/products/create-products")),
  },
  {
    name: "edit production",
    section: "common",
    route: "/create-orders/:id",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders/create-order/create-order")),
  },
  {
    name: "Resale",
    section: "common",
    route: "/list-products",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/list-products")),
  },
  {
    name: "createListProducts",
    section: "common",
    route: "/create-list-products",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/list-products/create-list-products")),
  },
  {
    name: "showCase",
    section: "common",
    route: "/show-case",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/show-case")),
  },
  {
    name: "createResellingOrder",
    section: "common",
    route: "/create-reselling-order",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/reseller-order/create-order")),
  },
  {
    name: "paymentsDashboard",
    section: "common",
    route: "/payments/dashborad",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/payments")),
  },
  {
    name: "myCouriers",
    section: "common",
    route: "/courier-management",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/couriers")),
  },
  {
    name: "personalInfo",
    section: "common",
    route: "/profile-settings",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/accountSetting")),
  },
  {
    name: "inventory",
    section: "common",
    route: "/stores/inventory",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/stores/inventory")),
  },
  {
    name: "shopifyConnection",
    section: "common",
    route: "/add-channels",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shopifyConnection")),
  },
  {
    name: "saleChannel",
    section: "common",
    route: "/sales-channel",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/saleChannel")),
  },
  {
    name: "/addShipperInfo",
    section: "common",
    route: "/add-shipper-info",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shipper-info/create-shipper-info")),
  },
  {
    name: "channelDetail",
    section: "common",
    route: "/edit-shipper-info",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shipper-info")),
  },
  {
    name: "customer",
    section: "common",
    route: "/customer",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/customer")),
  },
  {
    name: "rolesPermissions",
    section: "common",
    route: "/roles-permissions",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/roles-permission")),
  },
  {
    name: "shipperInfo",
    section: "common",
    route: "/shipper-info",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shipper-info")),
  },
  {
    name: "reports",
    section: "common",
    route: "/reports",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/reports/index")),
  },
  {
    name: "reports",
    section: "common",
    route: "/reports/:link",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/reports/tables")),
  },
  {
    name: "categories",
    section: "common",
    route: "/categories",
    sidebar: true,
    protections: "token",
    component: lazy(() => import("../view/categories")),
  },
  {
    name: "createCategories",
    section: "common",
    route: "/create-categories",
    sidebar: true,
    protections: "token",
    component: lazy(() => import("../view/categories/create-category")),
  },
];

export const getRoutes = (
  type: "unprotected" | "tokenProtected" | "adminProtected"
): IRoute[] => {
  switch (type) {
    case "unprotected":
      return allRoutes.filter((el) => !el?.protections?.length);
    case "tokenProtected":
      return allRoutes.filter((el) => el?.protections?.includes("token"));
    case "adminProtected":
      return allRoutes.filter((el) => el?.protections?.includes("admin"));
    default:
      return allRoutes;
  }
};
