import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { isUndefined } from "lodash";
import React, { useEffect, useState } from "react";

export interface QuantityProps {
    value?: number;
    defaultValue?: number;
    maximum?: number;
    minimum?: number;
    onChange?: (action: "minus" | "plus", value: number) => void;
    size?: "sm" | "md" | "lg";
    shape?: "outline" | "default";
}
const Quantity: React.FC<QuantityProps> = ({
    value,
    defaultValue = 0,
    maximum,
    minimum,
    onChange,
    size = "md",
    shape = "default",
}) => {
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        setQuantity(() => (value ? value : defaultValue));
    }, [defaultValue, value]);

    const onChangeQuantity = (action: "minus" | "plus") => {
        let qty = quantity;

        switch (action) {
            case "minus": {
                if (isUndefined(minimum) || qty > minimum) {
                    qty = qty - 1;
                }
                break;
            }
            case "plus": {
                if (isUndefined(maximum) || qty < maximum) {
                    qty = qty + 1;
                }
                break;
            }
        }

        onChange ? onChange(action, qty) : setQuantity(qty);
    };
    return (
        <span className={classNames("quantity__control")}>
            <span
                className={classNames(
                    "quantity__control-btn inline-flex items-center justify-center cursor-pointer",
                    {
                        "w-10 h-10 rounded-[6px]": size === "lg",
                        "w-8 h-8 rounded-[6px]": size === "md",
                        "w-6 h-6 rounded-[3px] text-xs": size === "sm",
                        "bg-white hover:drop-shadow-sm border hover:bg-primary-default hover:border-primary-default hover:text-white":
                            shape === "outline",
                        "bg-slate-100  hover:drop-shadow-sm hover:bg-primary-default hover:text-white":
                            shape === "default",
                    },
                )}
                onClick={() => onChangeQuantity("minus")}
            >
                <MinusOutlined />
            </span>
            <span
                className={classNames(
                    "quantity__control-value inline-flex items-center justify-center",
                    {
                        "w-18 h-10": size === "lg",
                        "w-16 h-8": size === "md",
                        "w-14 h-6": size === "sm",
                    },
                )}
            >
                {quantity}
            </span>
            <span
                className={classNames(
                    "quantity__control-btn inline-flex items-center justify-center cursor-pointer ",
                    {
                        "w-10 h-10 rounded-[6px]": size === "lg",
                        "w-8 h-8 rounded-[6px]": size === "md",
                        "w-6 h-6 rounded-[3px] text-xs": size === "sm",
                        "bg-white hover:drop-shadow-sm border hover:bg-primary-default hover:border-primary-default hover:text-white":
                            shape === "outline",
                        "bg-slate-100  hover:drop-shadow-sm hover:bg-primary-default hover:text-white":
                            shape === "default",
                    },
                )}
                onClick={() => onChangeQuantity("plus")}
            >
                <PlusOutlined />
            </span>
        </span>
    );
};
export default Quantity;
