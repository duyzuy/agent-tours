import React, { memo } from "react";
import classNames from "classnames";
interface Props {
  length: number;
  className?: string;
  columnInARow?: 2 | 4 | 6;
}
const SkeletonLoadingCards: React.FC<Props> = ({ length = 2, className = "", columnInARow = 4 }) => {
  return (
    <div
      className={classNames("grid gap-3 lg:gap-6", {
        [className]: className,
        "grid-cols-2": columnInARow === 2,
        "grid-cols-2 lg:grid-cols-4": columnInARow === 4,
        "grid-cols-2 md:grid-cols-3 lg:grid-cols-6": columnInARow === 6,
      })}
    >
      {Array.from({ length }).map((item, _index) => (
        <div key={_index}>
          <div className=" rounded-lg bg-white overflow-hidden">
            <div className="animate-pulse">
              <div className="bg-slate-100 rounded-sm w-full h-32"></div>
              <div className="w-full pt-6 px-3 pb-3">
                <div className="h-2 bg-slate-100 rounded w-8 mb-6"></div>
                <div className="space-y-3 mb-8">
                  <div className="h-6 bg-slate-100 rounded mb-6"></div>
                  <div className="h-2 bg-slate-100 rounded w-24"></div>
                  <div className="h-2 bg-slate-100 rounded w-20"></div>
                </div>
                <div className="flex justify-between gap-x-3">
                  <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-100 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default memo(SkeletonLoadingCards);
