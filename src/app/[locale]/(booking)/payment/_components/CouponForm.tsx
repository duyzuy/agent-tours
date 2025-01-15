import FormItem from "@/components/base/FormItem";
import { Space, Input, Button } from "antd";
import useCoupon from "../../modules/useCoupon";
import { memo, useState } from "react";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
const CouponForm = () => {
  const product = useBookingSelector((state) => state.bookingInfo.product);
  const [code, setCode] = useState("");
  const { addCoupon } = useCoupon();

  console.log(product);
  const onAddCoupon = () => {
    if (!product) {
      throw new Error("invalid Product");
    }
    addCoupon({ sellableId: product.recId, code });
  };
  return (
    <div className="coupon-wraper px-6 mb-6">
      <div className="bg-slate-50 px-6 py-3 pb-6 rounded-md">
        <div className="coupon-wraper-head py-3">
          <span className="text-base">Bạn có mã giảm giá? nhập ngay để nhận ưu đãi!</span>
        </div>
        <Space>
          <Input placeholder="Nhập mã ưu đãi" value={code} onChange={(ev) => setCode(ev.target.value)} />
          <Button type="primary" onClick={onAddCoupon}>
            Áp dụng
          </Button>
        </Space>
      </div>
    </div>
  );
};
export default memo(CouponForm);
