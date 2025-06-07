import {
  SearchProductExtraPayload,
  SearchProductTourPayload,
} from "@/models/management/booking/searchProduct.interface";

import useMessage from "@/hooks/useMessage";
import { useTMutation } from "@/lib/reactQueryHooks";
import { bookingAPIs } from "@/services/management/booking/searchTour";

const useSearchTourProduct = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: (payload: SearchProductTourPayload) => bookingAPIs.search(payload),
    onError: (err, variables, ctx) => {
      message.error(err.message);
    },
  });
};
const useSearchExtraProduct = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: (payload: SearchProductExtraPayload) => bookingAPIs.search(payload),
    onError: (err, variables, ctx) => {
      message.error(err.message);
    },
  });
};

export { useSearchExtraProduct, useSearchTourProduct };
