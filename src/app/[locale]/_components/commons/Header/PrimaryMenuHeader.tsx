"use client";
import React, { useMemo } from "react";
import classNames from "classnames";
import NavItem, { NavItemProps } from "@/components/frontend/base/NavItem";
import { IconSearch } from "@/assets/icons";
import { Link, usePathname } from "@/utils/navigation";
import { MenuItemType } from "@/utils/menu";

export interface PrimaryMenuHeaderProps {
  className?: string;
  children?: React.ReactNode;
  items?: MenuItemType[];
}
const BOOKING_ROUTES = ["passenger", "payment", "reservation"] as const;

const PrimaryMenuHeader: React.FC<PrimaryMenuHeaderProps> = ({ children, className = "", items }) => {
  const pathname = usePathname();
  const isBookingProcess = useMemo(() => {
    return BOOKING_ROUTES.some((rKey) => pathname.includes(rKey));
  }, [pathname]);

  if (isBookingProcess) return null;

  return (
    <div
      className={classNames("bottom-menu flex items-center justify-end", {
        [className]: className,
      })}
    >
      {items ? (
        <div className="flex items-center">
          {items.map((item, _index) => (
            <NavItem key={_index} name={item.name} slug={`${item.slug}`} items={item.children} />
          ))}
        </div>
      ) : null}
      <div className="space mx-1 text-xs text-gray-400">|</div>
      <ul className="flex items-center">
        <li className="relative px-3 py-2">
          <Link href="/search">
            <IconSearch className="text-gray-800" />
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
export default PrimaryMenuHeader;
