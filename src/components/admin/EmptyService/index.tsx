import IconEmptyBox from "@/assets/icons/IconEmptyBox";
import React, { memo } from "react";
import classNames from "classnames";
interface EmptyServiceProps {
    className?: string;
    title?: string;
    descriptions?: string;
}
const EmptyService: React.FC<EmptyServiceProps> = ({
    className = "",
    title,
    descriptions = " Không có dịch vụ nào khả dụng cho tour này.",
}) => {
    return (
        <div
            className={classNames("empty-service", {
                [className]: className,
            })}
        >
            <div className="content text-center">
                <IconEmptyBox
                    stroke="none"
                    width={80}
                    height={80}
                    className="mx-auto mb-3"
                />
                {title ? (
                    <p className="text-center font-[500]">{title}</p>
                ) : null}
                {descriptions ? (
                    <p className="text-center text-gray-500">{descriptions}</p>
                ) : null}
            </div>
        </div>
    );
};
export default memo(EmptyService);
