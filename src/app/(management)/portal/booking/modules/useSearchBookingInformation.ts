import { usePortalBookingManager } from "../context";
import { useSearchTourProduct } from "@/modules/admin/booking/hooks/useSearchProduct";
import { SearchProductTourPayload } from "@/models/management/booking/searchProduct.interface";
import { SearchProductFormData } from "@/modules/admin/booking/searchProduct.interface";
import { EProductType } from "@/models/management/core/productType.interface";
export interface UseSearchBookingInformation {
  onSearch: (formData: SearchProductFormData) => void;
}
const useSearchTourBookingInformation = () => {
  const { mutate: searchProduct, isPending } = useSearchTourProduct();
  const [_, setBookingInformation] = usePortalBookingManager();

  const onSearchTourBooking: UseSearchBookingInformation["onSearch"] = (searchData) => {
    let searchBookingPayload: SearchProductTourPayload = { ...searchData, byProductType: [EProductType.TOUR] };

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
            byProductType: [EProductType.TOUR],
            passengers: {
              adult: 1,
              child: 0,
              infant: 0,
            },
          },
        }));
      },
    });
  };

  return {
    onSearchTourBooking,
    isPending,
  };
};
export default useSearchTourBookingInformation;
