"use client";
import React from "react";
import { IconChevronRight } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import classNames from "classnames";
interface BreadCrumbProps {
  items?: { title?: string; path?: string }[];
  classname?: string;
}
export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items = [], classname = "" }) => {
  const t = useTranslations("String");
  const lastItem = items.length - 1;
  return (
    <div
      className={classNames("breakcrumb overflow-x-auto", {
        [classname]: classname,
      })}
    >
      <ul className="flex items-center text-xs whitespace-nowrap">
        <li className="bread-item">
          <Link href="/">
            <span className="text-gray-800">{t("home")}</span>
          </Link>
        </li>
        {items.map(({ title, path }, _index) => (
          <React.Fragment key={_index}>
            <li className="mx-1">
              <IconChevronRight className="w-4 h-4" />
            </li>
            <li className="bread-item">
              {path ? (
                <Link href={`${path}`}>
                  <span
                    className={classNames({
                      "text-gray-500": _index === lastItem,
                      "text-gray-800": _index !== lastItem,
                    })}
                  >
                    {title}
                  </span>
                </Link>
              ) : (
                <span
                  className={classNames({
                    "text-gray-500": _index === lastItem,
                  })}
                >
                  {title}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
