import React from "react";
type Actions = "PLUS" | "MINUS";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import classNames from "classnames";

const QuantityInput: React.FC<
    QuantityProps & {
        label?: string;
        className?: string;
    }
> = ({ label, className = "", ...restProps }) => {
    return (
        <div
            className={classNames("quantity-input", {
                [className]: className,
            })}
        >
            <label className="block mb-2">{label}</label>
            <Quantity size="sm" {...restProps} />
        </div>
    );
};
export default QuantityInput;
