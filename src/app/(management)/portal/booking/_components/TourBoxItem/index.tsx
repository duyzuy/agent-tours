import React, { memo } from "react";
import { IProductTour } from "@/models/management/booking/product.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import { CheckCircleOutlined, CheckOutlined, SwapOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Button } from "antd";
import classNames from "classnames";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";

interface TourBoxItemProps {
  // tour: IProductTour;
  tourName: string;
  tourCode: string;
  productCode: string;
  startDate: string;
  endDate: string;
  openAmount: number;
  isSelected: boolean;
  pricingList: PriceConfig[];
  promotions: IPromotion[];
  sellableDetails: IProductTour["sellableDetails"];
  isHidden: boolean;
  onSelect: () => void;
}
export const TourBoxItem = ({
  // tour,
  isSelected,
  onSelect,
  isHidden,
  productCode,
  tourName,
  startDate,
  endDate,
  openAmount,
  promotions,
  pricingList,
  sellableDetails,
}: TourBoxItemProps) => {
  const { inventories, stocks } = sellableDetails;
  return (
    <WrapTourBoxItem
      className={classNames("tour__box__item border", {
        "border-primary-default": isSelected,
        border: !isSelected,
        hidden: isHidden && !isSelected,
      })}
    >
      <div className="tour__box__item-inner">
        <div className="flex items-center tour__box__item-top">
          <div className="tour__box__item-left w-[320px]">
            <div className="text-primary-default font-semibold text-[16px] mb-1">{tourName}</div>
            <div className="tour-code">{productCode}</div>
          </div>
          <div className="tour__box__item-middle flex-1 px-6 flex justify-center items-center">
            <div className="flex items-center">
              <div>
                <span className="block text-xs">Ngày đi</span>
                <span className="text-lg">{formatDate(startDate)}</span>
              </div>
              <SwapOutlined className="mx-6" />
              <div>
                <span className="block text-xs">Ngày về</span>
                <span className="text-lg">{formatDate(endDate)}</span>
              </div>
            </div>
          </div>
          <div className="tour__box__item-right w-[380px]">
            {openAmount === 0 ? (
              <TourBoxItem.OutOfStock />
            ) : (
              <TourBoxItem.TourActions
                openAmount={openAmount}
                pricings={pricingList}
                isSelected={isSelected}
                onClick={onSelect}
              />
            )}
          </div>
        </div>
        <div className="tour__box__item-dropdown border-t pt-4 mt-4">
          <h4 className="font-semibold mb-3">Các dịch vụ đi kèm</h4>
          <div className="flex flex-wrap gap-6 mb-3">
            {inventories.map((item) => (
              <div className="detail-item flex mb-1 items-start" key={item.recId}>
                <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
                <span>{item.name}</span>
              </div>
            ))}
            {stocks.map((item) => (
              <div className="detail-item flex mb-1 items-start" key={item.recId}>
                <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
                <span>{`${item.inventory.name} - ${item.code}`}</span>
              </div>
            ))}
          </div>
          <h4 className="font-semibold mb-3">Các giảm giá có thể áp dụng</h4>
          {promotions.map((promo) => (
            <div className="promo-item flex mb-1 items-start" key={promo.code}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <span>{moneyFormatVND(promo.discountAmount)}</span>
            </div>
          ))}
        </div>
      </div>
    </WrapTourBoxItem>
  );
};
export default memo(TourBoxItem);

// export const isProductTourConfig = (config: IProductTour["configs"][number]) => {
//   let isTourProduct = false;
//   Object.keys(productTourClassChannels).forEach((channel) => {
//     if (productTourClassChannels[channel as EConfigChannel].includes(config.class as EConfigClass)) {
//       isTourProduct = true;
//     }
//   });
//   return isTourProduct;
// };

const getConfigLowestPrice = (prices: IProductTour["configs"]) => {
  if (prices.length === 0) return;

  if (prices.length === 1 && prices[0].open === 0) return;

  if (prices.length === 1 && prices[0].open !== 0) return prices[0];

  const priceWithaVailable = prices.find((item) => item.open > 0);

  if (!priceWithaVailable) return;

  let lowestPrice = priceWithaVailable;

  prices.forEach((item) => {
    if (lowestPrice.adult > item.adult && item.open > 0) {
      lowestPrice = item;
    }
  });

  return lowestPrice;
};

const WrapTourBoxItem = styled("div")`
  & {
    background: white;
    box-shadow: 0px 2px 4px -4px rgb(0 0 0 / 25%), 0px 0px 8px -6px rgb(0 0 0 / 15%);
    padding: 16px 20px;
    border-radius: 3px;
    margin-bottom: 24px;
  }
  & .tour__box__item-left {
  }
  & .tour-code {
    color: #124ba5;
    font-size: 13px;
    font-weight: 500;
  }
`;

interface TourActionProps {
  openAmount: number;
  pricings: IProductTour["configs"];
  isSelected: boolean;
  onClick?: () => void;
}

TourBoxItem.TourActions = function TourActions({ isSelected, pricings, openAmount, onClick }: TourActionProps) {
  const configItem = getConfigLowestPrice(pricings);

  if (!configItem) {
    return <span className="w-32 block bg-slate-50 text-center px-3 py-2 rounded-sm ml-auto">Chưa có giá bán</span>;
  }

  return (
    <div className="flex items-center justify-end">
      <React.Fragment>
        <div className="text-right mr-8">
          <span className="block text-xs">Giá chỉ từ</span>
          <span className="price-amount text-2xl text-primary-default font-semibold">
            {moneyFormatVND(configItem.adult)}
          </span>
        </div>
        {isSelected ? (
          <span className="flex items-center text-primary-default">
            <span className="bg-primary-default w-6 h-6 rounded-full text-white inline-flex items-center justify-center">
              <CheckOutlined />
            </span>
          </span>
        ) : (
          <div className="action text-right">
            <span className="block mb-2 rounded-sm text-xs">{`Đang còn ${openAmount}`}</span>
            <Button type="primary" className="w-32" onClick={onClick}>
              Chọn
            </Button>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

TourBoxItem.OutOfStock = function OutOfStock() {
  return <span className="w-32 block bg-slate-50 text-center px-3 py-2 rounded-sm ml-auto">Đã hết</span>;
};
