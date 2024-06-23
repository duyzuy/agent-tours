import React, { ReactNode } from "react";
import Link from "next/link";

export interface NavLinkProps {
    prefix?: ReactNode;
    children?: React.ReactNode;
    title?: string;
    href?: string;
}
const NavLinkBase: React.FC<NavLinkProps> = ({
    prefix,
    children,
    title,
    href = "/",
}) => {
    return (
        <Link href={href} className="flex items-center text-sm font-[600]">
            {prefix ? prefix : null}
            <span className="text text-gray-600">{title}</span>
        </Link>
    );
};

const NavLink = NavLinkBase;

export default NavLink;
