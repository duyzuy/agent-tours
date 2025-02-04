"use client";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import IconMail from "@/assets/icons/IconMail";
import IconSupport from "@/assets/icons/IconSupport";
import { usePathname } from "@/utils/navigation";
import { useMemo } from "react";
interface TopMenuHeaderProps {
  children?: React.ReactNode;
  navitationItems?: {
    title: string;
    href: string;
    prefix: React.ReactNode;
  }[];
  className?: string;
}
const bookingRoutes = ["passenger", "payment", "reservation"];

const TopMenuHeader: React.FC<TopMenuHeaderProps> = ({ children, navitationItems, className = "" }) => {
  const t = useTranslations("String");
  const pathname = usePathname();
  const isBookingRoute = useMemo(() => {
    return bookingRoutes.some((rKey) => pathname.includes(rKey));
  }, [pathname]);

  if (isBookingRoute) return null;
  return (
    <div
      className={classNames("top-menu text-right mb-2", {
        [className]: className,
      })}
    >
      <div className="flex items-center gap-x-2 justify-end">{children ?? null}</div>
    </div>
  );
};
export default TopMenuHeader;
