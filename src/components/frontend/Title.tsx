import classNames from "classnames";

interface TitleProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  name?: string;
  className?: string;
  children?: React.ReactNode;
}
const Title: React.FC<TitleProps> = ({ as = "h1", className = "", children }) => {
  return as === "h1" ? (
    <h1
      className={classNames("text-lg md:text-xl lg:text-2xl font-[500]", {
        [className]: className,
      })}
    >
      {children}
    </h1>
  ) : as === "h2" ? (
    <h2
      className={classNames("text-lg md:text-xl lg:text-2xl font-[500]", {
        [className]: className,
      })}
    >
      {children}
    </h2>
  ) : as === "h3" ? (
    <h3
      className={classNames("text-lg md:text-xl lg:text-2xl font-[500]", {
        [className]: className,
      })}
    >
      {children}
    </h3>
  ) : as === "h4" ? (
    <h4
      className={classNames("text-lg md:text-xl lg:text-2xl font-[500]", {
        [className]: className,
      })}
    >
      {children}
    </h4>
  ) : as === "h5" ? (
    <h5
      className={classNames("text-lg md:text-xl lg:text-2xl font-[500]", {
        [className]: className,
      })}
    >
      {children}
    </h5>
  ) : as === "h6" ? (
    <h6
      className={classNames("text-lg md:text-xl lg:text-2xl font-[500]", {
        [className]: className,
      })}
    >
      {children}
    </h6>
  ) : null;
};
export default Title;
