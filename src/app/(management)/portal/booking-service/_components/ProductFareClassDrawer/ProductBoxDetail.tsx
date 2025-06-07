import { IPromotion } from "@/models/management/core/promotion.interface";
import { moneyFormatVND } from "@/utils/helper";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Divider } from "antd";

interface ProductBoxDetailProps {
  promotions?: IPromotion[];
  productCode?: string;
  prodcutTemplateCode?: string;
  productName?: string;
  avaiableAmount?: number;
  usedAmount?: number;
  openAmount?: number;
}
const ProductBoxDetail: React.FC<ProductBoxDetailProps> = ({
  avaiableAmount,
  productCode,
  prodcutTemplateCode,
  usedAmount,
  openAmount,
  promotions,
}) => {
  return (
    <>
      <div className="text-primary-default mb-3">
        <span className="block font-[500]">{prodcutTemplateCode}</span>
        <span className="text-sm">{productCode}</span>
      </div>
      <Divider />
      <div className="flex gap-6">
        <div className="text-primary-default">
          <span className="block font-[500]">Tổng số lượng</span>
          <span className="text-sm">{avaiableAmount}</span>
        </div>
        <div className="text-red-600">
          <span className="block font-[500]">Đã bán</span>
          <span className="text-sm">{usedAmount}</span>
        </div>
        <div className="text-green-600">
          <span className="block font-[500]">Đang còn</span>
          <span className="text-sm">{openAmount}</span>
        </div>
      </div>
      <div className="tour__box__item-dropdown">
        {promotions ? (
          <>
            <h4 className="font-semibold mb-3">Các giảm giá có thể áp dụng</h4>
            {promotions.map((promo) => (
              <div className="promo-item flex mb-1 items-start" key={promo.code}>
                <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
                <span>{moneyFormatVND(promo.discountAmount)}</span>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};
export default ProductBoxDetail;
