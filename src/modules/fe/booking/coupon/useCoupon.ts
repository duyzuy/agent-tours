import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import { useBookingInformation } from "@/store";
import { useCheckCouponMutation } from "@/mutations/fe/booking";
import useMessage from "@/hooks/useMessage";
import { IPromotion } from "@/models/management/core/promotion.interface";

const useCoupon = () => {
  const [bookingInformation, dispatch] = useBookingInformation();
  const { mutate: checkCouponValid, isPending } = useCheckCouponMutation();
  const {
    bookingInfo: { couponPolicy, coupons },
  } = bookingInformation;

  const message = useMessage();

  const addCouponPolicy = (coupon?: IPromotion) => {
    coupon && dispatch({ type: "ADD_COUPON_POLICY", payload: coupon });
  };

  const removeCouponPolicy = () => {
    dispatch({ type: "REMOVE_COUPON_POLICY" });
  };

  const addCoupon = (payload: { sellableId: number; code: string }) => {
    if (coupons && coupons.length) {
      message.error("Coupon không thể áp dụng.");
      return;
    }
    checkCouponValid(
      {
        ...payload,
        type: DiscountType.COUPON,
      },
      {
        onSuccess(data, variables, context) {
          const coupon = data.result;
          message.success("Thêm mã giảm giá thành công");
          dispatch({
            type: "ADD_COUPONS",
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
  const removeCoupon = (code: string) => {
    const couponItem = coupons?.find((item) => item.code === code);
    if (!couponItem) {
      throw new Error("Coupon Invalid");
    }

    dispatch({
      type: "REMOVE_COUPON_POLICY",
    });
  };

  return {
    couponPolicy,
    addCouponPolicy,
    addCoupon,
    removeCoupon,
    loading: isPending,
    removeCouponPolicy,
  };
};
export default useCoupon;
