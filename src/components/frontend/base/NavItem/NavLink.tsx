import React, { ReactNode } from "react";

import { Link } from "@/utils/navigation";

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
    <Link href={href} className="flex items-center text-sm" target={target}>
      {children ? (
        children
      ) : (
        <>
          {prefix ? prefix : null}
          <span className="text-gray-600 hover:text-primary-default">{title}</span>
        </>
      )}
    </Link>
  );
};

const NavLink = NavLinkBase;

export default NavLink;
