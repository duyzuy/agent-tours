import { Modal } from "antd";
import { memo, useState } from "react";
import { useTranslations } from "next-intl";
import { IconTicketPercent } from "@/assets/icons";
import { IPromotion } from "@/models/management/core/promotion.interface";
import CouponCard from "@/components/frontend/CouponCard";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import classNames from "classnames";
import useCoupon from "@/app/[locale]/(booking)/modules/useCoupon";
interface PromotionSelectorProps {
  items: IPromotion[];
  className?: string;
}
const PromotionSelector: React.FC<PromotionSelectorProps> = ({ items, className = "" }) => {
  const t = useTranslations("String");

  const { couponPolicy, addCouponPolicy, removeCouponPolicy } = useCoupon();
  const [openModal, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const handleSelect = (item: IPromotion) => {
    couponPolicy?.code === item.code ? removeCouponPolicy() : addCouponPolicy(item.code);
    setShowModal(false);
  };
  return (
    <div
      className={classNames("card-promotion-selector", {
        [className]: className,
      })}
    >
      <div className="card-promotion-head">
        <span
          className="flex items-center text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-sm cursor-pointer"
          onClick={showModal}
        >
          <IconTicketPercent className="w-4 h-4 mr-2" />
          <span>{t("promoCode")}</span>
        </span>
      </div>
      <Modal open={openModal} centered onCancel={hideModal} width={420} footer={null}>
        <div className="modal__breakdown-header mb-4">
          <p className="text-center text-lg">{t("modalPromotion.title")}</p>
        </div>
        <div>
          {items?.map((promo, _index) => (
            <CouponCard
              key={_index}
              className={_index !== 0 ? "mt-3" : ""}
              isSelecting={couponPolicy?.code === promo.code}
              code={promo.code}
              price={moneyFormatVND(promo.discountAmount)}
              validFrom={formatDate(promo.validFrom, "dd/MM/yyyy")}
              validTo={formatDate(promo.validTo, "dd/MM/yyyy")}
              onClick={() => handleSelect(promo)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};
export default memo(PromotionSelector);
