import { useTQuery } from "@/lib/reactQueryHooks";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";

export const useGetOperationOrderStatusQuery = ({ enabled, orderId }: { enabled: boolean; orderId: number }) => {
  return useTQuery({
    queryKey: ["operation-status", orderId.toString()],
    queryFn: () => manageBookingAPIs.getOperationStatus({ orderId }),
    select: (data) => data.result,
  });
};
