import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useConfigPricingSellableMudation } from "@/mutations/managements/sellable";
import { queryCore } from "@/queries/var";
import { SellablePriceConfigFormData } from "./priceConfig.interface";
import { SellablePriceConfigPayload } from "@/models/management/core/priceConfig.interface";

const useConfigPriceSellable = () => {
  const { mutate: makeConfigPrice } = useConfigPricingSellableMudation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onUpdatePriceConfig = (formdata: SellablePriceConfigFormData, cb?: () => void) => {
    const { sellableRecId, tourConfigs, extraConfigs } = formdata;

    if (!sellableRecId) throw new Error("invalid data");

    let tourConfigsCorrected = tourConfigs?.reduce<Required<SellablePriceConfigPayload>["tourConfigs"]>((acc, item) => {
      return [
        ...acc,
        {
          ...item,
          recId: item.recId,
          adult: item.adult,
          channel: item.channel,
          child: item.child,
          class: item.class,
          maxAvailable: item.maxAvailable,
          infant: item.infant,
          details: item.details,
          sellableDetailsIds: item.sellableDetailsIds,
        },
      ];
    }, []);

    let extraConfigsCorrected = extraConfigs?.reduce<Required<SellablePriceConfigPayload>["extraConfigs"]>(
      (acc, item) => {
        return [
          ...(acc || []),
          {
            ...item,
            recId: item.recId,
            adult: item.adult,
            channel: item.channel,
            child: item.child,
            class: item.class,
            maxAvailable: item.maxAvailable,
            infant: item.infant,
            details: item.details,
            sellableDetailsIds: item.sellableDetailsIds,
          },
        ];
      },
      [],
    );

    makeConfigPrice(
      { tourConfigs: tourConfigsCorrected, extraConfigs: extraConfigsCorrected, sellableRecId },
      {
        onSuccess: (data, variables) => {
          message.success(`Lưu thành công`);

          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_SELLABLE_PRICE_CONFIGS, variables.sellableRecId],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_SELLABLE_LIST],
          });
          cb?.();
        },
        onError: (error) => {
          message.error(error.message);
        },
      },
    );
  };

  return {
    onUpdate: onUpdatePriceConfig,
  };
};
export default useConfigPriceSellable;
