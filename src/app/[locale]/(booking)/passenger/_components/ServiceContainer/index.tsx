import { useEffect } from "react";
import useInitServiceList from "../../modules/useInitServiceList";
import { useBookingInformation } from "@/app/[locale]/hooks/useBookingInformation";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import ProductServicesListEntry from "./ProductServicesListEntry";
import classNames from "classnames";
import { Spin } from "antd";
import { FeBookingInformation } from "../../../modules/booking.interface";

interface ServiceContainerProps {
    className?: string;
    passengerList?: FeBookingInformation["bookingInfo"]["passengers"];
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({
    className = "",
    passengerList,
}) => {
    const { initServiceBooking, isPending } = useInitServiceList();
    const product = useBookingSelector((state) => state.bookingInfo.product);
    const servicePriceConfigList = useBookingSelector(
        (state) => state.servicePriceConfigs,
    );

    useEffect(() => {
        product && initServiceBooking(product.recId);
    }, []);
    if (isPending) {
        return <Spin />;
    }
    return (
        <div
            className={classNames(
                "service-container-wraper bg-white rounded-lg p-6",
                { [className]: className },
            )}
        >
            <div className="service-container-wraper__head mb-6">
                <h3 className="text-xl font-[500]">Dịch vụ</h3>
            </div>
            <div className="service-container-wraper__body">
                {servicePriceConfigList ? (
                    <ProductServicesListEntry
                        priceConfigs={servicePriceConfigList}
                    />
                ) : (
                    <>no services</>
                )}
            </div>
        </div>
    );
};
export default ServiceContainer;
