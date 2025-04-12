import IconEmptyBox from "@/assets/icons/IconEmptyBox";
import React, { memo } from "react";
import classNames from "classnames";
import Link from "next/link";
import { Button } from "antd";
interface EmptyServiceProps {
  className?: string;
  title?: string;
  descriptions?: string;
  onClick?: () => void;
}
const EmptyService: React.FC<EmptyServiceProps> = ({
  className = "",
  title,
  descriptions = " Không có dịch vụ nào khả dụng cho tour này.",
  onClick,
}) => {
  return (
    <div
      className={classNames("empty-service", {
        [className]: className,
      })}
    >
      <div className="content text-center">
        <IconEmptyBox stroke="none" width={80} height={80} className="mx-auto mb-3" />
        <div className="mb-3 text-center">
          {title ? <p className="text-center font-[500]">{title}</p> : null}
          {descriptions ? <p className="text-center text-gray-500">{descriptions}</p> : null}
        </div>
        {onClick ? (
          <Button size="small" type="primary" ghost onClick={onClick}>
            Trở lại
          </Button>
        ) : null}
      </div>
    </div>
  );
};
export default memo(EmptyService);
