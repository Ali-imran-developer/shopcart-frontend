import { Link } from "react-router-dom";
import HamburgerButton from "@layouts/hamburger-button";
import SearchWidget from "@shared/search/search";
import Logo from "@shared/components/logo";
import HeaderMenuRight from "@layouts/header-menu-right";
import StickyHeader from "@layouts/sticky-header";
import { CarbonDrawerSidebar } from "./carbon-drawer-sidebar";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}) {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={
            <CarbonDrawerSidebar
              className="static w-full 2xl:w-full"
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          }
        />
        <Link
          to={"/"}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>

        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
