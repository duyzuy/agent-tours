"use client";
import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Space } from "antd";
import { Link } from "@/utils/navigation";
import { Button } from "antd";
import { IconAccount } from "@/assets/icons";
import { signOut } from "next-auth/react";
import { LogoutOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";
import { useEffect } from "react";
import { usePathname } from "@/utils/navigation";
interface CardDropdownProps {
    isAuth?: boolean;
    username?: string | null;
    children?: React.ReactNode;
}
const CardDropdown: React.FC<CardDropdownProps> = ({
    isAuth,
    username,
    children,
}) => {
    const t = useTranslations("String");
    const pathname = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutSide(dropdownRef, () => {
        setShowDropdown(false);
    });

    useEffect(() => {
        setShowDropdown(false);
    }, [pathname]);
    return (
        <div className="item-account">
            {!isAuth ? (
                <Space className="inner">
                    <div>
                        <Button type="primary" shape="round">
                            <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>
                                {t("login")}
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button type="primary" ghost shape="round">
                            <Link href={`/${CLIENT_LINKS.CustomerRegister}`}>
                                {t("register")}
                            </Link>
                        </Button>
                    </div>
                </Space>
            ) : (
                <div className="relative">
                    <div
                        className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                        onClick={toggleDropdown}
                    >
                        <span className="mr-2">
                            <IconAccount className="w-5 h-5" />
                        </span>
                        <span className="name">{username}</span>
                    </div>
                    {showDropdown ? (
                        <div
                            className="account__item-dropdown absolute z-10"
                            ref={dropdownRef}
                        >
                            <div className="inner bg-white px-4 py-3 w-48 drop-shadow-lg rounded-md text-left">
                                <ul className="">
                                    <li>
                                        <Link
                                            href={`/${CLIENT_LINKS.Customer}`}
                                            className="block py-2 px-3 hover:bg-gray-100 rounded-md"
                                        >
                                            <span className="block  text-gray-600">
                                                {t("myAccount")}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="border-t pt-3 mt-3">
                                    <Button
                                        type="text"
                                        onClick={() => signOut()}
                                        className="w-full"
                                        icon={<LogoutOutlined />}
                                    >
                                        <span className="block  text-gray-600">
                                            {t("logOut")}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};
export default CardDropdown;
