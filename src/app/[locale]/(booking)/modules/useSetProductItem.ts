import { FeProductItem } from "@/models/fe/productItem.interface";
import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";

const useSetProductItem = () => {
    const [_, dispatch] = useBookingInformation();

    const onSetProduct = (product?: FeProductItem) => {
        dispatch({ type: EBookingActions.SET_PRODUCT, payload: product });
    };
    return onSetProduct;
};
export default useSetProductItem;
