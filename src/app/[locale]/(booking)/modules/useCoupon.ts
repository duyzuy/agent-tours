import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";
import { useCheckCouponMutation } from "@/mutations/fe/booking";
import useMessage from "@/hooks/useMessage";

const useCoupon = () => {
    const [bookingInformation, dispatch] = useBookingInformation();
    const { mutate: makeCheckCouppon } = useCheckCouponMutation();
    const {
        bookingInfo: { product, couponPolicy, coupons },
    } = bookingInformation;

    const message = useMessage();
    const addCouponPolicy = (code?: string) => {
        const coupon = product?.promotions.find((item) => item.code === code);
        if (couponPolicy && couponPolicy.code === coupon?.code) return;

        if (!coupon) return;

        dispatch({ type: EBookingActions.ADD_COUPON_POLICY, payload: coupon });
    };

    const removeCouponPolicy = () => {
        dispatch({ type: EBookingActions.REMOVE_COUPON_POLICY });
    };

    const addCoupon = (payload: { sellableId: number; code: string }) => {
        const couponItem = coupons?.find((item) => item.code === payload.code);
        if (couponItem) {
            message.error("Mã code hiện đang áp dụng. không thể áp dụng thêm");
            return;
        }
        makeCheckCouppon(
            {
                ...payload,
                type: DiscountType.COUPON,
            },
            {
                onSuccess(data, variables, context) {
                    const coupon = data.result;
                    message.success("Thêm mã giảm giá thành công");
                    dispatch({
                        type: EBookingActions.ADD_COUPONS,
                        payload: coupon,
                    });
                },
                onError(error, variables, context) {
                    console.log(error, variables);
                    message.error("Mã code không hợp lệ, hoặc đã hết hạn.");
                },
            },
        );
    };
    return {
        addCouponPolicy,
        addCoupon,
        removeCouponPolicy,
    };
};
export default useCoupon;
