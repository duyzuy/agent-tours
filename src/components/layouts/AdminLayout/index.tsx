import React, { memo, Suspense } from "react";
import { originalLogo } from "@/assets";
import Image from "next/image";
import classNames from "classnames";
import AdminLoading from "./Loading";
import Header from "./Header";
import LayoutWraper from "./LayoutWraper";
import MenuContent from "./MenuContent";
import { ADMIN_MENU_ITEMS } from "./menuConfig";
interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <LayoutWraper
      header={<Header />}
      sidebar={
        <>
          <div className={classNames("h-16 flex items-center px-4")}>
            <Image src={originalLogo} alt="logo" priority className="w-full max-w-[120px] mx-auto" />
          </div>
          <div
            className="flex-1 overflow-y-auto"
            style={{
              height: "calc(100% - 64px)",
              scrollbarWidth: "none",
              scrollbarGutter: "inherit",
              insetInlineStart: 0,
            }}
          >
            <MenuContent items={ADMIN_MENU_ITEMS} />
          </div>
        </>
      }
      footer={<p className="text-sm">Tour Management ©2023 Created by DVU</p>}
    >
      <Suspense fallback={<AdminLoading />}>{children}</Suspense>
    </LayoutWraper>
  );
};
export default memo(AdminLayout);
