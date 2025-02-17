import { IStock, IStockConfirmPayload } from "@/models/management/core/stock.interface";
import { StockConfirmFormData, StockFormData } from "./stock.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useCreateStockMutation, useConfirmStockMutation } from "@/mutations/managements/stock";
import { BaseResponse } from "@/models/common.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";

const useCRUDStockInventory = () => {
  const { mutate: makeCreateStock, isPending: isPendingCreate } = useCreateStockMutation();
  const { mutate: makeConfirmStock, isPending: isPendingConfirm } = useConfirmStockMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onCreateStock = ({ data }: { data: StockFormData }, cb?: () => void) => {
    let payload = {
      ...data,
      end: data.end ? convertDateFormat(data.end) : undefined,
      start: data.start ? convertDateFormat(data.start) : undefined,
      valid: data.valid ? convertDateFormat(data.valid) : undefined,
      validTo: data.validTo ? convertDateFormat(data.validTo) : undefined,
      fromValidTo: data.fromValidTo ? convertDateFormat(data.fromValidTo) : undefined,
    };
    let exclusiveDateFormated = data.exclusives.reduce<{ from?: string; to?: string }[]>((acc, item) => {
      acc = [
        ...acc,
        {
          from: item.from ? convertDateFormat(item.from) : undefined,
          to: item.to ? convertDateFormat(item.to) : undefined,
        },
      ];
      return acc;
    }, []);
    payload = {
      ...payload,
      exclusives: exclusiveDateFormated,
    };
    console.log(payload);
    makeCreateStock(payload, {
      onSuccess: (data, variables) => {
        message.success(`Tạo stock thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
        });

        cb?.();
      },
      onError: (error, variables) => {
        message.error(error.message);
      },
    });
  };
  const onConfirmStock = (
    formData: StockConfirmFormData,
    cb?: (response: BaseResponse<IStock>, variables: IStockConfirmPayload) => void,
  ) => {
    let payload: IStockConfirmPayload = {
      ...formData,
      valid: formData.valid ? convertDateFormat(formData.valid) : undefined,
      validTo: formData.validTo ? convertDateFormat(formData.validTo) : undefined,
      start: formData.start ? convertDateFormat(formData.start) : undefined,
      end: formData.end ? convertDateFormat(formData.end) : undefined,
    };
    makeConfirmStock(payload, {
      onSuccess: (response, variables) => {
        message.success(`Duyệt stock thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
        });

        cb?.(response, variables);
      },
      onError: (error, variables) => {
        message.error(error.message);
      },
    });
  };

  const convertDateFormat = (dateStr: string) => {
    return dayjs(dateStr).locale("en").format(DATE_TIME_FORMAT);
  };
  return {
    onCreate: onCreateStock,
    onConfirm: onConfirmStock,
    loading: isPendingCreate,
  };
};
export default useCRUDStockInventory;
