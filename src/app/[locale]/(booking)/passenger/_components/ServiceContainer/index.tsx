import { useEffect } from "react";
import useInitServiceList from "../../modules/useInitServiceList";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import ProductServicesListEntry from "./ProductServicesListEntry";
import classNames from "classnames";
import { Spin } from "antd";
import { FeBookingInformation } from "../../../modules/booking.interface";

import { isUndefined } from "lodash";

enum ESubmitAction {
    SET_PASSENGER_INFO = "SET_PASSENGER_INFO",
    NEXT_TO_PAYMENT = "NEXT_TO_PAYMENT",
}

interface ServiceContainerProps {
    className?: string;
    passengerList?: FeBookingInformation["bookingInfo"]["passengers"];
    showService?: boolean;
    isCompletedPassengerInfo?: boolean;
    setNextAction: React.Dispatch<React.SetStateAction<ESubmitAction>>;
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({
    className = "",
    passengerList,
    showService,
    isCompletedPassengerInfo = false,
    setNextAction,
}) => {
    const { initServiceBooking, isPending } = useInitServiceList();
    const product = useBookingSelector((state) => state.bookingInfo.product);
    const servicePriceConfigList = useBookingSelector(
        (state) => state.servicePriceConfigs,
    );

    useEffect(() => {
        if (!isPending && !isUndefined(servicePriceConfigList)) {
            if (!servicePriceConfigList.length) {
                setNextAction(ESubmitAction.NEXT_TO_PAYMENT);
            }
        }
    }, [isPending, servicePriceConfigList]);

    useEffect(() => {
        product && initServiceBooking(product.recId);
    }, [product]);

    if (isPending) {
        return <Spin />;
    }
    if (
        !servicePriceConfigList ||
        !servicePriceConfigList.length ||
        !showService
    ) {
        return null;
    }

    return (
        <div
            className={classNames("service-container-wraper", {
                [className]: className,
            })}
        >
            <div className="service-container-wraper__head mb-6">
                <h3 className="text-xl font-[500]">Dịch vụ</h3>
            </div>
            <div className="service-container-wraper__body">
                <ProductServicesListEntry
                    priceConfigs={servicePriceConfigList}
                />
            </div>
        </div>
    );
};
export default ServiceContainer;
