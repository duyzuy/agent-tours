import React, { memo } from "react";
import classNames from "classnames";
import { Space } from "antd";
interface Props {
  length?: number;
  className?: string;
  columnInARow?: number;
}
const ProductGalleries = ({ length = 2, className = "", columnInARow = 4 }: Props) => {
  return (
    <div
      className={classNames("product-sumary-card-skeleton", {
        [className]: className,
      })}
    >
      <div className="animate-pulse rounded-md w-full">
        <div className="relative pt-[66.67%] mb-3">
          <div className="bg-slate-100 rounded-lg lg:mb-6 absolute top-0 left-0 right-0 w-full h-full"></div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="relative pt-[55.25%]">
            <div className="w-full h-full absolute bg-slate-100 rounded top-0 left-0"></div>
          </div>
          <div className="relative pt-[55.25%]">
            <div className="w-full h-full absolute bg-slate-100 rounded top-0 left-0"></div>
          </div>
          <div className="relative pt-[55.25%]">
            <div className="w-full h-full absolute bg-slate-100 rounded top-0 left-0"></div>
          </div>
          <div className="relative pt-[55.25%]">
            <div className="w-full h-full absolute bg-slate-100 rounded top-0 left-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductGalleries);
