import { useTMutation } from "@/lib/reactQueryHooks";
import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { queryCore } from "@/queries/var";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";

export const useAdjustStockQuantity = () => {
  const queryClient = useQueryClient();
  const message = useMessage();
  return useTMutation({
    mutationFn: stockInventoryAPIs.adjustQuantity,
    onSuccess(data, variables, context) {
      message.success(`Thêm số lượng stock thành công`);
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_STOCK_DETAIL_INVENTORY, variables.inventoryStockId],
      });
    },
    onError: (error, variables) => {
      message.error(error.message);
    },
  });
};
