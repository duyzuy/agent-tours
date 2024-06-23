"use client";
import CustomTabs from "@/components/frontend/CustomTabs";

import Image from "next/image";

import {
    IconScrollText,
    IconCalendarCheck,
    IconCalendarPlus,
    IconClipboard,
} from "@/assets/icons";
import TourInformationPanel from "./tourPanels/TourInformationPanel";
import { FeTemplateContentResponse } from "@/models/fe/templateContent.interface";

interface ProductContentProps {
    data: FeTemplateContentResponse["result"][0];
}
const ProductContent: React.FC<ProductContentProps> = ({ data }) => {
    const tourInformationsListContent = data.includeAndNotes.metaContent.reduce<
        { content: string; key: string; name: string }[]
    >((acc, item, _index) => {
        return [
            ...acc,
            {
                name: item.title,
                content: item.content,
                key: (_index + 1).toString(),
            },
        ];
    }, []);

    const tourScheduleContent = data.itineraries.metaContent.reduce<
        { content: string; key: string; name: string }[]
    >((acc, item, _index) => {
        return [
            ...acc,
            {
                name: item.title,
                content: item.content,
                key: (_index + 1).toString(),
            },
        ];
    }, []);

    const tabPanels = [
        {
            label: `THÔNG TIN TOUR`,
            key: "tourInformation",
            icon: <IconScrollText />,
            children: (
                <TourInformationPanel
                    descriptions={data.includeAndNotes.content}
                    items={tourInformationsListContent}
                />
            ),
        },
        {
            label: "LỊCH TRÌNH TOUR",
            key: "tourSchedule",
            icon: <IconCalendarCheck />,
            children: (
                <TourInformationPanel
                    descriptions={data.itineraries.content}
                    items={tourScheduleContent}
                />
            ),
        },
        // {
        //     label: "LỊCH KHỞI HÀNH KHÁC",
        //     key: "anotherSchedule",
        //     icon: <IconCalendarPlus />,
        //     children: <>lich khoi hanh</>,
        // },
        // {
        //     label: "THỦ TỤC XIN VISA",
        //     key: "visaService",
        //     icon: <IconClipboard />,
        //     children: <>visa service</>,
        // },
    ];

    return (
        <CustomTabs
            defaultActiveKey="tourInformation"
            tabBarGutter={60}
            items={tabPanels}
        />
    );
};
export default ProductContent;
