import { useLocation } from "react-router-dom";
import cn from "@utils/helperFunctions/class-names";
import { PiBasket, PiCaretDownBold, PiGearSix, PiHouse } from "react-icons/pi";
import { menuItems } from "@layouts/hydrogen/menu-items";
import StatusBadge from "@shared/components/get-status-badge";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CollapseProvider, CustomCollapse } from "../collapse";

export function SidebarMenu() {
  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    for (const item of menuItems) {
      if (item.dropdownItems?.some((subItem) => subItem.href === pathname)) {
        setActiveDropdown(item.name as any);
        break;
      }
    }
  }, [pathname]);

  const renderMenuItems = (items: any, level = 0) => {
    return items.map((item: any, index: any) => {
      const isActive = pathname === item.href;
      const hasDropdown = item?.dropdownItems?.length;
      const isDropdownActive = item.dropdownItems?.some(
        (subItem: any) => subItem.href === pathname
      );
      const paddingLeftClass = level === 1 ? "ml-1" : level === 2 ? "ml-4" : "";

      if (hasDropdown) {
        return (
          <CustomCollapse
            key={item.name + index}
            id={item.name}
            defaultOpen={isDropdownActive}
            header={({ open, toggle }: any) => (
              <div
                onClick={toggle}
                className={cn(
                  "group flex cursor-pointer items-center justify-between rounded-md px-3 py-3 font-medium transition-all duration-200 hover:bg-gray-100 mx-3 2xl:mx-5",
                  open
                    ? "text-primary before:absolute before:-start-3 before:top-2/5 before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary"
                    : "text-gray-800"
                )}
              >
                <span className="flex items-center">
                  {item.icon && (
                    <span
                      className={cn(
                        "me-2 h-5 w-5",
                        open
                          ? "text-primary"
                          : "text-gray-800 dark:text-gray-500"
                      )}
                    >
                      {item.icon}
                    </span>
                  )}
                  {item.name}
                </span>
                <PiCaretDownBold
                  strokeWidth={3}
                  className={cn(
                    "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200",
                    open && "rotate-0"
                  )}
                />
              </div>
            )}
          >
            <CollapseProvider>
              <div className="ml-2 list-disc">
                {renderMenuItems(
                  item.dropdownItems.map((sub: any) => ({
                    ...sub,
                    _parent: item.name,
                  })),
                  level + 1
                )}
              </div>
            </CollapseProvider>
          </CustomCollapse>
        );
      }

      return (
        <Link
          to={item.href}
          key={item.name + index}
          className={cn(
            "flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize transition-all duration-200 hover:bg-gray-100 mx-3.5 2xl:mx-5",
            isActive
              ? "text-primary"
              : level > 0
              ? "text-gray-500"
              : "text-gray-800"
          )}
        >
          <div
            className={cn(
              "flex items-center truncate",
              paddingLeftClass,
              (level === 1 || level === 2) &&
                "relative before:content-['•'] before:text-sm before:mr-2 before:text-gray-400"
            )}
          >
            {item.icon && (
              <span
                className={cn(
                  "me-2 h-5 w-5",
                  isActive ? "text-primary" : "text-gray-800 dark:text-gray-500"
                )}
              >
                {item.icon}
              </span>
            )}
            <span className="truncate">{item.name}</span>
          </div>
          {item?.badge?.length ? <StatusBadge status={item.badge} /> : null}
        </Link>
      );
    });
  };

  return (
    <CollapseProvider>
      <div className="mt-4 pb-3 3xl:mt-6">
        {renderMenuItems(menuItems)}
      </div>
    </CollapseProvider>
  );
}
