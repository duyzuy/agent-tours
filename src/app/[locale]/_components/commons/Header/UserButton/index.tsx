import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import UserCardDropdown from "./UserCardDropdown";
import { IconAccount, IconUser } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";

interface UserButtonProps {
  isMobile?: boolean;
  className?: string;
}
export default async function UserButton({ isMobile }: UserButtonProps) {
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
    <UserCardDropdown isAuth={isAuth} session={session} username={session?.user.name}></UserCardDropdown>
  );
}
