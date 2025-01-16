import { getMobileMenu } from "@/actions/menu";
import UserButton from "./UserButton";
import MobileMenuItems from "./MobileMenuItems";
import { LangCode } from "@/models/management/cms/language.interface";
import { getLocale } from "next-intl/server";
import { getMenuListFomatedTypes } from "@/utils/menu";
export interface MobileHeaderMainWraperProps {
  children?: React.ReactNode;
}
export default async function MobileHeaderMainWraper({ children }: MobileHeaderMainWraperProps) {
  const locale = await getLocale();

  const mobileMenuResult = await getMobileMenu(locale as LangCode);

  const { menuItems } = mobileMenuResult || {};

  const mobileMenuItems = menuItems ? getMenuListFomatedTypes(menuItems) : [];

  return (
    <>
      <UserButton isMobile={true} />
      <div className="space mx-2 text-xs text-gray-400">|</div>
      <MobileMenuItems items={mobileMenuItems} />
    </>
  );
}
