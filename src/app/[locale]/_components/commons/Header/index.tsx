import Logo from "@/components/frontend/partials/Logo";
import HeaderNavigationTop from "@/components/frontend/HeaderNavigationTop";
import { Suspense } from "react";
import UserButton from "./UserButton";
import LanguageSwitcher from "../../LanguageSwitcher";
import MobileHeaderMainWraper from "./MobileHeaderMainWraper";
import HeaderMainWraper from "./HeaderMainWraper";
import { getPrimaryMenu } from "@/actions/menu";
import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";

import { getMenuListFomatedTypes } from "@/utils/menu";

export default async function Header() {
  const locale = await getLocale();

  const primaryMenuResult = await getPrimaryMenu(locale as LangCode);

  const { menuPosition, menuItems: primaryItems, lang } = primaryMenuResult || {};

  const menuItems = primaryItems ? getMenuListFomatedTypes(primaryItems) : [];

  return (
    <header className="bg-white drop-shadow-sm relative z-40">
      <nav className="mx-auto flex items-center justify-between lg:py-4 py-3 container px-4 md:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Logo alt="Logo An Thai" width={240} height={80} className="w-32 lg:w-52" />
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <MobileHeaderMainWraper />
        </div>
        <div className="hidden lg:block lg:gap-x-12">
          <HeaderNavigationTop>
            <Suspense fallback={<SkeletonAccountItem />}>
              <UserButton />
            </Suspense>
            <LanguageSwitcher />
          </HeaderNavigationTop>
          <HeaderMainWraper items={menuItems} />
        </div>
      </nav>
    </header>
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
