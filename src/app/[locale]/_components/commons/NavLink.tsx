"use client";
import React, { ElementType, ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";

type NavLinkProps = {
    prefix?: ReactNode;
    children?: React.ReactNode;
    label?: string;
    href?: string;
};
const NavLinkBase: React.FC<NavLinkProps> = ({
    prefix,
    children,
    label,
    href = "/",
}) => {
    return (
        <Link href={href} className="flex items-center text-sm font-semibold">
            {prefix ? prefix : null}
            <span className="text text-gray-600">{label}</span>
        </Link>
    );
};

const NavLink = styled(NavLinkBase)``;

export default NavLink;
