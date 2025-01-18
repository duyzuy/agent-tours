import FormItem from "@/components/base/FormItem";
import { Space, Input, Button } from "antd";
import useCoupon from "../../modules/useCoupon";
import { memo, useState } from "react";
import { useBookingSelector } from "@/store/hooks";
import { moneyFormatVND } from "@/utils/helper";

interface CouponFormProps {
  className?: string;
}
const CouponForm = ({}: CouponFormProps) => {
  const product = useBookingSelector((state) => state.bookingInfo.product);
  const coupons = useBookingSelector((state) => state.bookingInfo.coupons);

  const [code, setCode] = useState("");
  const { addCoupon, removeCoupon, loading } = useCoupon();

  const onAddCoupon = () => {
    if (!product) {
      throw new Error("invalid Product");
    }
    addCoupon({ sellableId: product.recId, code });
  };
  return (
    <div className="coupon-wraper lg:px-6 px-3 mb-6">
      <div className="bg-slate-50 px-6 py-3 pb-6 rounded-md">
        <div className="coupon-wraper-head py-3">
          <span className="text-base">Bạn có mã giảm giá? nhập ngay để nhận ưu đãi!</span>
        </div>
        {coupons?.length ? (
          <>
            {coupons.map((item) => (
              <div className="flex gap-6 rounded-md px-4 py-3 bg-white justify-between" key={item.code}>
                <div>
                  <span className="font-semibold">{item.code}</span>
                  <div className="text-emerald-600">{`-${moneyFormatVND(item.discountAmount)}`}</div>
                </div>
                <Button
                  size="small"
                  type="text"
                  className="!text-red-600 !bg-red-50"
                  onClick={() => removeCoupon(item.code)}
                >
                  Huỷ áp dụng
                </Button>
              </div>
            ))}
          </>
        ) : (
          <Space>
            <Input
              placeholder="Nhập mã ưu đãi"
              value={code}
              onChange={(ev) => setCode(ev.target.value)}
              disabled={loading}
            />
            <Button type="primary" onClick={onAddCoupon} loading={loading}>
              Áp dụng
            </Button>
          </Space>
        )}
      </div>
    </div>
  );
};
export default memo(CouponForm);
