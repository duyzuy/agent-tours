import { ICON_LIST } from "@/constants/icons.constant";
import { MenuItemType } from "@/utils/menu";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import { Link } from "@/utils/navigation";
import classNames from "classnames";
interface SecondaryNavItemProps {
  name: string;
  iconName: string;
  descriptions: string;
  items: MenuItemType[];
  isMega: boolean;
  slug: string;
  className?: string;
}

const getMenuIcon = (name: string) => {
  return ICON_LIST.find((ic) => ic.key === name);
};
export default function SecondaryNavItem({
  name,
  iconName,
  items,
  isMega,
  className = "",
  descriptions,
  slug,
}: SecondaryNavItemProps) {
  const icItem = getMenuIcon(iconName);
  return (
    <div
      className={classNames("menu-secondary-item group/item", {
        [className]: className,
      })}
    >
      <Link
        href={slug ?? "/"}
        className="menu-secondary-item__link flex items-center group-hover/item:bg-white/10 cursor-pointer px-3 py-2 rounded-md"
      >
        {icItem ? <icItem.icon stroke="white" className="mr-2" /> : null}
        <span className="nav-link-text text-white font-[500]">{name}</span>
      </Link>
      {isMega ? (
        <SecondaryNavItem.MegaDropdown
          name={name}
          descriptions={descriptions}
          items={items}
          className="w-full left-0 right-0 pt-4 absolute invisible group-hover/item:visible"
        />
      ) : (
        <SecondaryNavItem.Dropdown
          name={name}
          items={items}
          className="w-[260px] pt-4 absolute invisible group-hover/item:visible"
        />
      )}
    </div>
  );
}

interface MenuDropdownItemProps {
  name?: string;
  items?: SecondaryNavItemProps["items"];
  className?: string;
}
function Dropdown({ name, items, className = "" }: MenuDropdownItemProps) {
  return items && items.length ? (
    <div
      className={classNames("dropdown", {
        [className]: className,
      })}
    >
      <div className="dropdown-item__inner bg-white px-6 py-4 rounded-lg shadow-lg">
        <ul className="sub-items">
          {items?.map(({ name, slug, objectType, id }) => (
            <li className="child-item mb-2 py-1" key={id}>
              <NavLink href={slug} title={name} target={objectType === "custom" ? "_blank" : "_self"} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}
interface MegaMenuDropdownProps {
  name?: string;
  descriptions?: string;
  items?: SecondaryNavItemProps["items"];
  className?: string;
}
function MegaMenuDropdown({ name, items, className = "", descriptions }: MegaMenuDropdownProps) {
  return items && items.length ? (
    <div
      className={classNames("mega-dropdown", {
        [className]: className,
      })}
    >
      <div className="mega-dropdown__inner bg-white rounded-lg w-full py-6 px-6 shadow-lg">
        <div className="grid grid-cols-5 gap-3">
          {items.map(({ children: items, name, id, slug, objectType }) => (
            <div className="menu-secondary-column" key={id}>
              <div className="sub-item-name text-rose-600 font-[500] text-base mb-3">
                <Link
                  href={slug}
                  title={name}
                  target={objectType === "custom" ? "_blank" : "_self"}
                  className="!text-rose-600"
                >
                  {name}
                </Link>
              </div>
              <ul className="sub-items">
                {items?.map(({ id, slug, name, objectType }) => (
                  <li className="child-item py-2" key={id}>
                    <NavLink href={slug} title={name} target={objectType === "custom" ? "_blank" : "_self"} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
SecondaryNavItem.Dropdown = Dropdown;
SecondaryNavItem.MegaDropdown = MegaMenuDropdown;
