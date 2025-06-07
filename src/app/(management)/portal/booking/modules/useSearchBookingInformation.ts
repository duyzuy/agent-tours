import { SearchBookingFormData } from "./searchBooking.interface";
import { useSearchBookingMutation } from "@/mutations/managements/booking";
import { usePortalBookingManager } from "../context";

import useMessage from "@/hooks/useMessage";
import { MutateOptions } from "@tanstack/react-query";
import { ProductTourListResponse } from "@/models/management/booking/product.interface";
import { BaseResponse } from "@/models/common.interface";
import { useMemo } from "react";
import { useSearchTourProduct } from "@/modules/admin/booking/hooks/useSearchProduct";
import { SearchProductTourPayload } from "@/models/management/booking/searchProduct.interface";
import { SearchProductTourFormData } from "@/modules/admin/booking/searchProduct.interface";
export interface UseSearchBookingInformation {
  onSearch: (formData: SearchProductTourFormData) => void;
}
const useSearchTourBookingInformation = () => {
  const { mutate: searchProduct, isPending } = useSearchTourProduct();
  const [_, setBookingInformation] = usePortalBookingManager();

  const message = useMessage();

  const onSearchTourBooking: UseSearchBookingInformation["onSearch"] = (searchData) => {
    let searchBookingPayload: SearchProductTourPayload = { ...searchData };

    const destinations = searchData.byDest?.reduce<Required<SearchProductTourPayload>["byDest"]>(
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

    searchProduct(searchBookingPayload, {
      onSuccess: (response, variables, ctx) => {
        setBookingInformation((prev) => ({
          ...prev,
          productList: response.result,
          searchBooking: {
            ...searchData,
            passengers: {
              adult: 1,
              child: 0,
              infant: 0,
            },
          },
        }));
      },
      onError: (err, variables, ctx) => {
        message.error(err.message);
      },
    });
  };

  return {
    onSearchTourBooking,
    isPending,
  };
};
export default useSearchTourBookingInformation;
