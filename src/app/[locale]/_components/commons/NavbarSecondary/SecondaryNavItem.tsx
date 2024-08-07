import { ICON_LIST } from "@/constants/icons.constant";
import { MenuItemType } from "@/utils/menu";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import { Link } from "@/utils/navigation";
import classNames from "classnames";
interface SecondaryNavItemProps {
  name?: string;
  iconName?: string;
  descriptions?: string;
  items?: MenuItemType[];
  isMega?: boolean;
  className?: string;
  slug?: string;
}
const SecondaryNavItem: React.FC<SecondaryNavItemProps> = ({
  name,
  iconName,
  items,
  isMega,
  className = "",
  descriptions,
  slug,
}) => {
  const icItem = ICON_LIST.find((ic) => ic.key === iconName);
  return (
    <div
      className={classNames("menu-secondary-item group/item", {
        [className]: className,
      })}
    >
      <div className="menu-secondary-item__name group-hover/item:bg-white/10 cursor-pointer px-4 py-2 rounded-md">
        <Link href={slug ?? "/"}>
          <span className="flex items-center">
            {icItem ? (
              <span className="mr-2">
                <icItem.icon stroke="white" />
              </span>
            ) : null}
            <span className="nav-link-text text-white font-[500]">{name}</span>
          </span>
        </Link>
      </div>
      {isMega ? (
        <MegaMenuDropdown
          name={name}
          descriptions={descriptions}
          items={items}
          className="w-full left-0 right-0 pt-4 absolute invisible group-hover/item:visible"
        />
      ) : (
        <MenuDropdownItem
          name={name}
          items={items}
          className="w-[260px] pt-4 absolute invisible group-hover/item:visible"
        />
      )}
    </div>
  );
};
export default SecondaryNavItem;

interface MenuDropdownItemProps {
  name?: string;
  items?: MenuItemType[];
  className?: string;
}
const MenuDropdownItem: React.FC<MenuDropdownItemProps> = ({ name, items, className = "" }) => {
  if (!items || !items.length) {
    return null;
  }
  return (
    <div
      className={classNames("menu-secondary-item__dropdown-item ", {
        [className]: className,
      })}
    >
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
        <div className="menu-secondary-item__dropdown-head py-2 mb-3 hidden">
          <h4 className="text-lg font-[500]">{name}</h4>
        </div>
        <div className="menu-secondary-item__dropdown-body">
          <div className="sub-item-list">
            {items?.map(({ name, slug, objectType, id }) => (
              <div className="child-item mb-2 py-1" key={id}>
                <NavLink href={slug} title={name} target={objectType === "custom" ? "_blank" : "_self"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
interface MegaMenuDropdownProps {
  name?: string;
  descriptions?: string;
  items?: MenuItemType[];
  className?: string;
}
const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({ name, items, className = "", descriptions }) => {
  if (!items || !items.length) {
    return null;
  }
  return (
    <div
      className={classNames("menu-secondary-item__dropdown", {
        [className]: className,
      })}
    >
      <div className="menu-secondary-item__dropdown-inner bg-white rounded-lg w-full py-6 px-6 shadow-lg">
        <div className="menu-secondary-item__dropdown-head py-2 mb-3 hidden">
          <h5 className="text-lg font-[500]">{name}</h5>
          {descriptions ? <div className="descriptions text-gray-500 text-xs">{descriptions}</div> : null}
        </div>
        <div className="menu-secondary-item__dropdown-body">
          <div className="menu-secondary-item__dropdown-row flex flex-wrap -mx-3">
            {items?.map((mItem) => (
              <MegaMenuColumn name={mItem.name} items={mItem.children} key={mItem.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MegaMenuColumnProps {
  name?: string;
  items?: MenuItemType[];
  className?: string;
}

const MegaMenuColumn: React.FC<MegaMenuColumnProps> = ({ name, items }) => {
  return (
    <div className="menu-secondary-column w-1/5 px-3">
      <div className="sub-item-name mb-3">
        <span className="text-red-600 font-[500] text-base">{name}</span>
      </div>
      <div className="sub-item-list">
        {items?.map(({ id, slug, name, objectType }) => (
          <div className="child-item mb-2 py-1" key={id}>
            <NavLink href={slug} title={name} target={objectType === "custom" ? "_blank" : "_self"} />
          </div>
        ))}
      </div>
    </div>
  );
};
