import { SearchProductExtraFormData, SearchProductTourFormData } from "../searchProduct.interface";
import { SearchProductPayload } from "@/models/management/booking/searchProduct.interface";

import useMessage from "@/hooks/useMessage";
import { MutateOptions } from "@tanstack/react-query";
import { ProductTourListResponse } from "@/models/management/booking/product.interface";
import { BaseResponse } from "@/models/common.interface";
import { useMemo } from "react";
import { useTMutation } from "@/lib/reactQueryHooks";
import { bookingAPIs } from "@/services/management/booking/searchTour";
import { EProductType } from "@/models/management/core/productType.interface";

export interface UseSearchProduct {
  onSearch: (
    formData: SearchProductExtraFormData | SearchProductTourFormData,
    options?: MutateOptions<ProductTourListResponse, BaseResponse<null>, SearchProductPayload, unknown>,
  ) => void;
}
const useSearchProduct = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: (payload: SearchProductPayload) => bookingAPIs.search(payload),
    onError: (err, variables, ctx) => {
      message.error(err.message);
    },
  });
};
export default useSearchProduct;
