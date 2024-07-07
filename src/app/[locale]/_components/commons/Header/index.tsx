import Logo from "@/components/frontend/partials/Logo";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import HeaderMainWraper, { HeaderMainWraperProps } from "./HeaderMainWraper";
import HeaderNavitationTop from "@/components/frontend/HeaderNavigationTop";
import { Suspense } from "react";
import AccountItem from "./AccountItem";
import LanguageSwitcher from "../../LanguageSwitcher";

export default async function Header() {
  const items: HeaderMainWraperProps["items"] = [
    {
      title: "Tra cứu Booking",
      description: "",
      href: "/",
      iconPath: "",
      isBlank: false,
      children: [
        {
          title: "Tra cứu Booking",
          description: "Your customers’ data will be safe and secure",
          href: "/",
          iconPath: "",
          isBlank: false,
        },
        {
          title: "Tra cứu Booking",
          description: "Your customers’ data will be safe and secure",
          href: "/",
          iconPath: "",
          isBlank: false,
        },
      ],
    },
    {
      title: "Giới thiệu",
      href: "/",
    },
    {
      title: "Tuyển dụng",
      href: "/",
    },
    {
      title: "Tin tức sự kiện",
      href: "/",
    },
  ];
  return (
    <header className="bg-white drop-shadow-sm relative z-20">
      <nav className="mx-auto flex items-center justify-between py-4 container px-4 md:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Logo alt="Logo An Thai" width={80} height={80} className="w-12 lg:w-auto" />
        </div>
        <div className="flex lg:hidden">
          <HamburgerButton />
        </div>
        <div className="hidden lg:block lg:gap-x-12">
          <HeaderNavitationTop>
            <Suspense fallback={<SkeletonAccountItem />}>
              <AccountItem />
            </Suspense>
            <LanguageSwitcher />
          </HeaderNavitationTop>
          <HeaderMainWraper items={items} />
        </div>
      </nav>
    </header>
  );
}

function SkeletonAccountItem() {
  return (
    <div className="animate-pulse flex items-center">
      <div className="bg-slate-100 rounded-full w-7 h-7 mr-2"></div>
      <div className="gap-y-1 flex flex-col">
        <div className="bg-slate-100 rounded-full w-12 h-2"></div>
        <div className="bg-slate-100 rounded-full w-6 h-2"></div>
      </div>
    </div>
  );
}
