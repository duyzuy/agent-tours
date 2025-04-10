import { SearchBookingPayload, SearchBookingFormData } from "./searchBooking.interface";
import { useSearchBookingMutation } from "@/mutations/managements/booking";
import { usePortalBookingServiceManager } from "./store/context";

import useMessage from "@/hooks/useMessage";
import { MutateOptions } from "@tanstack/react-query";
import {
  IProductService,
  ProductServiceListResponse,
  ProductTouListResponse,
} from "@/models/management/booking/product.interface";
import { BaseResponse } from "@/models/common.interface";
import { useMemo } from "react";
import { EProductType } from "@/models/management/core/productType.interface";

export interface UseSearchBookingInformation {
  onSearch: (
    formData: SearchBookingFormData,
    options?: MutateOptions<ProductTouListResponse, BaseResponse<null>, SearchBookingPayload, unknown>,
  ) => void;
}
const useSearchBookingInformation = () => {
  const { mutate: searchProduct, isPending } = useSearchBookingMutation();
  const [_, setBookingInformation] = usePortalBookingServiceManager();

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

    searchProduct(
      {
        ...searchBookingPayload,
        byDest: destinations,
        byProductType: [EProductType.EXTRA],
      },
      {
        onSuccess: (response, variables, ctx) => {
          setBookingInformation((prev) => ({
            ...prev,
            productList: response.result as IProductService[],
            searchBooking: { ...searchData },
          }));
          options?.onSuccess?.(response, variables, ctx);
        },
        onError: (err, variables, ctx) => {
          message.error(err.message);
          options?.onError?.(err, variables, ctx);
        },
      },
    );
  };

  return {
    onSearchBooking,
    isPending,
  };
};
export default useSearchBookingInformation;
