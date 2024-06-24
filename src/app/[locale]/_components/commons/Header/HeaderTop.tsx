import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../LanguageSwitcher";
import HeaderNavitationTop from "@/components/frontend/HeaderNavigationTop";
import AccountItem from "./AccountItem";

export default function HeaderTop() {
    const t = useTranslations("String");

    return (
        <HeaderNavitationTop>
            <Suspense fallback={<>...loading account</>}>
                <AccountItem />
            </Suspense>
            <LanguageSwitcher />
        </HeaderNavitationTop>
    );
}
