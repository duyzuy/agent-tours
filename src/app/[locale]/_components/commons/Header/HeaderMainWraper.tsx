"use client";
import NavItem from "@/components/frontend/base/NavItem";
import { IconSearch } from "@/assets/icons";
import React, { useMemo } from "react";
import classNames from "classnames";
import { isUndefined } from "lodash";
import { Link, usePathname } from "@/utils/navigation";

type MenuItem = {
  title: string;
  description?: string;
  href?: string;
  iconPath?: string;
  isBlank?: boolean;
  children?: MenuItem[];
};

const bookingRoutes = ["passenger", "payment", "reservation"];
export interface HeaderMainWraperProps {
  className?: string;
  children?: React.ReactNode;
  items?: MenuItem[];
}
const HeaderMainWraper: React.FC<HeaderMainWraperProps> = ({ children, className = "", items }) => {
  const pathname = usePathname();
  const isBookingProcess = useMemo(() => {
    return bookingRoutes.some((rKey) => pathname.includes(rKey));
  }, [pathname]);

  if (isBookingProcess) {
    return null;
  }
  return (
    <div
      className={classNames("bottom-menu flex items-center justify-end", {
        [className]: className,
      })}
    >
      {items ? (
        <div className="flex items-center">
          {items.map((item, _index) => (
            <NavItem
              key={_index}
              title={item.title}
              hasDropdown={!isUndefined(item.children)}
              dropdownItems={item.children}
            />
          ))}
        </div>
      ) : null}
      <div className="space mx-1 text-xs text-gray-400">|</div>
      <ul className="flex items-center">
        <li className="relative px-3 py-2">
          <Link href="/search">
            <span className="text-gray-800">
              <IconSearch />
            </span>
          </Link>
        </li>
        {/* <li className="relative px-3 py-2">
          <div className="relative flex items-center pr-8">
            <span>
              <IconShippingCart />
            </span>
            <span className="absolute ml-8 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
              3
            </span>
          </div>
        </li> */}
      </ul>
    </div>
  );
};
export default HeaderMainWraper;
