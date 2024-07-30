import IconEmptyContent from "@/assets/icons/IconEmptyContent";
import classNames from "classnames";

interface EmptyContentProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}
const EmptyContent: React.FC<EmptyContentProps> = ({ title, description, children, className = "" }) => {
  return (
    <div
      className={classNames("empty-content mx-auto w-fit text-center", {
        [className]: className,
      })}
    >
      <IconEmptyContent width={120} height={120} className="opacity-60 mx-auto mb-2" />
      <div className="content">
        {title ? <div className="title text-lg font-[500]">{title}</div> : null}
        {description ? <p className="desc text-gray-600">{description}</p> : null}
      </div>
    </div>
  );
};
export default EmptyContent;
