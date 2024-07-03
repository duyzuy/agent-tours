import NavItem from "@/components/frontend/base/NavItem";
import { IconSearch, IconShippingCart } from "@/assets/icons";

const HeaderMain = () => {
    return (
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
                            // iconPath:
                            //     "http://localhost:3000/api/uploads/ninh-binh/logo-1703491889324.svg",
                        },
                        {
                            title: "Security 2",
                            href: "",
                            // iconPath:
                            //     "http://localhost:3000/api/uploads/ninh-binh/logo-1703491889324.svg",
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
            <div className="space mx-1 text-xs text-gray-400">|</div>
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
    );
};
export default HeaderMain;
