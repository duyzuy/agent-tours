import { Space } from "antd";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { authOptions } from "@/auth";
import { IconAccount } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import UserCardDropdown, { UserCardDropdownSkeleton } from "./UserCardDropdown";

const DynamicUserCardDropdown = dynamic(() => import("./UserCardDropdown"), {
  ssr: false,
  loading: () => <UserCardDropdownSkeleton />,
});
interface UserButtonProps {
  isMobile: boolean;
  className?: string;
}
export default async function UserButton({ isMobile }: UserButtonProps) {
  const session = await getServerSession(authOptions);

  const isAuth = !!session;

  return isAuth ? <UserButtonAuthenticated isMobile={isMobile} /> : <UserButtonUnAuthenticated isMobile={isMobile} />;
}

async function UserButtonAuthenticated({ isMobile }: { isMobile: boolean }) {
  const t = await getTranslations("String");

  const MENU_ITEMS = [
    { id: 1, label: t("myAccount"), link: "/customer" },
    { id: 2, label: t("order"), link: "/customer/order" },
  ];

  return isMobile ? (
    <Link href={CLIENT_LINKS.Customer} className="w-8 h-8 inline-flex items-center justify-center">
      <IconAccount className="w-5 h-5 !text-gray-800" />
    </Link>
  ) : (
    <DynamicUserCardDropdown>
      {MENU_ITEMS.map((item) => (
        <Link key={item.id} href={item.link} className="block py-2 px-3 hover:bg-slate-100 rounded-md !text-gray-800">
          {item.label}
        </Link>
      ))}
    </DynamicUserCardDropdown>
  );
}

async function UserButtonUnAuthenticated({ isMobile }: { isMobile: boolean }) {
  const t = await getTranslations("String");
  return isMobile ? (
    <Link href={CLIENT_LINKS.CustomerLogin} className="w-8 h-8 inline-flex items-center justify-center">
      <IconAccount className="w-5 h-5 !text-gray-800" />
    </Link>
  ) : (
    <Space>
      <Link href={`/${CLIENT_LINKS.CustomerLogin}`} className="inline-block">
        <span className="text-gray-800 hover:text-primary-default font-[500]">{t("login")}</span>
      </Link>
      <span className="text-gray-400 text-xs">|</span>
      <Link href={`/${CLIENT_LINKS.CustomerRegister}`} className="inline-block">
        <span className="text-gray-800 hover:text-primary-default font-[500]">{t("register")}</span>
      </Link>
    </Space>
  );
}
