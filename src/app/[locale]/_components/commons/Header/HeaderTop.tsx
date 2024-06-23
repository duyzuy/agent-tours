"use client";
import React from "react";
import IconMail from "@/assets/icons/IconMail";
import IconSupport from "@/assets/icons/IconSupport";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../LanguageSwitcher";
import HeaderNavitationTop from "@/components/frontend/HeaderNavigationTop";

import AccountItem from "./AccountItem";
const HeaderTop: React.FC = () => {
    const t = useTranslations("String");

    const items = [
        {
            title: t("contact"),
            href: "/",
            prefix: <IconMail className="w-5 h-5 mr-2 stroke-gray-600" />,
        },
        {
            title: t("support"),
            href: "/",
            prefix: <IconSupport className="w-5 h-5 mr-2 stroke-gray-600" />,
        },
        // {
        //     title: t("login"),
        //     href: `/${params.locale}/customer-login`,
        //     prefix: <IconAccount className="w-5 h-5 mr-2 stroke-gray-600" />,
        // },
    ];

    return (
        <HeaderNavitationTop navitationItems={items}>
            <AccountItem />
            <LanguageSwitcher />
        </HeaderNavitationTop>
    );
};
export default HeaderTop;
