"use client";
import React, { useReducer } from "react";
import { ManageBookingDetailContext } from "@/context";

import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import { Spin } from "antd";
import { isUndefined } from "lodash";

import { manageBookingReducer } from "./reducer";
import { initManageBookingState } from "./state";
import OrderDetailContainer from "./OrderDetailContainer";

const ManageBookingDetailProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(
        manageBookingReducer,
        initManageBookingState,
    );

    return (
        <ManageBookingDetailContext.Provider value={[state, dispatch]}>
            {children}
        </ManageBookingDetailContext.Provider>
    );
};

interface ManageBookingServiceAddonLayoutProps {
    children: React.ReactNode;
    params: { orderId: string };
}
const ManageBookingServiceAddonLayout = ({
    children,
    params,
}: ManageBookingServiceAddonLayoutProps) => {
    return (
        <ManageBookingDetailProvider>
            <OrderDetailContainer orderId={Number(params.orderId)}>
                {children}
            </OrderDetailContainer>
        </ManageBookingDetailProvider>
    );
};
export default ManageBookingServiceAddonLayout;
