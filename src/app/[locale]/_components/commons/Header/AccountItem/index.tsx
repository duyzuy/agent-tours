import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import CardDropdown from "./CardDropdown";
import { IconAccount, IconUser } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";

interface AccountItemProps {
  isMobile?: boolean;
  className?: string;
}
export default async function AccountItem({ isMobile }: AccountItemProps) {
  const session = await getServerSession(authOptions);

  const isAuth = !!session;
  return isMobile ? (
    <div className="block">
      <Link href={isAuth ? `/${CLIENT_LINKS.Customer}` : `/${CLIENT_LINKS.CustomerLogin}`}>
        <span className="text-gray-800">
          <IconUser className="w-5 h-5" />
        </span>
      </Link>
    </div>
  ) : (
    <CardDropdown isAuth={isAuth} username={session?.user.name}></CardDropdown>
  );
}
