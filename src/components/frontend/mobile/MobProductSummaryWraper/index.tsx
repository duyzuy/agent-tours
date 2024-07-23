"use client";
import { useRef, useState } from "react";
import { IconChevronDown } from "@/assets/icons";
import { useTranslations } from "next-intl";
import { IconTicketPercent } from "@/assets/icons";
import classNames from "classnames";
import { InfoCircleOutlined } from "@ant-design/icons";
import CouponCard from "../../CouponCard";
import { Modal, Flex, Button, Space, Drawer } from "antd";
import { PassengerType } from "@/models/common.interface";
import styled from "styled-components";

interface MobProductSummaryWraperProps {
  label?: string;
  productPrice?: string;
  children?: React.ReactNode;
  openAmount?: number;
  prefix?: () => React.ReactNode;
  promotion: {
    selectedCode?: string;
    items?: {
      name?: string;
      code?: string;
      price?: string;
      validFrom?: string;
      validTo?: string;
    }[];
    onSelect?: (value?: string) => void;
  };
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
const MobProductSummaryWraper = ({
  label,
  productPrice,
  openAmount,
  children,
  prefix,
  promotion,
  breakDown,
  onBookNow,
  isLoading = false,
}: MobProductSummaryWraperProps) => {
  const t = useTranslations("String");
  const [openBreakDown, setShowBreakDown] = useState(false);
  const positionRef = useRef(0);
  const closeBreakDown = () => {
    setShowBreakDown(false);
  };
  const [showDrawerBookingContainer, setShowDrawerBookingContainer] = useState(false);
  const [showPromotionDrawer, setShowPromotionDrawer] = useState(false);

  const onSelectPromotion = (code?: string) => {
    promotion?.onSelect?.(code);
    setShowPromotionDrawer(false);
  };
  return (
    <>
      <div
        className="mb-box-summary-booking__head fixed z-30 left-0 right-0 bottom-0 bg-white border-t"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center px-4 py-3">
          <div className="price block w-1/2">
            <span className="text-xs block">{t("justFrom")}</span>
            <span className="text-red-600 font-semibold text-lg block">{productPrice}</span>
          </div>
          <div className="buttons w-1/2">
            <Button
              type="primary"
              block
              className="bg-primary-default w-full"
              onClick={() => setShowDrawerBookingContainer(true)}
              size="large"
              loading={isLoading}
            >
              Đặt ngay
            </Button>
          </div>
        </div>
      </div>
      <DrawerMobileBookingSummary
        open={showDrawerBookingContainer}
        placement="bottom"
        height={"calc(80vh - env(safe-area-inset-bottom))"}
        push={false}
        destroyOnClose={true}
        afterOpenChange={(open) => {
          const body = document.getElementsByTagName("body")[0];
          const scrollY = window.scrollY;
          if (open) {
            body.style.overflowY = "hidden";
            body.style.position = "fixed";
            body.style.top = `-${scrollY}px`;
            positionRef.current = scrollY;
            body.style.left = "0px";
            body.style.right = "0px";

            body.style.overflowY = "hidden";
          } else {
            body.removeAttribute("style");
            window.scrollTo({ top: positionRef.current });
          }
        }}
        onClose={() => setShowDrawerBookingContainer(false)}
      >
        <div className="mb-box-summary-booking__container pb-24">
          <div className="mb-box-summary-booking rounded-md bg-white drop-shadow-sm relative z-10">
            <div className="header mb-3">
              <h3 className="font-[500] text-lg">{label}</h3>
            </div>
            {productPrice ? (
              <>
                <div className="mb-3 py-2">
                  <div className="pricing mb-3">
                    <div className="price block">
                      <span className="text-xs block">{t("justFrom")}</span>
                      <span className="text-red-600 font-semibold text-xl block">{productPrice}</span>
                    </div>
                    <div className="amount inline-block">
                      <span className="text-xs block">
                        {t("productSummary.amountRemain", {
                          amount: openAmount,
                        })}
                      </span>
                    </div>
                  </div>
                  {promotion?.items?.length ? (
                    <div className="card-promocode-label mb-2">
                      <span
                        className="flex items-center text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md"
                        onClick={() => setShowPromotionDrawer(true)}
                      >
                        <IconTicketPercent className="w-4 h-4 mr-2" />
                        <span>{t("promoCode")}</span>
                      </span>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="notice-empty-price mb-6">
                <p className="text-red-600 font-semibold text-xl mb-6">{t("card.contact")}</p>
                <p>{t("productSummary.emptyPrices")}</p>
              </div>
            )}
            {children}
          </div>
        </div>

        {productPrice ? (
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-white px-4 py-4 border-t">
            <MobProductSummaryWraper.Subtotal
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
                Đặt ngay
              </Button>
            </Flex>
          </div>
        ) : null}
      </DrawerMobileBookingSummary>
      <DrawerMobilePromotion
        open={showPromotionDrawer}
        placement="bottom"
        height={"calc(80vh - env(safe-area-inset-bottom))"}
        onClose={() => setShowPromotionDrawer(false)}
        title="Chọn mã giảm"
        destroyOnClose={true}
      >
        <>
          {promotion?.items?.map((promo, _index) => (
            <CouponCard
              key={_index}
              className={_index !== 0 ? "mt-3" : ""}
              isSelecting={promotion.selectedCode === promo.code}
              code={promo.code}
              price={promo.price}
              validTo={promo.validTo}
              validFrom={promo.validTo}
              onClick={() => onSelectPromotion(promo?.code)}
            />
          ))}
        </>
      </DrawerMobilePromotion>
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
export default MobProductSummaryWraper;

interface ProductSummarySubtotalProps {
  label?: string;
  subtotal?: string;
  onClick?: () => void;
}
MobProductSummaryWraper.Subtotal = function ProductSummarySubtotal({
  label,
  subtotal,
  onClick,
}: ProductSummarySubtotalProps) {
  return (
    <div className="subtotal py-2">
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

const DrawerMobileBookingSummary = styled(Drawer)`
  &.travel-drawer-content {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 16px;
    }
  }
`;
const DrawerMobilePromotion = styled(Drawer)`
  &.travel-drawer-content {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 16px;
    }
  }
`;
