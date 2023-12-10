import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
type Actions = "PLUS" | "MINUS";
interface Props {
    label: string;
    value?: number;
    initValue?: number;
    onChange?: (action: Actions, value: number) => void;
    className?: string;
}
const QuantityInput: React.FC<Props> = ({
    value = 0,
    initValue,
    onChange,
    className = "",
    label,
}) => {
    return (
        <div
            className={classNames("quantity", {
                [className]: className,
            })}
        >
            <p className="mb-2">{label}</p>
            <div className="flex items-center">
                <span
                    className="w-6 h-6 flex items-center justify-center border rounded-md text-xs cursor-pointer"
                    onClick={() => onChange?.("MINUS", value)}
                >
                    <MinusOutlined />
                </span>
                <span className="w-10 h-8 flex items-center justify-center">
                    {value}
                </span>
                <span
                    className="w-6 h-6 flex items-center justify-center border text-xs rounded-md cursor-pointer"
                    onClick={() => onChange?.("MINUS", value)}
                >
                    <PlusOutlined />
                </span>
            </div>
        </div>
    );
};
export default QuantityInput;
