import classNames from "classnames";

export interface ContentDetailListProps {
  items: { label?: string; value?: React.ReactNode | string }[];
  className?: string;
  column?: number;
  direction?: ContentDetailItemProps["direction"];
}
export const ContentDetailList = ({
  items,
  className = "",
  column = 4,
  direction = "vertical",
}: ContentDetailListProps) => {
  return (
    <div
      className={classNames({
        "grid gap-3": direction === "vertical",
        "flex flex-col gap-y-2": direction === "horizontal",
        "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2": column === 2 && direction === "vertical",
        "lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6": column === 3 && direction === "vertical",
        "lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8": column === 4 && direction === "vertical",
        "lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8": column === 5 && direction === "vertical",
        "lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8": column === 6 && direction === "vertical",
        [className]: className,
      })}
    >
      {items.map((item, _index) => (
        <ContentDetailItem key={_index} {...item} direction={direction} />
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
        className={classNames("block text-gray-600", {
          "w-[160px]": direction === "horizontal",
          "text-xs": direction === "vertical",
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
