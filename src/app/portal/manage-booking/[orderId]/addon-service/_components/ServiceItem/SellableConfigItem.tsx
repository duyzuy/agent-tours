import React from "react";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import classNames from "classnames";

interface SellableConfigItemProps {
    sellableClass?: string;
    open?: number;
    price?: string;
    quantity?: number;
    onChange?: QuantityProps["onChange"];
    className?: string;
}

const SellableConfigItem: React.FC<SellableConfigItemProps> = ({
    sellableClass,
    open,
    price,
    onChange,
    quantity,
    className = "",
}) => {
    return (
        <div
            className={classNames(
                "flex justify-between border p-3 shadow-sm rounded-md",
                { [className]: className },
            )}
        >
            <div className="flex">
                <div className="w-16">
                    <span className="block text-xs text-gray-500">Class</span>
                    <span>{sellableClass}</span>
                </div>
                <div className="w-24">
                    <span className="text-xs block text-gray-500">
                        Đang còn
                    </span>
                    <span>{open}</span>
                </div>
                <div>
                    <span className="block text-xs">Giá tiền</span>
                    <span className="text-primary-default">{price}</span>
                </div>
            </div>
            <Quantity size="sm" value={quantity} onChange={onChange} />
        </div>
    );
};
export default SellableConfigItem;
