"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal, Flex, Button } from "antd";
import { PassengerType } from "@/models/common.interface";
import classNames from "classnames";
interface ProductSummaryWraperProps {
  label?: string;
  productPrice?: string;
  children?: React.ReactNode;
  openAmount?: number;
  onClosebreakDown?: () => {};
  breakDown?: {
    pricingConfigs: {
      type: PassengerType;
      configClass: string;
      pricing: string;
      id: number;
    }[];
    couponPolicy?: { code: string; discountAmount: string };
    subtotal: string;
  };
  onBookNow?: () => void;
  isLoading?: boolean;
}
const ProductSummaryWraper = ({
  label,
  productPrice,
  openAmount,
  children,
  breakDown,
  onBookNow,
  isLoading = false,
}: ProductSummaryWraperProps) => {
  const t = useTranslations("String");
  const [openBreakDown, setShowBreakDown] = useState(false);

  const closeBreakDown = () => {
    setShowBreakDown(false);
  };

  return (
    <>
      <div className="box-booking border lg:px-6 px-4 pt-4 pb-6 mb-4 rounded-md bg-white shadow-sm relative z-10">
        <div className="header py-3 flex items-center justify-between">
          <h3 className="font-semibold text-primary-default uppercase">{label}</h3>
        </div>
        {productPrice ? (
          <div className="pricing mb-4">
            <div className="price block">
              <span className="text-xs block">{t("justFrom")}</span>
              <span className="text-red-600 font-semibold text-2xl block">{productPrice}</span>
            </div>
            <div className="amount-remainning">
              <span className="text-xs block">
                {t("productSummary.amountRemain", {
                  amount: openAmount,
                })}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 no-price-note">
            <p className="text-red-600 font-semibold text-2xl mb-4">{t("card.contact")}</p>
            <p>{t("productSummary.emptyPrices")}</p>
          </div>
        )}
        {children}
        {!productPrice ? null : (
          <>
            <ProductSummaryWraper.Subtotal
              label={t("subtotal")}
              onClick={() => setShowBreakDown(true)}
              subtotal={breakDown?.subtotal}
            />
            <Flex gap="middle">
              <Button
                type="primary"
                block
                className="bg-primary-default"
                onClick={onBookNow}
                size="large"
                loading={isLoading}
              >
                {t("button.bookNow")}
              </Button>
            </Flex>
          </>
        )}
      </div>
      <Modal open={openBreakDown} centered onCancel={closeBreakDown} width={420} footer={null}>
        <div className="modal__breakdown-header mb-4">
          <p className="text-center text-lg">{t("modalBreakdown.title")}</p>
        </div>
        <div className="modal__breakdown-body">
          <div className="breadown-row-head flex items-center border-b mb-2 pb-2">
            <span className="w-32">{t("passenger.title")}</span>
            <span className="w-24">{t("productClass")}</span>
            <span className="flex-1 text-right">{t("price")}</span>
          </div>
          {breakDown?.pricingConfigs.map(({ type, configClass, pricing, id }, _index) => (
            <div className="break-down-item flex items-center py-1" key={`${type}-${_index}`}>
              <span className="pax-type w-32">{t(type)}</span>
              <span className="config-class w-24">{configClass}</span>
              <span className="price flex-1 text-right text-primary-default">{pricing}</span>
            </div>
          ))}
          <div className="beak-down-bottom border-t pt-3 mt-3">
            {breakDown?.couponPolicy ? (
              <div>
                <span className="mr-2">{t("breakdown.label.codeApplied")}</span>
                <div className="flex items-center justify-between py-2 border-b mb-3 pb-3">
                  <span className="bg-emerald-50 border border-emerald-300 rounded-sm text-emerald-500 px-2">
                    {breakDown?.couponPolicy?.code}
                  </span>
                  <span className="text-emerald-500 text-base">{breakDown?.couponPolicy?.discountAmount}</span>
                </div>
              </div>
            ) : null}
            <div className="subtotal justify-between flex">
              <span>{t("subtotal")}</span>
              <span className="text-lg text-red-600 font-[500]">{breakDown?.subtotal}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProductSummaryWraper;

interface ProductSummarySubtotalProps {
  label?: string;
  subtotal?: string;
  onClick?: () => void;
}
ProductSummaryWraper.Subtotal = function ProductSummarySubtotal({
  label,
  subtotal,
  onClick,
}: ProductSummarySubtotalProps) {
  return (
    <div className="subtotal py-3">
      <p className="flex items-center justify-between font-semibold">
        <span className="text-gray-600 cursor-pointer" onClick={onClick}>
          {label}
          <span className="ml-2  text-blue-600">
            <InfoCircleOutlined />
          </span>
        </span>
        <span className="text-red-600">{subtotal}</span>
      </p>
    </div>
  );
};
