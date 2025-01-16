import { FeProductItem } from "@/models/fe/productItem.interface";
import { EBookingActions } from "@/store/actions/bookingActions";
import { useBookingInformation } from "@/store/hooks";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";

const useSelectProduct = () => {
  const [_, dispatch] = useBookingInformation();

  const setProductItem = (productItem: FeProductItem) => {
    dispatch({ type: EBookingActions.SET_PRODUCT, payload: productItem });
  };

  const initTemplateAndProduct = (product: FeProductItem, cmsTemplate: FeCMSTemplateContent) => {
    dispatch({ type: EBookingActions.INIT_PRODUCT, payload: { product: product, cmsTemplate: cmsTemplate } });
  };

  return {
    initTemplateAndProduct,
    setProductItem,
  };
};
export default useSelectProduct;
