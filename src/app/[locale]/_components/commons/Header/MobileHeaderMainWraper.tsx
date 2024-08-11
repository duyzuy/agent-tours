import { getMobileMenu } from "@/app/[locale]/_actions/menu";
import AccountItem from "./AccountItem";
import MenuMobileNavs, { MenuMobileNavsProps } from "./MenuMobileNavs";
import { LangCode } from "@/models/management/cms/language.interface";
import { getLocale } from "next-intl/server";
import { getMenuListFomatedTypes } from "@/utils/menu";
export interface MobileHeaderMainWraperProps {
  isMobile?: boolean;
}
export default async function MobileHeaderMainWraper({ isMobile }: MobileHeaderMainWraperProps) {
  const locale = await getLocale();

  const mobileMenuResult = await getMobileMenu(locale as LangCode);

  const { menuItems } = mobileMenuResult || {};

  const mobileMenuItems = menuItems ? getMenuListFomatedTypes(menuItems) : [];

  return (
    <>
      <AccountItem isMobile={true} />
      <div className="space mx-2 text-xs text-gray-400">|</div>
      <MenuMobileNavs items={mobileMenuItems} />
    </>
  );
}
