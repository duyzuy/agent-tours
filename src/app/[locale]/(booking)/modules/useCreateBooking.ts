import { useBookingSelector } from "../../hooks/useBookingInformation";
import { FeBookingPayload } from "@/models/fe/booking.interface";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useCreateBookingOrderMutation } from "@/mutations/fe/booking";
import { useCallback } from "react";
import { FeBookingInformation } from "./booking.interface";
import { PassengerType } from "@/models/common.interface";
import { IPaymentInformation } from "../payment/modules/payment.interface";

const useCreateBooking = () => {
    const { mutate: makeBooking, isPending } = useCreateBookingOrderMutation();
    const { passengers, product, couponPolicy, coupons, bookingSsrWithPax } =
        useBookingSelector((state) => state.bookingInfo);

    const getProductFlatPricings = useCallback(() => {
        let items: FeProductItem["configs"] = [];

        product?.configs.forEach((configItem) => {
            Array.from({ length: configItem.open }, (v, k) => {
                items = [...items, configItem];
            });
        });
        return items.sort((a, b) => a.adult - b.adult);
    }, [product]);

    const getSSRItemByPassenger = (pax: (typeof passengers)[0]) => {
        const bookingSSROfPax = bookingSsrWithPax?.filter(
            (ssrItem) => ssrItem.paxIndex === pax.index,
        );

        let ssrItems: Required<FeBookingPayload>["bookingDetails"][0]["ssr"] =
            [];

        return (
            bookingSSROfPax?.reduce<
                Required<Required<FeBookingPayload>["bookingDetails"][0]>["ssr"]
            >((acc, { priceConfig, paxIndex, paxType }) => {
                const indexItem = acc.findIndex(
                    (item) => item.sellableConfigId === priceConfig.recId,
                );

                if (indexItem !== -1) {
                    acc.splice(indexItem, 1, {
                        ...acc[indexItem],
                        qty: acc[indexItem].qty + 1,
                    });
                } else {
                    acc = [
                        ...acc,
                        {
                            sellableConfigId: priceConfig.recId,
                            qty: 1,
                            amount: priceConfig[paxType],
                            type: paxType,
                        },
                    ];
                }

                return acc;
            }, []) || []
        );
    };
    const getBookingDetailsItems = () => {
        let pricingListPicker = getProductFlatPricings();

        let bookingDetailsItem: Required<FeBookingPayload>["bookingDetails"] =
            [];

        passengers.forEach((pax) => {
            /**
             * pick priceConfigs of product
             */
            const priceConfigItem = pricingListPicker.shift();

            const ssrItem = getSSRItemByPassenger(pax);

            bookingDetailsItem = priceConfigItem
                ? [
                      ...bookingDetailsItem,
                      {
                          sellableConfigId: priceConfigItem.recId,
                          index: pax.index,
                          type: pax.type as PassengerType,
                          amount: priceConfigItem[pax.type as PassengerType],
                          pax: pax.info,
                          ssr: ssrItem,
                      },
                  ]
                : [...bookingDetailsItem];
        });

        return bookingDetailsItem;
    };
    const onCreateBooking = (paymentInformation: IPaymentInformation) => {
        let payload: FeBookingPayload = { sellableId: product?.recId };
        const { invoice, customerInformation } = paymentInformation;

        const bookingDetailItem = getBookingDetailsItems();

        payload = {
            ...payload,
            bookingDetails: bookingDetailItem,
            couponPolicy: couponPolicy,
            counpons: coupons,
            ...customerInformation,
            ...invoice,
        };

        console.log(payload);
        makeBooking(payload, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
            },
            onError(error, variables, context) {
                console.log(error);
            },
        });
    };

    return {
        createBooking: onCreateBooking,
        isPending,
    };
};
export default useCreateBooking;
