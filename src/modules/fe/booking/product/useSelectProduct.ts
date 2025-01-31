import { FeBookingFormData } from "@/store/booking/booking.type";
import { useAppDispatch } from "@/store";

type ProductItem = Exclude<FeBookingFormData["bookingInfo"]["product"], undefined>;
type TemnplateProductItem = Exclude<FeBookingFormData["bookingInfo"]["cmsTemplate"], undefined>;

const useSelectProduct = () => {
  const dispatch = useAppDispatch();

  const setProductItem = (productItem: ProductItem) => {
    dispatch({ type: "SET_PRODUCT", payload: productItem });
  };

  const initTemplateAndProduct = (product: ProductItem, cmsTemplate: TemnplateProductItem) => {
    dispatch({ type: "INIT_PRODUCT", payload: { product: product, cmsTemplate: cmsTemplate } });
  };

  return {
    initTemplateAndProduct,
    setProductItem,
  };
};
export default useSelectProduct;
