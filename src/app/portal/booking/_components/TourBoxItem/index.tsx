import React, { memo } from "react";
import { IProductItem } from "@/models/management/booking/productItem.interface";
import { formatDate } from "@/utils/date";
import {
    EConfigChannel,
    EConfigClass,
    productTourClassChannels,
} from "@/constants/channel.constant";
import { moneyFormatVND } from "@/utils/helper";
import { CheckOutlined, SwapOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Button, Space, Tag } from "antd";
import classNames from "classnames";

interface TourBoxItemProps {
    tour: IProductItem;
    isSelected: boolean;
    hideBoxNotSelect: boolean;
    onSelect: () => void;
}
export const TourBoxItem: React.FC<TourBoxItemProps> = ({
    tour,
    isSelected,
    onSelect,
    hideBoxNotSelect,
}) => {
    return (
        <WrapTourBoxItem
            className={classNames("tour__box__item border", {
                "border-primary-default": isSelected,
                border: !isSelected,
                hidden: hideBoxNotSelect && !isSelected,
            })}
        >
            <div className="tour__box__item-inner">
                <div className="flex items-center tour__box__item-top">
                    <div className="tour__box__item-left w-[320px]">
                        <div className="">
                            <div className="mb-2">
                                <span className="text-primary-default font-semibold text-[16px]">
                                    {tour.template.name}
                                </span>
                            </div>
                            <span className="tour-code">{tour.code}</span>
                        </div>
                    </div>
                    <div className="tour__box__item-dates flex-1 px-6 flex justify-center items-center">
                        <div className="flex items-center">
                            <div>
                                <span className="block text-xs">Ngày đi</span>
                                <span className="text-lg">
                                    {formatDate(tour.startDate)}
                                </span>
                            </div>
                            <span className="mx-6">
                                <SwapOutlined />
                            </span>
                            <div>
                                <span className="block text-xs">Ngày về</span>
                                <span className="text-lg">
                                    {formatDate(tour.endDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="tour__box__item-pricing-actions w-[380px]">
                        <div className="flex items-center justify-end">
                            {tour.open === 0 ? (
                                <span className="w-32 block bg-slate-50 text-center px-3 py-2 rounded-sm">
                                    Đã hết
                                </span>
                            ) : (
                                <>
                                    <div className="text-right mr-8">
                                        <span className="block text-xs">
                                            Giá chỉ từ
                                        </span>
                                        <span className="price-amount text-2xl text-primary-default font-semibold">
                                            {moneyFormatVND(
                                                getLowestPrice(tour.configs),
                                            )}
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
                                            <Space>
                                                {tour.promotions.map((promo) =>
                                                    promo.isValid ? (
                                                        <span
                                                            key={promo.name}
                                                            className="border border-dashed inline-block px-2 rounded-sm text-xs bg-emerald-100 border-emerald-400 text-emerald-500 mb-2"
                                                        >
                                                            {`Giảm ${moneyFormatVND(
                                                                promo.discountAmount,
                                                            )}`}
                                                        </span>
                                                    ) : null,
                                                )}
                                            </Space>
                                            <span className="block mb-2 rounded-sm text-xs">{`Số lượng đang còn ${tour.open}`}</span>
                                            <Button
                                                type="primary"
                                                className="w-32"
                                                onClick={onSelect}
                                            >
                                                Chọn
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WrapTourBoxItem>
    );
};
export default memo(TourBoxItem);

export const isProductTourConfig = (config: IProductItem["configs"][0]) => {
    let isTourProduct = false;
    Object.keys(productTourClassChannels).forEach((channel) => {
        if (
            productTourClassChannels[channel as EConfigChannel].includes(
                config.class as EConfigClass,
            )
        ) {
            isTourProduct = true;
        }
    });
    return isTourProduct;
};

const getLowestPrice = (prices: IProductItem["configs"]) => {
    let lowestPrice = 9999999999;

    const productToursConfig = prices.filter((item) =>
        isProductTourConfig(item),
    );

    productToursConfig.forEach((config) => {
        if (lowestPrice > config.adult && config.open > 0) {
            lowestPrice = config.adult;
        }
    });
    return lowestPrice;
};

const WrapTourBoxItem = styled("div")`
    & {
        background: white;
        box-shadow: 0px 2px 4px -4px rgb(0 0 0 / 25%),
            0px 0px 8px -6px rgb(0 0 0 / 15%);
        padding: 16px 20px;
        border-radius: 3px;
        margin-bottom: 24px;
    }
    & .tour__box__item-left {
    }
    & .tour-code {
        background-color: #e0ecff;
        color: #124ba5;
        padding: 3px 6px;
        border-radius: 3px;
        font-size: 13px;
        font-weight: 500;
    }
`;
