import Logo from "@/components/frontend/partials/Logo";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import HeaderTop from "./HeaderTop";
import HeaderMain from "./HeaderMain";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { headers } from "next/headers";
const feBookingRoutes = ["passenger", "payment", "reservation"];
export default async function Header() {
    const headersList = headers();
    const domain = headersList.get("host") || "";
    const fullUrl = headersList.get("referer") || "";

    console.log({ fullUrl });
    return (
        <header className="bg-white drop-shadow-sm relative z-20">
            <nav className="mx-auto flex items-center justify-between py-4 container px-4 md:px-6 lg:px-8">
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
}
