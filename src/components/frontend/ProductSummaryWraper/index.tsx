"use client";
import { memo, useState } from "react";
import { useTranslations } from "next-intl";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import { PassengerType } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";

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
      pricing: number;
      id: number;
    }[];
    couponPolicy?: { code: string; discountAmount: number };
    subtotal: string;
  };
  onBookNow?: () => void;
  isLoading?: boolean;
}

const ProductSummaryWraper = (props: ProductSummaryWraperProps) => {
  const { label, productPrice, openAmount, children, breakDown, onBookNow, isLoading = false } = props;
  const t = useTranslations("String");

  console.log("render");
  return (
    <div className="box-booking border lg:px-6 px-4 pt-4 pb-6 mb-4 rounded-md bg-white shadow-sm relative z-10">
      <div className="header py-3 flex items-center justify-between">
        <h3 className="font-semibold text-primary-default uppercase">{label}</h3>
      </div>
      {productPrice ? (
        <ProductSummaryWraper.Price
          price={productPrice}
          subText={t("justFrom")}
          note={t("productSummary.amountRemain", {
            amount: openAmount,
          })}
        />
      ) : (
        <ProductSummaryWraper.NoPrice label={t("card.contact")} description={t("productSummary.emptyPrices")} />
      )}
      {children}
      {productPrice && (
        <>
          <ProductSummaryWraper.Subtotal label={t("subtotal")} breakDown={breakDown} />
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
        </>
      )}
    </div>
  );
};
export default memo(ProductSummaryWraper);

interface ProductSummarySubtotalProps {
  label?: string;
  breakDown: ProductSummaryWraperProps["breakDown"];
}
ProductSummaryWraper.Subtotal = function ProductSummarySubtotal({ label, breakDown }: ProductSummarySubtotalProps) {
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
      <div className="subtotal py-3">
        <p className="flex items-center justify-between font-semibold">
          <span className="text-gray-600 cursor-pointer" onClick={openBreakDown}>
            {label}
            <span className="ml-2  text-blue-600">
              <InfoCircleOutlined />
            </span>
          </span>
          <span className="text-red-600">{breakDown?.subtotal}</span>
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
          {breakDown?.pricingConfigs.map(({ type, configClass, pricing, id }, _index) => (
            <div className="break-down-item flex items-center py-1" key={`${type}-${_index}`}>
              <span className="pax-type w-32">{t(type)}</span>
              <span className="config-class w-24">{configClass}</span>
              <span className="price flex-1 text-right text-primary-default">{moneyFormatVND(pricing)}</span>
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
                  <span className="text-emerald-500 text-base">
                    {moneyFormatVND(breakDown?.couponPolicy?.discountAmount)}
                  </span>
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

interface ProductSummaryPriceProps {
  subText?: string;
  price?: string;
  referencePrice?: string;
  note?: React.ReactNode;
}
ProductSummaryWraper.Price = function ProductSummaryPrice({ price, subText, note }: ProductSummaryPriceProps) {
  return (
    <div className="pricing mb-4">
      <div className="price block">
        {subText && <span className="text-xs block">{subText}</span>}
        <span className="text-red-600 font-semibold text-2xl block">{price}</span>
      </div>
      {note && (
        <div className="amount-remainning">
          <span className="text-xs block">{note}</span>
        </div>
      )}
    </div>
  );
};

interface ProductSummaryNoPricePriceProps {
  label: string;
  description: string;
}
ProductSummaryWraper.NoPrice = function ProductSummaryPrice({ label, description }: ProductSummaryNoPricePriceProps) {
  return (
    <div className="mb-6 no-price-note">
      <p className="text-red-600 font-semibold text-2xl mb-4">{label}</p>
      <p>{description}</p>
    </div>
  );
};
