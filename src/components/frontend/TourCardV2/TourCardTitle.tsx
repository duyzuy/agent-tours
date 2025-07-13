import classNames from "classnames";
import Link from "next/link";

interface TourCardTitleProps {
  className?: string;
  href: string;
  name: string;
}
const TourCardTitle: React.FC<TourCardTitleProps> = ({ className, href, name }) => {
  return (
    <Link href={href} className={classNames("text-main-400 text-[15px]", className)}>
      <h3 className="line-clamp-2 h-10 lg:h-12 leading-5 lg:leading-6 font-[500] text-main-400 text-sm lg:text-[16px]">
        {name}
      </h3>
    </Link>
  );
};
export default TourCardTitle;
