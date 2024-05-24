import { useUpdateSSRByPassengerMutation } from "@/mutations/managements/booking";
import useManageBooking from "../hooks/useManageBooking";
import { BookingSSRData, IBookingSSRPayload } from "./bookingSSR.interface";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";
const useEditSSR = () => {
    const { mutate: doUpdate } = useUpdateSSRByPassengerMutation();

    const message = useMessage();
    const queryClient = useQueryClient();

    const [manageBooking, setManaageBooking] = useManageBooking();

    const onUpdateSSRByPax = (data: BookingSSRData, cb?: () => void) => {
        const payloadData = transformToPayloadData(data);
        console.log(payloadData);
        doUpdate(payloadData, {
            onSuccess(data, variables, context) {
                queryClient.invalidateQueries({
                    queryKey: [
                        queryCore.GET_BOOKING_ORDER_DETAIL,
                        { recId: Number(variables.bookingOrder?.recId) },
                    ],
                });
                cb?.();
            },
            onError(error, variables, context) {
                message.error(error.message);
                console.log(data);
            },
        });
    };

    const transformToPayloadData = (
        bookingSSRData: BookingSSRData,
    ): IBookingSSRPayload => {
        const { bookingDetails, bookingSsrDelete, bookingOrder } =
            bookingSSRData;

        let payloadData: IBookingSSRPayload = {
            bookingOrder: bookingOrder,
            bookingDetails: [],
            bookingSsrDelete: [],
        };

        if (bookingDetails) {
            let bookingDetailsPayload: Required<IBookingSSRPayload>["bookingDetails"] =
                [];
            Object.entries(bookingDetails).forEach(([key, svItem], _index) => {
                svItem.items.forEach((bkSSRItem) => {
                    const indexBookingItem = bookingDetailsPayload.findIndex(
                        (item) =>
                            item.booking.recId === bkSSRItem.booking.recId,
                    );

                    const correctSSRLists = bkSSRItem.ssr.reduce<
                        (typeof bookingDetailsPayload)[0]["booking"]["ssr"]
                    >((acc, item) => {
                        acc = [
                            ...acc,
                            {
                                sellableConfigId: item.priceConfig.recId,
                                qty: item.quantity,
                                type: item.type,
                                amount: item.priceConfig[item.type],
                            },
                        ];
                        return acc;
                    }, []);

                    /**
                     * if exists index booking item
                     */

                    if (indexBookingItem !== -1) {
                        const bookingItem =
                            bookingDetailsPayload[indexBookingItem];

                        bookingDetailsPayload.splice(indexBookingItem, 1, {
                            booking: {
                                recId: bkSSRItem.booking.recId,
                                bookingRefId: bkSSRItem.booking.bookingRefId,
                                ssr: [
                                    ...bookingDetailsPayload[indexBookingItem]
                                        .booking.ssr,
                                    ...correctSSRLists,
                                ],
                            },
                        });
                    } else {
                        bookingDetailsPayload = [
                            ...bookingDetailsPayload,
                            {
                                booking: {
                                    recId: bkSSRItem.booking.recId,
                                    bookingRefId:
                                        bkSSRItem.booking.bookingRefId,
                                    ssr: [...correctSSRLists],
                                },
                            },
                        ];
                    }
                });
            });
            payloadData = {
                ...payloadData,
                bookingDetails: bookingDetailsPayload,
            };
        }
        if (bookingSsrDelete && bookingSsrDelete.length) {
            let bookingRemoveItems: Required<IBookingSSRPayload>["bookingSsrDelete"] =
                [];
            bookingSsrDelete.forEach((bkSSRItemRemove) => {
                bookingRemoveItems = [
                    ...bookingRemoveItems,
                    {
                        bookingId: bkSSRItemRemove.recId,
                        sellableConfigId: bkSSRItemRemove.config.recId,
                    },
                ];
            });

            payloadData = {
                ...payloadData,
                bookingSsrDelete: bookingRemoveItems,
            };
        }

        return payloadData;
    };
    const onAddSSRByBookingItem = () => {};

    return { onUpdateSSRByPax, onAddSSRByBookingItem };
};
export default useEditSSR;
