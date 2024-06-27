import { FeProductItem } from "@/models/fe/productItem.interface";
import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";
import { PassengerType } from "@/models/common.interface";
import { useCallback } from "react";
import useMessage from "@/hooks/useMessage";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FeBookingInformation } from "./booking.interface";
import { useRouter } from "@/utils/navigation";

const useSetProductItem = () => {
    const [bookingInformation, dispatch] = useBookingInformation();

    const message = useMessage();
    const router = useRouter();

    const { product, bookingPassenger, bookingDetails } = bookingInformation;
    const initProduct = (product?: FeProductItem) => {
        dispatch({ type: EBookingActions.SET_PRODUCT, payload: product });
    };

    const getProductFlatPricings = useCallback(() => {
        let items: FeProductItem["configs"] = [];

        product?.configs.forEach((configItem) => {
            Array.from({ length: configItem.open }, (v, k) => {
                items = [...items, configItem];
            });
        });
        return items.sort((a, b) => a.adult - b.adult);
    }, [product]);
    const getTotalAmountPax = () => {
        return Object.entries(bookingPassenger).reduce(
            (acc, [k, v]) => (acc += v),
            0,
        );
    };
    const resetQuantityPassenger = () => {
        dispatch({
            type: EBookingActions.RESET_PASSENGER_QUANTITY,
        });
    };
    const setQuantityPassenger = (passenger: {
        type: PassengerType;
        quantity: number;
        action: "plus" | "minus";
    }) => {
        const { type, quantity, action } = passenger;

        if (!product) {
            throw new Error("Product invalid");
        }
        const totalAmountPax = getTotalAmountPax();
        if (quantity < 0 && type !== PassengerType.ADULT) {
            message.error("Số lượng không thể nhỏ hơn 0");
            return;
        }
        if (quantity < 1 && type === PassengerType.ADULT) {
            message.error("Hành khách người lớn tối thiểu phải lớn hơn 1.");
            return;
        }

        if (totalAmountPax === product.open && action === "plus") {
            message.error("Số lượng vé không đủ.");
            return;
        }

        dispatch({
            type: EBookingActions.SET_PASSENGER_QUANTITY,
            payload: { passengerType: type, quantity: quantity },
        });
    };
    const initBookingDetailItemsThenGoToPassengerInfo = () => {
        const totalAmountPax = getTotalAmountPax();
        let pricingListPicker = getProductFlatPricings();

        if (!product) {
            throw new Error("Product invalid");
        }
        if (totalAmountPax > product.open || totalAmountPax <= 0) {
            message.error("Số lượng không hợp lệ.");
            return;
        }

        if (!pricingListPicker.length) {
            message.error("Số lượng không hợp lệ.");
            return;
        }

        let bookingDetailItemBookedList: Required<FeBookingInformation>["bookingDetails"] =
            [];
        let _index = 0;
        Object.entries(bookingPassenger).forEach(([type, amount]) => {
            for (let i = 0; i < amount; i++) {
                const priceConfigItem = pricingListPicker.shift();
                bookingDetailItemBookedList = priceConfigItem
                    ? [
                          ...bookingDetailItemBookedList,
                          {
                              priceConfig: priceConfigItem,
                              index: _index,
                              type: type as PassengerType,
                              amount: priceConfigItem[type as PassengerType],
                              pax: undefined,
                              ssr: [],
                          },
                      ]
                    : [...bookingDetailItemBookedList];
                _index++;
            }
        });

        dispatch({
            type: EBookingActions.SET_PRODUCT_DETAIL_ITEMS,
            payload: bookingDetailItemBookedList,
        });
        router.push("/passenger");
    };
    return {
        initProduct,
        setQuantityPassenger,
        resetQuantityPassenger,
        initBookingDetailItemsThenGoToPassengerInfo,
    };
};
export default useSetProductItem;
