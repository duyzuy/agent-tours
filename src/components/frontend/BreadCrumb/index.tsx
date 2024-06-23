import React from "react";
import { IconChevronRight } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
interface BreadCrumbProps {
    items?: { title?: string; path?: string }[];
}
export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => {
    const t = useTranslations("String");
    return (
        <div className="breakcrumb bg-gray-100">
            <div className="container mx-auto">
                <ul className="flex items-center py-4">
                    <li className="text-xs font-bold text-gray-600">
                        <Link href="/">{t("home")}</Link>
                    </li>
                    {items?.map(({ title, path }, _index) => (
                        <React.Fragment key={_index}>
                            <li className="mx-1">
                                <IconChevronRight className="w-4 h-4" />
                            </li>
                            <li className="text-xs font-bold text-gray-600">
                                {path ? (
                                    <Link href={`${path}`}>{title}</Link>
                                ) : (
                                    title
                                )}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};
