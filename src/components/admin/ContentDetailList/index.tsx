import classNames from "classnames";

export interface ContentDetailListProps {
  items: { label?: string; value?: React.ReactNode | string }[];
  className?: string;
  column?: number;
}
export const ContentDetailList = ({ items, className = "", column = 4 }: ContentDetailListProps) => {
  return (
    <div
      className={classNames("grid grid-cols-2 gap-3", {
        [className]: className,
        "lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6": column === 3,
        "lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8": column === 4,
        "lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8": column === 5,
        "lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8": column === 6,
      })}
    >
      {items.map((item, _index) => (
        <ContentDetailItem key={_index} {...item} />
      ))}
    </div>
  );
};

interface ContentDetailItemProps {
  label?: string;
  value?: React.ReactNode | string;
  className?: string;
  direction?: "vertical" | "horizontal";
}
function ContentDetailItem({ label, value, className = "", direction = "vertical" }: ContentDetailItemProps) {
  return (
    <div
      className={classNames({
        flex: direction === "horizontal",
        [className]: className,
      })}
    >
      <div
        className={classNames("block text-xs text-gray-600", {
          "w-[160px]": direction === "horizontal",
        })}
      >
        {label}
      </div>
      <div
        className={classNames("block break-words", {
          "flex-1": direction === "horizontal",
        })}
      >
        {value}
      </div>
    </div>
  );
}

ContentDetailList.Item = ContentDetailItem;
