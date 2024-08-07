"use client";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import IconMail from "@/assets/icons/IconMail";
import IconSupport from "@/assets/icons/IconSupport";
import { usePathname } from "@/utils/navigation";
import { useMemo } from "react";
interface HeaderNavitationTopProps {
  children?: React.ReactNode;
  navitationItems?: {
    title: string;
    href: string;
    prefix: React.ReactNode;
  }[];
  className?: string;
}
const bookingRoutes = ["passenger", "payment", "reservation"];

const HeaderNavitationTop: React.FC<HeaderNavitationTopProps> = ({ children, navitationItems, className = "" }) => {
  const t = useTranslations("String");
  const pathname = usePathname();
  const isBookingProcess = useMemo(() => {
    return bookingRoutes.some((rKey) => pathname.includes(rKey));
  }, [pathname]);

  if (isBookingProcess) {
    return null;
  }

  const items = [
    {
      title: t("contact"),
      href: "/page/lien-he",
      prefix: <IconMail className="w-5 h-5 mr-2 stroke-gray-600" />,
    },
    {
      title: t("support"),
      href: "/",
      prefix: <IconSupport className="w-5 h-5 mr-2 stroke-gray-600" />,
    },
  ];

  return (
    <div
      className={classNames("top-menu text-right mb-2", {
        [className]: className,
      })}
    >
      <div className="flex items-center gap-x-2 justify-end">
        {/* {items.map((item, _index) => (
          <div className="px-3 py-2" key={_index}>
            <NavLink title={item.title} href={item.href} prefix={item.prefix} />
          </div>
        ))} */}
        {children ?? null}
      </div>
    </div>
  );
};
export default HeaderNavitationTop;
