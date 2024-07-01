import { useState, useMemo, useCallback } from "react";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";
import { groupingProductServices } from "@/utils/productService";

import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import useBookingServices, {
    UseBookingServicesProps,
} from "../../../modules/useBookingServices";
import BoxService from "./BoxService";
import { isEmpty } from "lodash";

interface ProductServicesListEntryProps {
    priceConfigs: FePriceConfig[];
}

const ProductServicesListEntry: React.FC<ProductServicesListEntryProps> = ({
    priceConfigs,
}) => {
    const servicesGrouping = groupingProductServices(priceConfigs);
    const { passengers, bookingSsrWithPax } = useBookingSelector(
        (state) => state.bookingInfo,
    );
    const { addService } = useBookingServices();

    const getBookingSSRWithPaxByServiceId = useCallback(
        (sellableDetailId: number) => {
            return bookingSsrWithPax?.filter(
                (item) => item.sellableDetailId === sellableDetailId,
            );
        },
        [bookingSsrWithPax],
    );
    const isFullfilledPassengerInformation = useMemo(() => {
        return !passengers.some(
            (pax) =>
                isEmpty(pax.info.paxLastname) ||
                isEmpty(pax.info.paxMiddleFirstName) ||
                isEmpty(pax.info.paxBirthDate) ||
                isEmpty(pax.info.paxGender),
        );
    }, [passengers]);

    return (
        <div className="product-service-entry-list-wraper">
            {Object.entries(servicesGrouping).map(([key, item], _index) => (
                <BoxService
                    key={key}
                    {...item}
                    passengerList={passengers || []}
                    canBookService={isFullfilledPassengerInformation}
                    bookingSSRItems={getBookingSSRWithPaxByServiceId(
                        item.serviceId,
                    )}
                    onAddService={addService}
                    className={_index !== 0 ? "mt-6" : ""}
                />
            ))}
        </div>
    );
};
export default ProductServicesListEntry;
