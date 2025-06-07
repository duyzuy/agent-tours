import classNames from "classnames";

interface LineSpacingProps {
  className?: string;
  height?: 1 | 2 | 3 | 4 | 5;
  full?: boolean;
  spaceY?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 12;
}
const LineSpacing: React.FC<LineSpacingProps> = ({ className = "", height = 3, full = false, spaceY = 4 }) => {
  return (
    <div
      className={classNames("w-full", {
        [className]: className,
        "h-1": height === 1,
        "h-2": height === 2,
        "h-3": height === 3,
        "h-4": height === 4,
        "h-5": height === 5,
        "container mx-auto": !full,
        "my-1": spaceY === 1,
        "my-2": spaceY === 2,
        "my-3": spaceY === 3,
        "my-4": spaceY === 4,
        "my-5": spaceY === 5,
        "my-6": spaceY === 6,
        "my-7": spaceY === 7,
        "my-8": spaceY === 8,
        "my-9": spaceY === 9,
        "my-12": spaceY === 12,
      })}
      style={{
        background: "url(/assets/images/line.svg)",
        backgroundRepeat: "repeat-x",
      }}
    ></div>
  );
};
export default LineSpacing;
