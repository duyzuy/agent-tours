"use client";
import { LangCode } from "@/models/management/cms/language.interface";
import BookingBreakDown from "./_components/BookingBreakDown";
import BookingSteps from "./_components/BookingSteps";
import { usePathname } from "@/utils/navigation";
interface Props {
    children: React.ReactNode;
    params: { locale: LangCode };
}

export default function FeBookingLayout({
    children,
    params: { locale },
}: Props) {
    const pathname = usePathname();
    let activeKey = 0;

    if (pathname.startsWith("/passenger")) {
        activeKey = 1;
    }

    if (pathname.startsWith("/payment")) {
        activeKey = 2;
    }
    if (pathname.startsWith("/thankyou")) {
        activeKey = 3;
    }
    return (
        <div className="bg-gray-100">
            <BookingSteps activeKey={activeKey} />
            <div className="container lg:px-8 md:px-6 px-3 mx-auto py-12 flex flex-wrap">
                <div className="page__layout-wraper w-full lg:w-7/12 lg:mb-0 mb-6">
                    {children}
                </div>
                <BookingBreakDown className="w-full lg:w-5/12 lg:pl-8" />
            </div>
        </div>
    );
}
