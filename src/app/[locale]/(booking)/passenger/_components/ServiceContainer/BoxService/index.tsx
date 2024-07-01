import { useMemo, useState } from "react";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";
import { moneyFormatVND } from "@/utils/helper";
import { getLowestPriceService } from "@/utils/productService";
import DrawerServiceItem, { DrawerServiceItemProps } from "./DrawerServiceItem";

import { FeBookingInformation } from "@/app/[locale]/(booking)/modules/booking.interface";
import { isUndefined } from "lodash";
import { IBookingSsrItemWithPax } from "@/app/[locale]/(booking)/modules/booking.interface";
import useMessage from "@/hooks/useMessage";
import { UseBookingServicesProps } from "@/app/[locale]/(booking)/modules/useBookingServices";
import { IconChevronRight } from "@/assets/icons";
import useBookingSummary from "@/app/[locale]/(booking)/modules/useBookingSummary";
import classNames from "classnames";
interface BoxServiceProps {
    serviceName?: string;
    serviceId?: number;
    priceConfigs: FePriceConfig[];
    passengerList: FeBookingInformation["bookingInfo"]["passengers"];
    canBookService?: boolean;
    bookingSSRItems?: IBookingSsrItemWithPax[];
    onAddService: UseBookingServicesProps["addService"];
    className?: string;
}

const BoxService: React.FC<BoxServiceProps> = ({
    serviceName,
    serviceId,
    priceConfigs,
    passengerList,
    canBookService,
    bookingSSRItems,
    onAddService,
    className = "",
}) => {
    const [isOpenDrawer, setShowDrawer] = useState(false);
    const message = useMessage();
    const closeDrawer = () => {
        setShowDrawer(false);
    };
    const showDrawer = () => {
        if (!canBookService) {
            message.info("Vui lòng điền đầy đủ thông tin hành khách.");
            return;
        }
        setShowDrawer(true);
    };

    const { servicesBreakdown } = useBookingSummary();
    /**
     *
     * Take lowest priceConfig item in list
     *
     */
    const servicesBreakdownByServiceId = useMemo(() => {
        return servicesBreakdown && serviceId
            ? servicesBreakdown[serviceId]
            : undefined;
    }, [servicesBreakdown]);
    const getDefaultPriceConfig = (_index: number) => {
        let config: FePriceConfig | undefined = priceConfigs[_index];
        if (config.open === 0) {
            config = getDefaultPriceConfig(_index + 1);
        } else {
            return config;
        }
    };
    const priceConfigItem = useMemo(() => {
        const defaultConfig = getDefaultPriceConfig(0);

        if (priceConfigs.length === 1) return defaultConfig;

        if (!defaultConfig) return undefined;

        let outputConfig = { ...defaultConfig };

        priceConfigs.forEach((item) => {
            if (item.adult < outputConfig.adult && item.open > 0) {
                outputConfig = item;
            }
        });

        return outputConfig;
    }, [priceConfigs]);

    const handleAddBookingServiceItems: DrawerServiceItemProps["onConfirm"] = (
        bookingItems,
    ) => {
        if (isUndefined(serviceId) || isUndefined(serviceName)) {
            return;
        }

        onAddService(bookingItems || [], serviceId, serviceName);
    };

    return (
        <>
            <div
                className={classNames("service-item", {
                    [className]: className,
                })}
            >
                <div className="service-item__head py-3 px-4 border rounded-md">
                    <div
                        className="service-item__head-inner flex items-center justify-between cursor-pointer"
                        onClick={showDrawer}
                    >
                        <div>
                            <span className="block text-primary-default text-base">
                                {serviceName}
                            </span>
                            {bookingSSRItems && bookingSSRItems.length ? (
                                <div className="flex items-center mt-2">
                                    <span className="block mr-2">Đã chọn</span>
                                    <span className="text-white bg-emerald-600 w-6 h-6 text-center flex items-center justify-center rounded-full">
                                        {bookingSSRItems.length}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                        <div className="service-item__head-left">
                            <div className="flex items-center">
                                <span className="text-lg text-red-600 font-[500]">
                                    {moneyFormatVND(
                                        servicesBreakdownByServiceId
                                            ? servicesBreakdownByServiceId.subTotal
                                            : 0,
                                    )}
                                </span>
                                <span className="ml-2">
                                    <IconChevronRight />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-item__body"></div>
            </div>
            <DrawerServiceItem
                serviceName={serviceName}
                open={isOpenDrawer}
                onClose={closeDrawer}
                passengerBookingList={passengerList}
                defaultPriceConfig={priceConfigItem}
                bookingSSRItems={bookingSSRItems}
                priceConfigs={priceConfigs}
                onConfirm={handleAddBookingServiceItems}
            />
        </>
    );
};
export default BoxService;
