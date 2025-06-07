import { getLocale } from "next-intl/server";
import { getPrimaryMenu, getMobileMenu } from "@/actions/menu";
import { LangCode } from "@/models/management/cms/language.interface";
import { getMenuListFomatedTypes } from "@/utils/menu";
import { isMobile } from "@/utils/detectMobile";
import Logo from "@/components/frontend/partials/Logo";
import HamburgerMenuButton from "./HamburgerMenuButton";
import UserButton from "./UserButton";
import LanguageSwitcher from "../../LanguageSwitcher";
import PrimaryMenuHeader from "./PrimaryMenuHeader";

async function getMenuListByMobileOrDesktop(isMobile: boolean, locale: LangCode) {
  return isMobile ? await getMobileMenu(locale) : await getPrimaryMenu(locale);
}
export default async function Header() {
  const locale = (await getLocale()) as LangCode;

  const menuResult = await getMenuListByMobileOrDesktop(isMobile(), locale);

  const menuItems = getMenuListFomatedTypes(menuResult?.menuItems || []);
  return (
    <header className="bg-white drop-shadow-sm relative z-40">
      <nav className="mx-auto flex items-center justify-between lg:py-4 py-3 container px-3 md:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Logo alt="Logo An Thai" width={240} height={80} className="w-32 lg:w-52" />
        </div>
        {isMobile() ? (
          <div className="flex items-center gap-x-1">
            <UserButton isMobile={true} />
            <LanguageSwitcher hideLabel={true} mode="drawer" />
            <HamburgerMenuButton items={menuItems} />
          </div>
        ) : (
          <div className="hidden lg:block lg:gap-x-12">
            <div className="flex items-center gap-x-1 justify-end">
              <UserButton isMobile={false} />
              <LanguageSwitcher mode="dropdown" />
            </div>
            <PrimaryMenuHeader items={menuItems} className="mt-2" />
          </div>
        )}
      </nav>
    </header>
  );
}
