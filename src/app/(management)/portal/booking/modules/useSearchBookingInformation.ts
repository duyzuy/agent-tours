import { usePortalBookingManager } from "../context";
import { useSearchTourProduct } from "@/modules/admin/booking/hooks/useSearchProduct";
import { SearchProductTourPayload } from "@/models/management/booking/searchProduct.interface";
import { SearchProductTourFormData } from "@/modules/admin/booking/searchProduct.interface";
export interface UseSearchBookingInformation {
  onSearch: (formData: SearchProductTourFormData) => void;
}
const useSearchTourBookingInformation = () => {
  const { mutate: searchProduct, isPending } = useSearchTourProduct();
  const [_, setBookingInformation] = usePortalBookingManager();

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
    });
  };

  return {
    onSearchTourBooking,
    isPending,
  };
};
export default useSearchTourBookingInformation;
