import classNames from "classnames";
import React from "react";
export interface ContentDetailProps {
  contents?: { label?: string; value?: string }[];
  vertical?: boolean;
  className?: string;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ contents, vertical = false, className = "" }) => {
  return (
    <div>
      {contents?.map(({ label, value }, _index) => (
        <div
          className={classNames({
            [className]: className,
            "flex py-1": !vertical,
            "mb-1": vertical,
          })}
          key={_index}
        >
          <span
            className={classNames("block", {
              "w-36 text-left": !vertical,
            })}
          >
            {label}
          </span>
          <span
            className={classNames({
              "pl-3 flex-1 text-left": !vertical,
            })}
          >{`: ${typeof value === "string" ? value : value}`}</span>
        </div>
      ))}
    </div>
  );
};
export default ContentDetail;
