import React, { memo } from "react";
import classNames from "classnames";
interface Props {
    length: number;
    className?: string;
    columnInARow?: number;
}
const SkeletonLoadingCards = ({
    length = 2,
    className = "",
    columnInARow = 4,
}: Props) => {
    return (
        <div
            className={classNames("flex flex-wrap lg:-mx-2 -mx-1", {
                [className]: className,
            })}
        >
            {Array.from({ length }).map((item, _index) => (
                <div
                    key={_index}
                    className={classNames("lg:px-2 px-1", {
                        "max-w-sm w-1/2 lg:w-1/3": columnInARow === 3,
                        "max-w-sm w-1/2 lg:w-1/4": columnInARow === 4,
                        "max-w-sm w-1/3 lg:w-1/5": columnInARow === 5,
                    })}
                >
                    <div className="animate-pulse border border-slate-100 rounded-md lg:p-3 p-1">
                        <div className="bg-slate-100 rounded-sm w-full h-32"></div>
                        <div className="w-full pt-4">
                            <div className="h-2 bg-slate-100 rounded w-8 mb-2"></div>
                            <div className="space-y-3">
                                <div className="h-6 bg-slate-100 rounded"></div>
                                <div className="h-2 bg-slate-100 rounded w-24"></div>
                                <div className="h-2 bg-slate-100 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default memo(SkeletonLoadingCards);
