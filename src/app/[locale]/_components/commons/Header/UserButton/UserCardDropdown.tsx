"use client";
import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Link } from "@/utils/navigation";
import { Button } from "antd";
import { IconAccount } from "@/assets/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useRef, memo } from "react";
import { useClickOutSide } from "@/hooks/fe/useClickOutSide";
import { useEffect } from "react";
import { usePathname } from "@/utils/navigation";
import { useSignOut } from "@/modules/fe/auth/hooks/useSignOut";
import { useUserSelector } from "@/store";

interface UserCardDropdownProps {
  children?: React.ReactNode;
}
const UserCardDropdown: React.FC<UserCardDropdownProps> = ({ children }) => {
  const t = useTranslations("String");
  const userInfo = useUserSelector();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useSignOut();
  const [showDropdown, setShowDropdown] = useState(false);

  useClickOutSide(dropdownRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);
  console.log("UserCardDropdown render");
  return (
    <div className="item-account relative">
      <Button
        type="text"
        icon={<IconAccount className="w-5 h-5" />}
        onClick={() => setShowDropdown((prev) => !prev)}
        className="!inline-flex items-center justify-center"
      >
        {userInfo?.profile?.fullname}
      </Button>
      {showDropdown ? (
        <div
          className="account__item-dropdown absolute z-10 bg-white px-4 py-3 w-48 drop-shadow-lg rounded-md text-left"
          ref={dropdownRef}
        >
          <ul className="menu-list">
            <li>
              <Link
                href={`/${CLIENT_LINKS.Customer}`}
                className="block py-2 px-3 hover:bg-gray-100 rounded-md !text-gray-800"
              >
                {t("myAccount")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${CLIENT_LINKS.Customer}`}
                className="block py-2 px-3 hover:bg-gray-100 rounded-md !text-gray-800"
              >
                {t("order")}
              </Link>
            </li>
          </ul>
          <div className="border-t pt-3 mt-3">
            <Button
              type="text"
              onClick={() => signOut()}
              className="w-full !text-red-600 !hover:bg-gray-100"
              icon={<LogoutOutlined />}
            >
              {t("logOut")}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default memo(UserCardDropdown);

export function UserCardDropdownSkeleton() {
  return (
    <div className="animate-pulse flex items-center">
      <div className="bg-slate-100 rounded-full w-7 h-7 mr-2"></div>
      <div className="gap-y-1 flex flex-col">
        <div className="bg-slate-100 rounded-full w-24 h-2"></div>
        <div className="bg-slate-100 rounded-full w-6 h-2"></div>
      </div>
    </div>
  );
}
