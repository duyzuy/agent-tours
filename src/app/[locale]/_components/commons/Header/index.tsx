import Logo from "@/components/frontend/partials/Logo";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import HeaderTop from "./HeaderTop";
import HeaderMain from "./HeaderMain";

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
                    <HamburgerButton />
                </div>
                <div className="hidden lg:block lg:gap-x-12">
                    <HeaderTop />
                    <HeaderMain />
                </div>
            </nav>
        </header>
    );
};
export default Header;
