"use client";
import IconCalendar from "@/assets/icons/IconCalendar";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconHotel from "@/assets/icons/IconHotel";
import IconMeal from "@/assets/icons/IconMeal";
import IconPlane from "@/assets/icons/IconPlane";
import LineSpacing from "@/components/frontend/LineSpacing";
import CustomTabs from "@/components/frontend/CustomTabs";

import Image from "next/image";

import {
    IconScrollText,
    IconCalendarCheck,
    IconCalendarPlus,
    IconClipboard,
} from "@/assets/icons";

import TourInformationPanel from "../_components/tourPanels/TourInformationPanel";
import TourShedulePanel from "../_components/tourPanels/TourShedulePanel";
import BookingBreakDownBox from "../_components/BookingSummary";
import TourRelateds from "../_components/TourRelateds";
import TourReviews from "../_components/TourReviews";

const TourDetailPage = () => {
    const tabPanels = [
        {
            label: `THÔNG TIN TOUR`,
            key: "tourInfor",
            icon: <IconScrollText />,
            children: <TourInformationPanel />,
        },
        {
            label: "LỊCH TRÌNH TOUR",
            key: "tourSchedule",
            icon: <IconCalendarCheck />,
            children: <TourShedulePanel />,
        },
        {
            label: "LỊCH KHỞI HÀNH KHÁC",
            key: "anotherSchedule",
            icon: <IconCalendarPlus />,
            children: <>lich khoi hanh</>,
        },
        {
            label: "THỦ TỤC XIN VISA",
            key: "visaService",
            icon: <IconClipboard />,
            children: <>visa service</>,
        },
    ];

    return (
        <div className="page-detail">
            <div className="breakcrumb bg-gray-100">
                <div className="container mx-auto">
                    <ul className="flex items-center py-4">
                        <li className="text-xs font-bold text-gray-600">
                            AN THAI TRAVEL
                        </li>
                        <li className="mx-1">
                            <IconChevronRight className="w-4 h-4" />
                        </li>
                        <li className="text-xs font-bold text-gray-600">
                            TOUR TRONG NƯỚC
                        </li>
                        <li className="mx-1">
                            <IconChevronRight className="w-4 h-4" />
                        </li>
                        <li className="text-xs font-bold text-gray-600">
                            DU LỊCH HỘI AN
                        </li>
                        <li className="mx-1">
                            <IconChevronRight className="w-4 h-4" />
                        </li>
                        <li className="text-primary-default font-semibold text-xs">
                            TOUR ĐÀ NẴNG - THIÊN ĐƯỜNG MIỀN TRUNG
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto py-8">
                <div className="flex flex-wrap">
                    <div
                        className="tour-contents pr-8"
                        style={{ width: "calc(100% - 380px)" }}
                    >
                        <div className="tour-content-head mb-6">
                            <h1 className="text-xl text-primary-default font-bold">
                                Tour Đà Nẵng - Thiên đường miền Trung | 3N2D
                            </h1>
                            <p className="text-red-500 text-lg font-bold">
                                Mã Tour: #KDU82937
                            </p>
                        </div>
                        <div className="galleries">
                            <div className="feature mb-4">
                                <Image
                                    src="/assets/images/tour-detail/tour-detail-thumb.png"
                                    alt="thumbnail"
                                    width={1200}
                                    height={550}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="thumbnails flex items-center gap-x-4">
                                <Image
                                    src="/assets/images/tour-detail/tour-detail-thumb-1.png"
                                    alt="thumbnail"
                                    width={220}
                                    height={180}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/assets/images/tour-detail/tour-detail-thumb-2.png"
                                    alt="thumbnail"
                                    width={220}
                                    height={180}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/assets/images/tour-detail/tour-detail-thumb-3.png"
                                    alt="thumbnail"
                                    width={220}
                                    height={180}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/assets/images/tour-detail/tour-detail-thumb-4.png"
                                    alt="thumbnail"
                                    width={220}
                                    height={180}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="features py-6">
                            <ul className="feature-list flex items-center">
                                <li className="feature-item w-1/4">
                                    <p className="label flex items-center">
                                        <IconCalendar
                                            width={16}
                                            className="mr-2"
                                        />
                                        <span className="text-xs">
                                            Thời gian
                                        </span>
                                    </p>
                                    <p className="value font-semibold">
                                        3 ngày 2 đêm
                                    </p>
                                </li>
                                <li className="feature-item w-1/4">
                                    <p className="label flex items-center">
                                        <IconPlane
                                            width={16}
                                            className="mr-2"
                                        />
                                        <span className="text-xs">
                                            Phương tiện
                                        </span>
                                    </p>
                                    <p className="value font-semibold">
                                        Máy bay, xe du lịch
                                    </p>
                                </li>
                                <li className="feature-item w-1/4">
                                    <p className="label flex items-center">
                                        <IconHotel
                                            width={16}
                                            className="mr-2"
                                        />
                                        <span className="text-xs">
                                            Khách sạn
                                        </span>
                                    </p>
                                    <p className="value font-semibold">
                                        Khách sạn từ 4*
                                    </p>
                                </li>
                                <li className="feature-item w-1/4">
                                    <p className="label flex items-center">
                                        <IconMeal width={16} className="mr-2" />
                                        <span className="text-xs">Ẩm thực</span>
                                    </p>
                                    <p className="value font-semibold">
                                        Buffet sáng, theo thực đơn
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <LineSpacing spaceY={12} />
                        <CustomTabs
                            defaultActiveKey="tourInfor"
                            tabBarGutter={60}
                            items={tabPanels}
                        />
                        <div className="space h-8"></div>
                        <TourRelateds className="mb-8" />
                        <TourReviews />
                    </div>
                    <BookingBreakDownBox className="w-full max-w-[380px]" />
                </div>
            </div>
        </div>
    );
};
export default TourDetailPage;
