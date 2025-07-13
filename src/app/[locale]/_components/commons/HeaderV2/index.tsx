import Logo from "@/components/frontend/partials/Logo";
import UserButton from "./UserButton";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link } from "@/utils/navigation";
import ButtonHamburgerSecondary from "./ButtonHamburgerMenuSecondary";
import PrimaryMenuItems from "./PrimaryMenuItems";
import PrimaryMenuWraperClient from "./PrimaryMenuWraperClient";
import { IconDiscount, IconScrollText } from "@/assets/icons";
import { isMobile } from "@/utils/detectMobile";
import ButtonHamburgerMenuMobile from "./ButtonHamburgerMenuMobile";

interface HeaderV2Props {
  params: Record<string, any>;
}
export default async function HeaderV2({ params }: HeaderV2Props) {
  if (isMobile()) {
    return (
      <header className="bg-white drop-shadow-sm relative z-40">
        <nav className="mx-auto container px-3 md:px-6 lg:px-8 py-3">
          <div className="header-top flex items-center justify-between w-full">
            <div className="flex">
              <Logo alt="Logo An Thai" width={240} height={80} className="w-32 lg:w-52" />
            </div>
            <div className="flex-1 flex items-center gap-x-1 justify-end">
              <div className="ml-auto inline-flex items-center gap-x-1">
                <LanguageSwitcher mode="dropdown" />
                <UserButton isMobile={true} />
                <ButtonHamburgerMenuMobile />
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  return (
    <header className="bg-white drop-shadow-sm relative z-40">
      <nav className="mx-auto container px-3 md:px-6 lg:px-8 py-3">
        <div className="header-top flex items-center justify-between w-full">
          <div className="flex">
            <Logo alt="Logo An Thai" width={240} height={80} className="w-32 lg:w-52" />
          </div>
          <div className="flex-1 flex items-center gap-x-1 justify-end">
            <div className="ml-auto inline-flex items-center gap-x-3">
              <ul className="flex items-center gap-x-3">
                <li>
                  <NavLink label="Khuyến mại" icon={<IconDiscount className="w-5 h-5" />} href="/category/khuyen-mai" />
                </li>
                <li>
                  <NavLink label="Tin tức" icon={<IconScrollText className="w-5 h-5" />} href="/blog" />
                </li>
              </ul>
              <LanguageSwitcher mode="dropdown" />
              <UserButton isMobile={false} />
              <ButtonHamburgerSecondary />
            </div>
          </div>
        </div>
      </nav>
      <PrimaryMenuWraperClient>
        <div className="border-t">
          <nav className="mx-auto container px-3 md:px-6 lg:px-8 py-2">
            <div className="hidden lg:block lg:gap-x-12">
              <PrimaryMenuItems />
            </div>
          </nav>
        </div>
      </PrimaryMenuWraperClient>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}
const NavLink: React.FC<NavLinkProps> = ({ label, href, icon }) => {
  return (
    <Link
      href={href}
      className="!text-gray-600 hover:bg-slate-100 px-3 py-2 font-[500] rounded-full inline-block leading-none"
    >
      <span className="inline-flex items-center gap-x-2">
        {icon ? icon : null}
        <span>{label}</span>
      </span>
    </Link>
  );
};
