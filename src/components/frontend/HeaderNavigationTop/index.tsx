import NavLink from "@/components/frontend/base/NavItem/NavLink";
import classNames from "classnames";

interface HeaderNavitationTopProps {
    children?: React.ReactNode;
    navitationItems: { title: string; href: string; prefix: React.ReactNode }[];
    className?: string;
}
const HeaderNavitationTop: React.FC<HeaderNavitationTopProps> = ({
    children,
    navitationItems,
    className = "selection:",
}) => {
    return (
        <div
            className={classNames("top-menu text-right mb-2", {
                [className]: className,
            })}
        >
            <div className="flex items-center gap-x-2 justify-end">
                {navitationItems.map((item, _index) => (
                    <div className="px-3 py-2" key={_index}>
                        <NavLink
                            title={item.title}
                            href={item.href}
                            prefix={item.prefix}
                        />
                    </div>
                ))}
                {children ?? null}
            </div>
        </div>
    );
};
export default HeaderNavitationTop;
