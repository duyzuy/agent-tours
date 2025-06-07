import { SearchBookingPayload } from "./searchBooking.interface";
import { useSearchExtraProduct } from "@/modules/admin/booking/hooks/useSearchProduct";
import { usePortalBookingServiceManager } from "../store/bookingServiceContext";

import useMessage from "@/hooks/useMessage";
import { EProductType } from "@/models/management/core/productType.interface";
import { SearchProductExtraFormData } from "@/modules/admin/booking/searchProduct.interface";
import { useRouter } from "next/navigation";
import { SearchProductExtraPayload } from "@/models/management/booking/searchProduct.interface";

export interface useSearchBookingExtraInformation {
  onSearch: (formData: SearchProductExtraFormData) => void;
}
const useSearchBookingExtraInformation = () => {
  const { mutate: searchExtraProduct, isPending } = useSearchExtraProduct();
  const [_, dispath] = usePortalBookingServiceManager();
  const router = useRouter();
  const message = useMessage();

  const onSearchBooking: useSearchBookingExtraInformation["onSearch"] = (searchData) => {
    let searchBookingPayload: SearchProductExtraPayload = { ...searchData };

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

    searchExtraProduct(
      {
        ...searchBookingPayload,
        byDest: destinations,
        byProductType: [EProductType.EXTRA],
      },
      {
        onSuccess: (response, variables, ctx) => {
          dispath({
            type: "INIT_SERVICE_LIST",
            payload: response.result,
          });
          dispath({
            type: "SET_SEARCH_PRODUCT_EXTRA_INFO",
            payload: searchData,
          });
          const params = new URLSearchParams();
          if (variables.byMonth) {
            params.set("byMonth", variables.byMonth);
          }
          router.push(`?${params.toString()}`);
        },
        onError: (err, variables, ctx) => {
          message.error(err.message);
        },
      },
    );
  };

  return {
    onSearchBooking,
    isPending,
  };
};
export default useSearchBookingExtraInformation;
