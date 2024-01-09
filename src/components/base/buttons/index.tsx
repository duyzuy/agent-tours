import styled from "styled-components";
import { Button } from "antd";
export const ButtonPrimary = styled(Button)`
    && {
        color: red;
        border-color: red;
    }
`;

export const ButtonSecondary = styled(Button)`
    && {
        color: #fff;
        border-color: #ff5722;
        background-color: #ff5722;
    }
    &.travel-btn-default.travel-btn-background-ghost {
        border-color: #ff5722;
        color: #ff5722;
    }
    &.travel-btn-default:not(:disabled):not(
            .travel-btn-disabled
        ).travel-btn-background-ghost:hover {
        border-color: #ff5722;
        color: #ff5722;
    }
    &.travel-btn-default:not(:disabled):not(.travel-btn-disabled):hover {
        border-color: #ff5722;
        color: #fff;
    }
`;
