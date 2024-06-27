import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";

const useCoupon = () => {
    const [bookingInfo, dispatch] = useBookingInformation();
    const { couponPolicy } = bookingInfo;
    const addCouponPolicy = (coupon?: (typeof bookingInfo)["couponPolicy"]) => {
        if (couponPolicy && couponPolicy.code === coupon?.code) return;

        if (!coupon) return;

        dispatch({ type: EBookingActions.ADD_COUPON_POLICY, payload: coupon });
    };

    const removeCouponPolicy = () => {
        dispatch({ type: EBookingActions.REMOVE_COUPON_POLICY });
    };

    return {
        addCouponPolicy,
        removeCouponPolicy,
    };
};
export default useCoupon;
