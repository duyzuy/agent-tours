import { SearchBookingPayload, SearchBookingFormData } from "./searchBooking.interface";
import { useSearchBookingMutation } from "@/mutations/managements/booking";
import useBooking from "../hooks/useBooking";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { BookingInfo } from "./bookingInformation.interface";

export const initBookingInfo = new BookingInfo(undefined, [], undefined, undefined, undefined, undefined);
const useSearchBookingInformation = () => {
  const { mutate: makeSearchBooking } = useSearchBookingMutation();
  const [_, setBookingInformation] = useBooking();
  const [isLoading, setLoading] = useState(false);
  const message = useMessage();

  const onSearchBooking = (formData: SearchBookingFormData) => {
    const searchPayload: SearchBookingPayload = {
      byMonth: formData.byMonth,
      byCode: formData.byCode,
      byInventoryType: formData.byInventoryType,
      byProductType: formData.byProductType,
      byDest: formData.byDest?.reduce<SearchBookingPayload["byDest"]>(
        (acc, item) => [
          ...(acc || []),
          {
            countryKey: item.countryKey,
            stateProvinceKey: item.stateProvinceKey,
            keyType: item.keyType,
            regionKey: item.regionKey,
            subRegionKey: item.subRegionKey,
          },
        ],
        [],
      ),
    };

    setLoading(true);
    makeSearchBooking(searchPayload, {
      onSuccess: (response, variables) => {
        setBookingInformation((prev) => ({
          ...prev,
          bookingInfo: { ...initBookingInfo },
          productList: response.result,
          searchBooking: formData,
        }));
        setLoading(false);
      },
      onError: (err) => {
        message.error(err.message);
        setLoading(false);
      },
    });
  };
  const getSearchPayload = () => {};
  return {
    onSearchBooking,
    isLoading,
  };
};
export default useSearchBookingInformation;
