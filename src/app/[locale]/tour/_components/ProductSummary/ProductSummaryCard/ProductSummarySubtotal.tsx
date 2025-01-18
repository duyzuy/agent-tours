import { PassengerType } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { InfoCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";

export interface ProductSummarySubtotalProps {
  label?: string;
  items?: { type: PassengerType; configClass: string; pricing: number; id: number }[];
  coupon?: { code: string; discountAmount: number };
  subtotal?: number;
  className?: string;
}
const ProductSummarySubtotal = ({ label, items, coupon, subtotal, className = "" }: ProductSummarySubtotalProps) => {
  const t = useTranslations("String");
  const [isOpenModal, setOpenModal] = useState(false);

  const closeBreakDown = () => {
    setOpenModal(false);
  };

  const openBreakDown = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div
        className={classNames("product-summary-subtotal", {
          [className]: className,
        })}
      >
        <p className="flex items-center justify-between font-semibold">
          <span className="text-gray-600 cursor-pointer" onClick={openBreakDown}>
            {t("subtotal")}
            <span className="ml-2  text-blue-600">
              <InfoCircleFilled />
            </span>
          </span>
          <span className="text-red-600">{moneyFormatVND(subtotal)}</span>
        </p>
      </div>
      <Modal open={isOpenModal} centered onCancel={closeBreakDown} width={420} footer={null}>
        <div className="modal__breakdown-header mb-4">
          <p className="text-center text-lg">{t("modalBreakdown.title")}</p>
        </div>
        <div className="modal__breakdown-body">
          <div className="breadown-row-head flex items-center border-b mb-2 pb-2">
            <span className="w-32">{t("passenger.title")}</span>
            <span className="w-24">{t("productClass")}</span>
            <span className="flex-1 text-right">{t("price")}</span>
          </div>
          {items?.map(({ type, configClass, pricing, id }, _index) => (
            <div className="break-down-item flex items-center py-1" key={`${type}-${_index}`}>
              <span className="pax-type w-32">{t(type)}</span>
              <span className="config-class w-24">{configClass}</span>
              <span className="price flex-1 text-right text-primary-default">{moneyFormatVND(pricing)}</span>
            </div>
          ))}
          <div className="beak-down-bottom border-t pt-3 mt-3">
            {coupon ? (
              <div>
                <span className="mr-2">{t("breakdown.label.codeApplied")}</span>
                <div className="flex items-center justify-between py-2 border-b mb-3 pb-3">
                  <span className="bg-emerald-50 border border-emerald-300 rounded-sm text-emerald-500 px-2">
                    {coupon?.code}
                  </span>
                  <span className="text-emerald-500 text-base">{moneyFormatVND(coupon.discountAmount)}</span>
                </div>
              </div>
            ) : null}
            <div className="subtotal justify-between flex">
              <span>{t("subtotal")}</span>
              <span className="text-lg text-red-600 font-[500]">{moneyFormatVND(subtotal)}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProductSummarySubtotal;
