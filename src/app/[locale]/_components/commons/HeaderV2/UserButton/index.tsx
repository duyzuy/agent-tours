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
    <Space size={8}>
      <Link
        href={`/${CLIENT_LINKS.CustomerLogin}`}
        className="inline-flex items-center justify-center h-10 bg-gradient-to-t from-blue-700 to-blue-500 px-3 rounded-lg min-w-[80px] lg:min-w-[100px] shadow-sm"
      >
        <span className="text-white font-[500] whitespace-nowrap">{t("login")}</span>
      </Link>
      <Link
        href={`/${CLIENT_LINKS.CustomerRegister}`}
        className="rounded-lg border h-10 inline-flex items-center justify-center px-3 border-blue-600 min-w-[80px] lg:min-w-[100px]"
      >
        <span className="text-blue-600 font-[500] whitespace-nowrap">{t("register")}</span>
      </Link>
    </Space>
  );
}
