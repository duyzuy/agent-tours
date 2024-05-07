import styled from "styled-components";
import { Button, ButtonProps } from "antd";
import classNames from "classnames";
export const ButtonPrimary = styled(Button)`
    && {
        color: red;
        border-color: red;
    }
`;

export const ButtonSecondaryDangerStyled = styled(Button)`
    && {
        color: #ec1c24;
        border-color: #ffe3e3;
        background-color: #ffe3e3;
    }
    &.travel-btn-default.travel-btn-background-ghost {
        border-color: #ff5722;
        color: #ff5722;
    }
    &.travel-btn-default:not(:disabled):not(
            .travel-btn-disabled
        ).travel-btn-background-ghost:hover {
        border-color: #ffe3e3;
        color: #ec1c24;
    }
    &.travel-btn-default:not(:disabled):not(.travel-btn-disabled):hover {
        border-color: #ffe3e3;
        color: #ec1c24;
    }
`;

export const ButtonSecondarySuccessStyled = styled(Button)`
    && {
        color: #08a89c;
        border-color: #b6f5fe;
        background-color: #b8f4fc;
    }
    &.travel-btn-default.travel-btn-background-ghost {
        border-color: #ff5722;
        color: #ff5722;
    }
    &.travel-btn-default:not(:disabled):not(
            .travel-btn-disabled
        ).travel-btn-background-ghost:hover {
        border-color: #b6f5fe;
        color: #08a89c;
    }
    &.travel-btn-default:not(:disabled):not(.travel-btn-disabled):hover {
        border-color: #b6f5fe;
        color: #08a89c;
    }
`;

export const ButtonSecondaryPrimaryStyled = styled(Button)`
    && {
        color: #134ba5;
        border-color: #def1ff;
        background-color: #def1ff;
    }
    &.travel-btn-default.travel-btn-background-ghost {
        color: #134ba5;
        border-color: #def1ff;
    }
    &.travel-btn-default:not(:disabled):not(
            .travel-btn-disabled
        ).travel-btn-background-ghost:hover {
        color: #134ba5;
        border-color: #def1ff;
    }
    &.travel-btn-default:not(:disabled):not(.travel-btn-disabled):hover {
        color: #134ba5;
        border-color: #def1ff;
    }
`;
export const ButtonSecondaryGreyStyled = styled(Button)`
    && {
        color: #4e4e4e;
        border-color: #eeeeee;
        background-color: #eeeeee;
    
    }
    &.travel-btn-default.travel-btn-background-ghost {
        border-color: #eeeeee;
        background-color: #eeeeee;
    }
    &.travel-btn-default:not(:disabled):not(
            .travel-btn-disabled
        ).travel-btn-background-ghost:hover {
            border-color: #eeeeee;
            background-color: #eeeeee;
    &.travel-btn-default:not(:disabled):not(.travel-btn-disabled):hover {
        border-color: #eeeeee;
        background-color: #eeeeee;
    }
 
`;
interface ButtonSecondaryProps {
    buttonProps?: ButtonProps;
    children?: React.ReactNode;
    className?: string;
    color?: "danger" | "success" | "primary" | "grey";
    onClick?: () => void;
}
export const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
    children,
    buttonProps,
    className = "",
    color = "grey",
    onClick,
}) => {
    let CompStyled =
        color === "danger"
            ? ButtonSecondaryDangerStyled
            : color === "primary"
            ? ButtonSecondaryPrimaryStyled
            : color === "success"
            ? ButtonSecondarySuccessStyled
            : ButtonSecondaryGreyStyled;
    return (
        <CompStyled
            onClick={onClick}
            className={classNames("", {
                [className]: className,
            })}
            {...buttonProps}
        >
            {children}
        </CompStyled>
    );
};
