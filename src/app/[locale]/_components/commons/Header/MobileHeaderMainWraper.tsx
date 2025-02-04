import { getMobileMenu } from "@/actions/menu";
import UserButton from "./UserButton";
import HamburgerMenuButton from "./HamburgerMenuButton";
import { LangCode } from "@/models/management/cms/language.interface";
import { getMenuListFomatedTypes } from "@/utils/menu";
export interface MobileHeaderMainWraperProps {
  children?: React.ReactNode;
  locale: LangCode;
}
export default async function MobileHeaderMainWraper({ children, locale }: MobileHeaderMainWraperProps) {
  const mobileMenuResult = await getMobileMenu(locale);
  const { menuItems } = mobileMenuResult || {};
  const itemsList = menuItems ? getMenuListFomatedTypes(menuItems) : [];

  return (
    <div className="flex items-center">
      <UserButton isMobile={true} />
      <div className="space mx-2 text-xs text-gray-400">|</div>
      <HamburgerMenuButton items={itemsList} />
    </div>
  );
}
