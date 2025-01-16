import React, { ReactNode } from "react";

import { Link } from "@/utils/navigation";
import classNames from "classnames";

export interface NavLinkProps {
  prefix?: ReactNode;
  children?: React.ReactNode;
  title?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  className?: string;
}
const NavLinkBase: React.FC<NavLinkProps> = ({ prefix, children, title, href = "/", target, className = "" }) => {
  return (
    <Link
      href={href}
      className={classNames("flex items-center text-sm", {
        [className]: className,
      })}
      target={target}
    >
      {children ? (
        children
      ) : (
        <>
          {prefix ? <span className="mr-2">{prefix}</span> : null}
          <span className="text-gray-800 hover:text-primary-default">{title}</span>
        </>
      )}
    </Link>
  );
};

const NavLink = NavLinkBase;

export default NavLink;
