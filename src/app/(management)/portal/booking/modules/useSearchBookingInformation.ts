import { SearchBookingPayload, SearchBookingFormData } from "./searchBooking.interface";
import { useSearchBookingMutation } from "@/mutations/managements/booking";
import useBooking from "../hooks/useBooking";

import useMessage from "@/hooks/useMessage";
import { MutateOptions } from "@tanstack/react-query";
import { ProductTouListResponse } from "@/models/management/booking/product.interface";
import { BaseResponse } from "@/models/common.interface";

export interface UseSearchBookingInformation {
  onSearch: (
    formData: SearchBookingFormData,
    options?: MutateOptions<ProductTouListResponse, BaseResponse<null>, SearchBookingPayload, unknown>,
  ) => void;
}
const useSearchBookingInformation = () => {
  const { mutate: makeSearchBooking, isPending } = useSearchBookingMutation();
  const [_, setBookingInformation] = useBooking();

  const message = useMessage();

  const onSearchBooking: UseSearchBookingInformation["onSearch"] = (searchData, options) => {
    let searchBookingPayload: SearchBookingPayload = { ...searchData };

    const destinations = searchData.byDest?.reduce<Required<SearchBookingPayload>["byDest"]>(
      (acc, item) => [
        ...acc,
        {
          countryKey: item.countryKey,
          stateProvinceKey: item.stateProvinceKey,
          keyType: item.keyType,
          regionKey: item.regionKey,
          subRegionKey: item.subRegionKey,
        },
      ],
      [],
    );
    searchBookingPayload = {
      ...searchBookingPayload,
      byDest: destinations,
    };

    makeSearchBooking(searchBookingPayload, {
      onSuccess: (response, variables, ctx) => {
        setBookingInformation((prev) => ({
          ...prev,
          productList: response.result,
          searchBooking: { ...searchData },
        }));
        options?.onSuccess?.(response, variables, ctx);
      },
      onError: (err, variables, ctx) => {
        message.error(err.message);
        options?.onError?.(err, variables, ctx);
      },
    });
  };

  return {
    onSearchBooking,
    isPending,
  };
};
export default useSearchBookingInformation;
