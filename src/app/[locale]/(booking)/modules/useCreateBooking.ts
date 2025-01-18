import { FeBookingPayload } from "@/models/fe/booking.interface";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useCreateBookingOrderMutation } from "@/mutations/fe/booking";
import { useCallback } from "react";
import { PassengerType } from "@/models/common.interface";
import { IPaymentInformation } from "../payment/modules/payment.interface";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import { Session } from "next-auth";
import { useRouter } from "@/utils/navigation";
import { EBookingActions } from "@/store/actions/bookingActions";
import { useBookingInformation } from "@/store/hooks";
import useMessage from "@/hooks/useMessage";
import { useTranslations } from "next-intl";

const useCreateBooking = () => {
  const { mutate: makeBooking, isPending, isIdle } = useCreateBookingOrderMutation();
  const router = useRouter();
  const [{ bookingInfo }, dispatch] = useBookingInformation();
  const { passengers, product, couponPolicy, coupons, bookingSsrWithPax } = bookingInfo;
  const message = useMessage();
  const t = useTranslations("String");

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
    const bookingSSROfPax = bookingSsrWithPax?.filter((ssrItem) => ssrItem.paxIndex === pax.index);

    let ssrItems: Required<FeBookingPayload>["bookingDetails"][0]["ssr"] = [];

    return (
      bookingSSROfPax?.reduce<Required<Required<FeBookingPayload>["bookingDetails"][0]>["ssr"]>(
        (acc, { priceConfig, paxIndex, paxType }) => {
          const indexItem = acc.findIndex((item) => item.sellableConfigId === priceConfig.recId);
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
        },
        [],
      ) || []
    );
  };
  const getBookingDetailsItems = () => {
    let pricingListPicker = getProductFlatPricings();

    let bookingDetailsItem: Required<FeBookingPayload>["bookingDetails"] = [];

    passengers.forEach((pax) => {
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
              pax: {
                ...pax.info,
                paxBirthDate: pax.info.paxBirthDate ? dayjs(pax.info.paxBirthDate).format(DATE_FORMAT) : undefined,
                paxPassortExpiredDate: pax.info.paxPassortExpiredDate
                  ? dayjs(pax.info.paxPassortExpiredDate).format(DATE_FORMAT)
                  : undefined,
              },
              ssr: ssrItem,
            },
          ]
        : [...bookingDetailsItem];
    });

    return bookingDetailsItem;
  };
  const onCreateBooking = async (paymentInformation: IPaymentInformation, session: Session | null) => {
    if (!session || !session.user.accessToken) {
      throw new Error("Invalid token or session");
    }

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

    makeBooking(
      { payload, token: session.user.accessToken },
      {
        onSuccess(data, variables, context) {
          console.log(data, variables, context);

          dispatch({
            type: EBookingActions.SET_RESERVATION,
            payload: data.result,
          });
          router.push("/reservation");
        },
        onError(error, variables, context) {
          console.log(error);
          message.error(t(error.errorCode));
        },
      },
    );
  };

  return {
    createBooking: onCreateBooking,
    isPending,
    isIdle,
  };
};
export default useCreateBooking;
