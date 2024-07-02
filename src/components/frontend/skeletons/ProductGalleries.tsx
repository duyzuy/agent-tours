import React, { memo } from "react";
import classNames from "classnames";
import { Space } from "antd";
interface Props {
    length?: number;
    className?: string;
    columnInARow?: number;
}
const ProductGalleries = ({
    length = 2,
    className = "",
    columnInARow = 4,
}: Props) => {
    return (
        <div
            className={classNames("product-sumary-card-skeleton", {
                [className]: className,
            })}
        >
            <div className="animate-pulse rounded-md w-full">
                <div className="bg-slate-100 rounded-sm w-full h-48 lg:h-[420px] mb-6"></div>

                <div className="grid grid-cols-4 gap-4">
                    <div className=" h-24 bg-slate-100 rounded"></div>
                    <div className=" h-24 bg-slate-100 rounded"></div>
                    <div className="h-24 bg-slate-100 rounded"></div>
                    <div className="h-24 bg-slate-100 rounded"></div>
                </div>
            </div>
        </div>
    );
};
export default memo(ProductGalleries);
