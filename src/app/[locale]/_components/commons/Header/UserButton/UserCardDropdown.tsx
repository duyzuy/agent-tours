"use client";
import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Space } from "antd";
import { Link } from "@/utils/navigation";
import { Button } from "antd";
import { IconAccount } from "@/assets/icons";
import { signOut } from "next-auth/react";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { useClickOutSide } from "@/hooks/fe/useClickOutSide";
import { useEffect } from "react";
import { usePathname } from "@/utils/navigation";

interface UserCardDropdownProps {
  isAuth?: boolean;
  username?: string | null;
  children?: React.ReactNode;
  session: any;
}
const UserCardDropdown: React.FC<UserCardDropdownProps> = ({ isAuth, username, children, session }) => {
  const t = useTranslations("String");

  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutSide(dropdownRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <div className="item-account relative">
      {isAuth ? (
        <>
          <Button
            type="text"
            icon={<IconAccount className="w-5 h-5" />}
            onClick={toggleDropdown}
            className="!inline-flex items-center !px-3"
          >
            {username}
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
        </>
      ) : (
        <Space className="inner">
          <Link href={`/${CLIENT_LINKS.CustomerLogin}`} className="inline-block">
            <span className="text-gray-800 hover:text-primary-default font-[500]">{t("login")}</span>
          </Link>
          <span className="text-gray-400 text-xs">|</span>
          <Link href={`/${CLIENT_LINKS.CustomerRegister}`} className="inline-block">
            <span className="text-gray-800 hover:text-primary-default font-[500]">{t("register")}</span>
          </Link>
        </Space>
      )}
    </div>
  );
};
export default UserCardDropdown;
