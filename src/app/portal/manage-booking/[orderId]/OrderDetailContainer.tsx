"use client";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import { useDispatchManageBooking } from "./hooks/useManageBooking";
import { useEffect } from "react";
import { initManageOrderDetail } from "./actions";

interface OrderDetailContainerProps {
    children: React.ReactNode;
    orderId?: number;
}
const OrderDetailContainer: React.FC<OrderDetailContainerProps> = ({
    children,
    orderId,
}) => {
    const dispatch = useDispatchManageBooking();
    const { data: ruleAndPolicyList, isLoading: isLoadingRule } =
        useLocalGetRuleAndPolicyQuery();

    const { data: bookingOrderDetail, isLoading } =
        useGetBookingDetailCoreQuery({
            enabled: !isLoadingRule,
            reservationId: orderId,
            localRuleAndPolicies: ruleAndPolicyList,
        });

    useEffect(() => {
        if (bookingOrderDetail && !isLoading) {
            dispatch(initManageOrderDetail(bookingOrderDetail));
        }
    }, [isLoading, bookingOrderDetail]);

    if (isLoading || isLoadingRule) {
        return <Spin />;
    }

    if (isUndefined(bookingOrderDetail)) {
        return null;
    }

    return children;
};
export default OrderDetailContainer;
