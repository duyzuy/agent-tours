import { Suspense } from "react";
import { getLocale } from "next-intl/server";
import Logo from "@/components/frontend/partials/Logo";
import TopMenuHeader from "@/components/frontend/TopMenuHeader";
import UserButton from "./UserButton";
import LanguageSwitcher from "../../LanguageSwitcher";
import MobileHeaderMainWraper from "./MobileHeaderMainWraper";
import PrimaryMenuHeader from "./PrimaryMenuHeader";
import { getPrimaryMenu } from "@/actions/menu";

import { LangCode } from "@/models/management/cms/language.interface";
import { getMenuListFomatedTypes } from "@/utils/menu";
import { isMobile } from "@/utils/detectMobile";
// import { headers } from "next/headers";

export default async function Header() {
  const locale = (await getLocale()) as LangCode;
  // const headersList = headers();
  // const pathname = headersList.get("x-pathname");
  // const [_, curLang, contentType] = pathname?.split("/") || [];

  const primaryMenuResult = await getPrimaryMenu(locale);

  const { menuPosition, menuItems: primaryItems, lang } = primaryMenuResult || {};

  const menuItems = primaryItems ? getMenuListFomatedTypes(primaryItems) : [];

  return (
    <header className="bg-white drop-shadow-sm relative z-40">
      <nav className="mx-auto flex items-center justify-between lg:py-4 py-3 container px-3 md:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Logo alt="Logo An Thai" width={240} height={80} className="w-32 lg:w-52" />
        </div>
        {isMobile() ? (
          <MobileHeaderMainWraper locale={locale} />
        ) : (
          <div className="hidden lg:block lg:gap-x-12">
            <TopMenuHeader>
              <UserButton />
              <LanguageSwitcher mode="dropdown" />
            </TopMenuHeader>
            <PrimaryMenuHeader items={menuItems} />
          </div>
        )}
      </nav>
    </header>
  );
}
