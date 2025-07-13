import { getMobileMenu, getPrimaryMenu } from "@/actions/menu";
import NavItem from "@/components/frontend/base/NavItem";
import { LangCode } from "@/models/management/cms/language.interface";
import { isMobile } from "@/utils/detectMobile";
import { getMenuListFomatedTypes } from "@/utils/menu";
import classNames from "classnames";
import { getLocale } from "next-intl/server";

async function getMenuListByMobileOrDesktop(isMobile: boolean, locale: LangCode) {
  return isMobile ? await getMobileMenu(locale) : await getPrimaryMenu(locale);
}
interface PrimaryMenuItemsProps {
  className?: string;
}
const PrimaryMenuItems: React.FC<PrimaryMenuItemsProps> = async ({ className = "" }) => {
  const locale = (await getLocale()) as LangCode;

  const menuResult = await getPrimaryMenu(locale);

  const primaryMenuItems = getMenuListFomatedTypes(menuResult?.menuItems || []);

  if (!primaryMenuItems.length) return null;

  return (
    <div
      className={classNames("primary-menu flex items-center", {
        [className]: className,
      })}
    >
      <div className="flex items-center">
        {primaryMenuItems.map((item, _index) => (
          <NavItem key={_index} name={item.name} slug={`${item.slug}`} items={item.children} />
        ))}
      </div>
    </div>
  );
};
export default PrimaryMenuItems;
