import { PassengerType } from "@/models/common.interface";
import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";
import { IBookingSsrItemWithPax } from "./booking.interface";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";

type BookingSSRPaxItem = {
    paxIndex: number;
    paxType: PassengerType;
    priceConfig: FePriceConfig;
};

export interface UseBookingServicesProps {
    addService: (
        data: BookingSSRPaxItem[],
        sellableDetailId: number,
        serviceName: string,
    ) => void;
}
const useBookingServices = (): UseBookingServicesProps => {
    const [{ bookingInfo }, dispatch] = useBookingInformation();

    const { bookingSsrWithPax } = bookingInfo;
    const addService: UseBookingServicesProps["addService"] = (
        data,
        sellableDetailId,
        serviceName,
    ) => {
        const newBookingSsrWithPax = [...(bookingSsrWithPax || [])];

        const filterSSRItemsWithPax = newBookingSsrWithPax.filter(
            (item) => item.sellableDetailId !== sellableDetailId,
        );

        /**
         * new items
         */
        const dataBookingItems = data?.reduce<IBookingSsrItemWithPax[]>(
            (acc, item) => {
                return [
                    ...acc,
                    {
                        paxType: item.paxType,
                        paxIndex: item.paxIndex,
                        priceConfig: item.priceConfig,
                        sellableDetailId: sellableDetailId,
                        serviceName: serviceName,
                    },
                ];
            },
            [],
        );

        dispatch({
            type: EBookingActions.ADD_BOOKING_SERVICE_LIST,
            payload: [...filterSSRItemsWithPax, ...dataBookingItems],
        });
    };

    return {
        addService,
    };
};
export default useBookingServices;
