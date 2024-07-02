import React, { memo } from "react";
import classNames from "classnames";
import { Space } from "antd";
interface Props {
    length?: number;
    className?: string;
    columnInARow?: number;
}
const ProductSummaryCard = ({
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
            <div className="animate-pulse border border-slate-100 rounded-md lg:p-6 p-3 w-full">
                <div className="flex items-center justify-between gap-x-6 mb-6">
                    <div className="bg-slate-100 rounded-sm w-44 h-6"></div>
                    <div className="bg-slate-100 rounded-sm h-6 w-6"></div>
                </div>
                <div className="flex flex-col gap-y-3 mb-6">
                    <div className="bg-slate-100 rounded-sm w-16 h-2"></div>
                    <div className="bg-slate-100 rounded-sm w-64 h-8"></div>
                    <div className="bg-slate-100 rounded-sm w-36 h-2"></div>
                </div>
                <div className="flex flex-col gap-y-4 mb-6">
                    <div className="bg-slate-100 rounded-sm w-16 h-6"></div>
                    <div className="bg-slate-100 rounded-sm w-full h-16"></div>
                    <div className="bg-slate-100 rounded-sm w-full h-16"></div>
                </div>
                <div className="h-2 bg-slate-100 rounded w-16 mb-3"></div>
                <div className="w-full flex gap-6 mb-6">
                    <div className="h-8 w-28 bg-slate-100 rounded"></div>
                    <div className="h-8 w-28 bg-slate-100 rounded"></div>
                    <div className="h-8 w-28 bg-slate-100 rounded"></div>
                </div>
                <div className="bg-slate-100 rounded-sm w-full h-12"></div>
            </div>
        </div>
    );
};
export default memo(ProductSummaryCard);
