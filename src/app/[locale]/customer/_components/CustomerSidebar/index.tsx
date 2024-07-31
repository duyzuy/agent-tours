"use server";
import { Link } from "@/utils/navigation";
import { IconAccount, IconChevronRight, IconLogout, IconRecieptText, IconKeyRound, IconUser } from "@/assets/icons";
import classNames from "classnames";
import CustomerAvatarInformation from "@/components/frontend/CustomerAvatarInformation";
import { getTranslations } from "next-intl/server";
import SignOutButton from "./SignOutButton";

interface CustomerSidebarProps {
  username?: string;
  className?: string;
}
export default async function CustomerSidebar({ username, className = "" }: CustomerSidebarProps) {
  // const t = useTranslations("String");

  const t = await getTranslations("Customer");

  const NAV_ITEMS = [
    {
      title: t("navItem.accountInformation"),
      key: "account",
      icon: IconAccount,
      path: "/customer",
    },
    {
      title: t("navItem.order"),
      key: "orders",
      icon: IconRecieptText,
      path: "/customer/orders",
    },
    {
      title: t("navItem.changePassword"),
      key: "changePassword",
      icon: IconKeyRound,
      path: "/customer/change-password",
    },
  ];

  return (
    <div
      className={classNames("customer-sidebar", {
        [className]: className,
      })}
    >
      <CustomerAvatarInformation rankingLabel="Silver" levelLabel="LV1" username={username} />
      <div className="my-account__navs px-3 pt-6 pb-3 isolate">
        {NAV_ITEMS.map((item) => (
          <div className="py-3 px-3 hover:bg-gray-100 rounded-lg" key={item.key}>
            <Link href={item.path}>
              <span className="text-gray-800 flex items-center">
                {item.icon ? <item.icon className="mr-3 stroke-gray-800" /> : null}
                <span>{item.title}</span>
              </span>
            </Link>
          </div>
        ))}
        <SignOutButton title={t("navItem.signOut")} />
      </div>
    </div>
  );
}
