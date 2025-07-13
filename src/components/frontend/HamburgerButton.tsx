import classNames from "classnames";

interface HamburgerButtonProps {
  onClick?: () => void;
  size?: "sm" | "md";
}
const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick, size = "md" }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center text-gray-800 hover:bg-slate-100 p-2 rounded-full"
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className={classNames("", {
          "h-6 w-6": size === "md",
          "h-5 w-5": size === "sm",
        })}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  );
};
export default HamburgerButton;
