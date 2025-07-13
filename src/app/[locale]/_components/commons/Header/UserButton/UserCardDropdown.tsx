"use client";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import { IconAccount } from "@/assets/icons";
import { LogoutOutlined } from "@ant-design/icons";
import React, { useState, useRef, memo, useMemo, Children } from "react";
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

  const userName = useMemo(() => {
    return userInfo?.profile?.fullname || userInfo?.profile?.user.username;
  }, [userInfo.profile?.fullname, userInfo.profile?.user.username]);

  useClickOutSide(dropdownRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <div className="item-account relative">
      <Button
        type="text"
        icon={<IconAccount className="w-5 h-5" />}
        onClick={() => setShowDropdown((prev) => !prev)}
        className="!inline-flex items-center justify-center hover:!bg-slate-100 !px-3 font-semibold"
      >
        {userName}
      </Button>
      {showDropdown ? (
        <div
          className="item-account__dropdown absolute z-10 bg-white px-4 py-3 w-48 drop-shadow-lg rounded-md text-left"
          ref={dropdownRef}
        >
          {Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                className: "block py-2 px-3 hover:bg-slate-100 rounded-md !text-gray-800",
              });
            }
          })}
          <div className="border-t pt-3 mt-3">
            <Button
              type="text"
              onClick={signOut}
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
