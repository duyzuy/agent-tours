import React from "react";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import { Button } from "antd";
import classNames from "classnames";

interface SellableConfigItemProps {
    mode?: "new" | "buyed";
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
    mode = "new",
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
                <div className="w-20">
                    <span className="text-xs block text-gray-500">
                        Đang còn
                    </span>
                    <span>{open}</span>
                </div>
                {mode === "buyed" ? (
                    <div className="w-20">
                        <span className="block text-xs">Số lượng</span>
                        <span className="text-primary-default">{quantity}</span>
                    </div>
                ) : null}
                <div>
                    <span className="block text-xs">Giá tiền</span>
                    <span className="text-primary-default">{price}</span>
                </div>
            </div>
            {mode === "buyed" ? (
                <div>
                    <Button size="small">Add/remove</Button>
                </div>
            ) : (
                <Quantity size="sm" value={quantity} onChange={onChange} />
            )}
        </div>
    );
};
export default SellableConfigItem;
