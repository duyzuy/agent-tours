import classNames from "classnames";

interface SoleOutProps {
  className?: string;
  label: string;
  description: string;
}
const SoleOut = ({ className = "", label, description }: SoleOutProps) => {
  return (
    <div
      className={classNames("product-summary-no-price", {
        [className]: className,
      })}
    >
      <p className="text-red-600 font-semibold text-2xl mb-3">{label}</p>
      <p>{description}</p>
    </div>
  );
};
export default SoleOut;
