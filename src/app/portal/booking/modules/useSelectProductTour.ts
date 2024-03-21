import useMessage from "@/hooks/useMessage";
import useBooking from "../hooks/useBooking";
import { isUndefined } from "lodash";
import { PassengerType } from "@/models/management/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import {
    BookingInformation,
    IBookingItem,
} from "./bookingInformation.interface";
import { useRouter } from "next/navigation";
import {
    productTourClassChannels,
    EConfigChannel,
    EConfigClass,
} from "@/constants/channel.constant";

const useSelectProductTour = () => {
    const message = useMessage();
    const [bookingInformation, setBookingInformation] = useBooking();
    const router = useRouter();

    const onNext = () => {
        const productItem = bookingInformation.bookingInfo?.product;
        if (isUndefined(productItem)) {
            throw new Error("Chưa chọn tour.");
        }
        const { open, configs } = productItem;
        const { passengers } = bookingInformation.searchBooking;

        let totalPaxAmount = 0;
        Object.keys(passengers).map((paxType) => {
            if (paxType !== PassengerType.INFANT) {
                totalPaxAmount += passengers[paxType as PassengerType];
            }
        });

        if (open < totalPaxAmount) {
            message.error("Số lượng tour hiện tại không đủ.");
            return;
        }
        /**
         *
         * Sorting to get lowest price by adult.
         *
         */
        const configsSortedByAdultPrice = configs
            .filter((config) => isProductTourConfig(config))
            .sort((a, b) => a.adult - b.adult);

        let configsMappingItems: PriceConfig[] = [];

        configsSortedByAdultPrice.forEach((item) => {
            const configsArrItems = Array.from(
                { length: item.open },
                (value, index) => item,
            );
            configsMappingItems = [...configsMappingItems, ...configsArrItems];
        });

        /**
         * Pax Infant will not take slot
         */
        const bookingInfantAmount = Array.from(
            { length: passengers.infant },
            (_, index) => ({
                paxType: PassengerType.INFANT,
                item: configsMappingItems[0],
            }),
        );
        const bookingAdultAmount = Array.from(
            { length: passengers.adult },
            (_, index) => ({
                paxType: PassengerType.ADULT,
                item: configsMappingItems.splice(0, 1)[0],
            }),
        );
        const bookingChildAmount = Array.from(
            { length: passengers.child },
            (_, index) => ({
                paxType: PassengerType.CHILD,
                item: configsMappingItems.splice(0, 1)[0],
            }),
        );

        const bookingItems = [
            ...bookingAdultAmount,
            ...bookingChildAmount,
            ...bookingInfantAmount,
        ].reduce<IBookingItem[]>((acc, paxItem, _index) => {
            acc = [
                ...acc,
                {
                    index: _index,
                    item: paxItem.item,
                    type: paxItem.paxType,
                    passengerInformation: {},
                    ssr: [],
                },
            ];

            return acc;
        }, []);

        setBookingInformation((prev) => ({
            ...prev,
            bookingInfo: {
                ...prev.bookingInfo,
                bookingItems: [...bookingItems],
            },
        }));
        router.push("./portal/booking/payment");
    };
    const onSetQuantityPassenger = (
        passengers: BookingInformation["searchBooking"]["passengers"],
    ) => {
        setBookingInformation((prev) => ({
            ...prev,
            searchBooking: {
                ...prev.searchBooking,
                passengers: {
                    ...passengers,
                },
            },
        }));
    };

    const onReselectTour = () => {
        setBookingInformation((prev) => ({
            ...prev,
            bookingInfo: {
                ...prev.bookingInfo,
                product: undefined,
                bookingItems: [],
            },
            searchBooking: {
                ...prev.searchBooking,
                passengers: { adult: 1, child: 0, infant: 0 },
            },
        }));
    };
    const isProductTourConfig = (config: PriceConfig) => {
        let isTourProduct = false;
        Object.keys(productTourClassChannels).forEach((channel) => {
            if (
                productTourClassChannels[channel as EConfigChannel].includes(
                    config.class as EConfigClass,
                )
            ) {
                isTourProduct = true;
            }
        });
        return isTourProduct;
    };

    return {
        onNext,
        onSetQuantityPassenger,
        onReselectTour,
    };
};
export default useSelectProductTour;
