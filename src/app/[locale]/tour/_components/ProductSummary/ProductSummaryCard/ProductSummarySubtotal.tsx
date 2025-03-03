import { useState } from "react";
import { Button, Modal, Table } from "antd";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { PassengerType } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { InfoCircleFilled } from "@ant-design/icons";
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

  return (
    <>
      <div
        className={classNames("product-summary-subtotal", {
          [className]: className,
        })}
      >
        <div className="flex items-center justify-between font-semibold">
          <Button
            type="text"
            className="inline-flex items-center !px-0 !py-0 hover:!bg-transparent !font-semibold"
            icon={<InfoCircleFilled className="!text-blue-600" />}
            onClick={() => setOpenModal(true)}
          >
            <span className="text-gray-600">{t("subtotal")}</span>
          </Button>
          <span className="text-red-600">{moneyFormatVND(subtotal)}</span>
        </div>
      </div>
      <Modal open={isOpenModal} centered onCancel={() => setOpenModal(false)} width={420} footer={null}>
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
            <FareclassOptionItem key={`${type}-${_index}`} label={t(type)} fareClass={configClass} price={pricing} />
          ))}
          <div className="beak-down-bottom border-t pt-3 mt-3">
            {coupon ? (
              <div>
                <span className="mr-2">{t("breakdown.label.codeApplied")}</span>
                <CouponItem code={coupon?.code} discountAmount={coupon.discountAmount} />
              </div>
            ) : null}
            <div className="subtotal justify-between items-center flex">
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

function FareclassOptionItem({ price, fareClass, label }: { price: number; fareClass: string; label: string }) {
  return (
    <div className="break-down-item flex items-center py-1">
      <span className="pax-type w-32">{label}</span>
      <span className="config-class w-24">{fareClass}</span>
      <span className="price flex-1 text-right text-primary-default">{moneyFormatVND(price)}</span>
    </div>
  );
}

function CouponItem({ code, discountAmount }: { code: string; discountAmount: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b mb-3 pb-3">
      <span className="bg-emerald-50 border border-emerald-300 rounded-sm text-emerald-500 px-2">{code}</span>
      <span className="text-emerald-500 text-base">{moneyFormatVND(discountAmount)}</span>
    </div>
  );
}
