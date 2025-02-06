import { createContext, useContext, useEffect, useReducer } from "react";

import { ManageBookingDetail } from "@/app/(management)/portal/manage-booking/[orderId]/modules/manageBooking.interface";
import { ManageBookingAction } from "@/app/(management)/portal/manage-booking/[orderId]/actions";
import { manageBookingReducer, initManageBookingState } from "./reducer";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { initManageOrderDetail } from "@/app/(management)/portal/manage-booking/[orderId]/actions";
import { Spin } from "antd";
import { isUndefined } from "lodash";

export const ManageBookingDetailContext = createContext<
  [ManageBookingDetail, React.Dispatch<ManageBookingAction>] | undefined
>(undefined);

export const PortalManageBookingProvider = ({ children, orderId }: { children: React.ReactNode; orderId: number }) => {
  const [state, dispatch] = useReducer(manageBookingReducer, initManageBookingState);

  const { data: ruleAndPolicyList, isLoading: isLoadingRule } = useLocalGetRuleAndPolicyQuery();

  const { data: bookingOrderDetail, isLoading } = useGetBookingDetailCoreQuery({
    enabled: !isLoadingRule,
    reservationId: orderId,
    localRuleAndPolicies: ruleAndPolicyList,
  });

  useEffect(() => {
    if (bookingOrderDetail && !isLoading) {
      dispatch(initManageOrderDetail(bookingOrderDetail));
    }
  }, [isLoading, bookingOrderDetail]);

  return (
    <ManageBookingDetailContext.Provider value={[state, dispatch]}>
      {isLoading || isLoadingRule ? <Spin /> : isUndefined(bookingOrderDetail) ? null : children}
    </ManageBookingDetailContext.Provider>
  );
};

const useManageBooking = () => {
  const context = useContext(ManageBookingDetailContext);

  if (!context) {
    throw new Error("Hook must use under ManageBookingProvider parent");
  }

  return context;
};
export default useManageBooking;

export const useDispatchManageBooking = () => {
  const context = useContext(ManageBookingDetailContext);

  if (!context) {
    throw new Error("Hook must use under ManageBookingProvider parent");
  }

  const [state, dispatch] = context;
  return dispatch;
};

export const useSelectorManageBooking = <T,>(selector: (state: ManageBookingDetail) => T) => {
  const context = useContext(ManageBookingDetailContext);

  if (!context) {
    throw new Error("Hook must use under ManageBookingProvider parent");
  }

  const [state, _] = context;

  return selector(state);
};
