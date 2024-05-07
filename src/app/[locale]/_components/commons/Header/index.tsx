"use client";
import IconShippingCart from "@/assets/icons/IconShoppingCart";
import IconAccount from "@/assets/icons/IconAccount";
import IconMail from "@/assets/icons/IconMail";
import IconSupport from "@/assets/icons/IconSupport";
import IconSearch from "@/assets/icons/IconSearch";
import Logo from "@/components/frontend/partials/Logo";
import LanguageSwitcher from "@/components/frontend/partials/LanguageSwitcher";
import { useTranslations } from "next-intl";
import NavItem from "@/components/frontend/base/NavItem";
import NavLink from "@/components/frontend/base/NavItem/NavLink";

const Header = () => {
    const t = useTranslations("String");

    return (
        <header className="bg-white drop-shadow-sm relative z-20">
            <nav className="mx-auto flex items-center justify-between py-4 container px-4 lg:px-0">
                <div className="flex lg:flex-1">
                    <Logo
                        alt="Logo An Thai"
                        width={80}
                        height={80}
                        className="w-12 lg:w-auto"
                    />
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:block lg:gap-x-12">
                    <div className="top-menu text-right mb-2">
                        <ul className="flex items-center gap-x-2 justify-end">
                            <li className="px-3 py-2">
                                <NavLink
                                    title={t("support")}
                                    href="/"
                                    prefix={
                                        <IconSupport className="w-5 h-5 mr-2 stroke-gray-600" />
                                    }
                                />
                            </li>
                            <li className="px-3 py-2">
                                <NavLink
                                    title={t("contact")}
                                    href="/"
                                    prefix={
                                        <IconMail className="w-5 h-5 mr-2 stroke-gray-600" />
                                    }
                                />
                            </li>
                            <li className="px-3 py-2">
                                <NavLink
                                    title={t("login")}
                                    href="/"
                                    prefix={
                                        <IconAccount className="w-5 h-5 mr-2 stroke-gray-600" />
                                    }
                                />
                            </li>
                            <li>
                                <LanguageSwitcher />
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-menu flex items-center">
                        <ul className="flex items-center">
                            <NavItem
                                title="Tra cứu Booking"
                                hasDropdown
                                dropdownItems={[
                                    {
                                        title: "Security",
                                        description:
                                            "Your customers’ data will be safe and secure",
                                        href: "",
                                        iconPath:
                                            "http://localhost:3000/api/uploads/ninh-binh/logo-1703491889324.svg",
                                    },
                                    {
                                        title: "Security 2",
                                        href: "",
                                        iconPath:
                                            "http://localhost:3000/api/uploads/ninh-binh/logo-1703491889324.svg",
                                    },
                                    {
                                        title: "Security 3",
                                        href: "https://www.youtube.com/",
                                        description:
                                            "Your customers’ data will be safe and secure",
                                        isBlank: true,
                                    },
                                ]}
                            />
                            <NavItem title="Giới thiệu" />
                            <NavItem title="Tuyển dụng" />
                            <NavItem title="Tin tức sự kiện" />
                        </ul>
                        <div className="space mx-1 text-xs text-gray-400">
                            |
                        </div>
                        <ul className="flex items-center">
                            <li className="relative px-3 py-2">
                                <IconSearch />
                            </li>
                            <li className="relative px-3 py-2">
                                <div className="relative flex items-center pr-8">
                                    <span>
                                        <IconShippingCart />
                                    </span>
                                    <span className="absolute ml-8 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                                        3
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;
