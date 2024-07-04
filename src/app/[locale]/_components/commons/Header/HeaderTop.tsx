import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../../LanguageSwitcher";
import HeaderNavitationTop from "@/components/frontend/HeaderNavigationTop";
import AccountItem from "./AccountItem";

export default function HeaderTop() {
    const t = useTranslations("String");

    return (
        <HeaderNavitationTop>
            <Suspense fallback={<SkeletonAccountItem />}>
                <AccountItem />
            </Suspense>
            <LanguageSwitcher />
        </HeaderNavitationTop>
    );
}

function SkeletonAccountItem() {
    return (
        <div className="animate-pulse flex items-center">
            <div className="bg-slate-100 rounded-full w-7 h-7 mr-2"></div>
            <div className="gap-y-1 flex flex-col">
                <div className="bg-slate-100 rounded-full w-12 h-2"></div>
                <div className="bg-slate-100 rounded-full w-6 h-2"></div>
            </div>
        </div>
    );
}
