import { Button, Modal } from "antd";
import { memo, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { IconTicketPercent } from "@/assets/icons";
import { IPromotion } from "@/models/management/core/promotion.interface";
import CouponCard from "@/components/frontend/CouponCard";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import classNames from "classnames";
import { useProductSummaryCard } from ".";

interface PromotionSelectorProps {
  className?: string;
}
const PromotionSelector: React.FC<PromotionSelectorProps> = ({ className = "" }) => {
  const { productItem, coupon, onChangeCoupon } = useProductSummaryCard();

  const promotions = useMemo(() => {
    return productItem?.promotions;
  }, [productItem]);
  const t = useTranslations("String");

  const [openModal, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const handleSelect = (item: IPromotion) => {
    onChangeCoupon?.(item.code, item);
    setShowModal(false);
  };
  return (
    <div
      className={classNames("card-promotion-selector", {
        [className]: className,
      })}
    >
      <div className="card-promotion-head">
        <Button
          type="text"
          icon={<IconTicketPercent className="w-5 h-5" />}
          onClick={showModal}
          className="!inline-flex !items-center !text-emerald-600 !bg-emerald-50 !px-3"
        >
          <span>{t("button.applyPromo")}</span>
        </Button>
      </div>
      <Modal open={openModal} centered onCancel={hideModal} width={420} footer={null}>
        <div className="modal__breakdown-header mb-4">
          <p className="text-center text-lg">{t("modalPromotion.title")}</p>
        </div>
        <div>
          {promotions?.length ? (
            promotions.map((promo, _index) => (
              <CouponCard
                key={_index}
                className={_index !== 0 ? "mt-3" : ""}
                isSelecting={coupon?.code === promo.code}
                code={promo.code}
                price={moneyFormatVND(promo.discountAmount)}
                validFrom={formatDate(promo.validFrom, "DD/MM/YYYY")}
                validTo={formatDate(promo.validTo, "DD/MM/YYYY")}
                onClick={() => handleSelect(promo)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center flex-col py-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                <IconTicketPercent />
              </div>
              <p className="text-gray-600">Không có mã giảm giá.</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default memo(PromotionSelector);
