import { LangCode } from "@/models/management/cms/language.interface";
import BookingBreakDown from "./_components/BookingBreakDown";
import BookingSteps from "./_components/BookingSteps";
interface Props {
    children: React.ReactNode;
    params: { locale: LangCode };
}

export default async function FeBookingLayout({
    children,
    params: { locale },
}: Props) {
    return (
        <div className="bg-gray-100">
            <BookingSteps />
            <div className="container lg:px-8 md:px-6 px-3 mx-auto py-12 flex flex-wrap">
                <div className="page__layout-wraper lg:w-7/12">{children}</div>
                <BookingBreakDown className="lg:w-5/12 lg:pl-8" />
            </div>
        </div>
    );
}
