import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import CardDropdown from "./CardDropdown";
import { IconAccount, IconUser } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { getUserCustomerProfile } from "@/app/[locale]/customer/_actions/customer";
interface AccountItemProps {
  isMobile?: boolean;
  className?: string;
}
export default async function AccountItem({ isMobile }: AccountItemProps) {
  const session = await getServerSession(authOptions);

  const isAuth = !!session;

  return isMobile ? (
    <Link href={isAuth ? `/${CLIENT_LINKS.Customer}` : `/${CLIENT_LINKS.CustomerLogin}`}>
      <IconUser className="w-5 h-5 !text-gray-800" />
    </Link>
  ) : (
    <CardDropdown isAuth={isAuth} session={session} username={session?.user.name}></CardDropdown>
  );
}
