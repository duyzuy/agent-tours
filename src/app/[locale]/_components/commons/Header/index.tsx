import Link from "next/link";
import IconShippingCart from "@/assets/icons/IconShoppingCart";
import IconAccount from "@/assets/icons/IconAccount";
import IconMail from "@/assets/icons/IconMail";
import IconSupport from "@/assets/icons/IconSupport";
import DropdownMenu from "./DropdownMenu";
import IconSearch from "@/assets/icons/IconSearch";
import Logo from "@/components/frontend/partials/Logo";
import NavLink from "../NavLink";
const Header = () => {
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
                                    label="Hỗ trợ"
                                    href="/"
                                    prefix={
                                        <IconSupport className="w-5 h-5 mr-2 stroke-gray-600" />
                                    }
                                />
                            </li>
                            <li className="px-3 py-2">
                                <NavLink
                                    label="Liên hệ"
                                    href="/"
                                    prefix={
                                        <IconMail className="w-5 h-5 mr-2 stroke-gray-600" />
                                    }
                                />
                            </li>
                            <li className="px-3 py-2">
                                <NavLink
                                    label="Thành viên"
                                    href="/"
                                    prefix={
                                        <IconAccount className="w-5 h-5 mr-2 stroke-gray-600" />
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-menu flex items-center">
                        <ul className="flex items-center">
                            <li className="relative group/item px-3 py-2">
                                <span
                                    className="flex items-center gap-x-1 font-semibold leading-6 text-primary-default cursor-pointer"
                                    aria-expanded="false"
                                >
                                    <span>Tra cứu Booking</span>
                                    <span className=" group-hover/item:rotate-180">
                                        <svg
                                            className="h-5 w-5 flex-none text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </span>
                                <DropdownMenu className="invisible group-hover/item:visible" />
                            </li>
                            <li className="relative px-3 py-2">
                                <Link href="/" className="font-semibold ">
                                    <span className="text-primary-default">
                                        Giới thiệu
                                    </span>
                                </Link>
                            </li>
                            <li className="relative px-3 py-2">
                                <Link
                                    href="/"
                                    className="font-semibold text-main-400"
                                >
                                    <span className="text-primary-default">
                                        Tuyển dụng
                                    </span>
                                </Link>
                            </li>
                            <li className="relative px-3 py-2">
                                <Link
                                    href="/"
                                    className="font-semibold text-main-400"
                                >
                                    <span className="text-primary-default">
                                        Tin tức sự kiện
                                    </span>
                                </Link>
                            </li>
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
