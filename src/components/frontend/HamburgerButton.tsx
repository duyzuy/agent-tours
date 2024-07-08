interface HamburgerButtonProps {
  onClick?: () => void;
}
const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md text-gray-800"
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  );
};
export default HamburgerButton;
