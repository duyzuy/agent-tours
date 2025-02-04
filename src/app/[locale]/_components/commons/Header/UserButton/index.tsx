import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { IconAccount, IconUser } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Space } from "antd";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { UserCardDropdownSkeleton } from "./UserCardDropdown";

const UserCardDropdown = dynamic(() => import("./UserCardDropdown"), {
  ssr: false,
  loading: () => <UserCardDropdownSkeleton />,
});
interface UserButtonProps {
  isMobile?: boolean;
  className?: string;
}
export default async function UserButton({ isMobile }: UserButtonProps) {
  const t = await getTranslations("String");
  const session = await getServerSession(authOptions);

  const isAuth = !!session;

  return isMobile ? (
    <Link
      href={isAuth ? `/${CLIENT_LINKS.Customer}` : `/${CLIENT_LINKS.CustomerLogin}`}
      className="w-8 h-8 inline-flex items-center justify-center"
    >
      <IconAccount className="w-5 h-5 !text-gray-800" />
    </Link>
  ) : (
    <>
      {isAuth ? (
        <UserCardDropdown />
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
      )}
    </>
  );
}
