import { IInventoryPayload } from "@/models/management/core/inventory.interface";
import { useCreateSellableMutation, useApprovalSellableMutation } from "@/mutations/managements/sellable";

import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";

import { queryCore } from "@/queries/var";
import {
  ISellablePayload,
  SellableConfirmFormData,
  SellableConfirmPayload,
  SellableFormData,
} from "@/models/management/core/sellable.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";
export type TInventoryErrorsField = Partial<Record<keyof IInventoryPayload, string>>;
const useCRUDSellable = () => {
  const { mutate: makeCreateSellable } = useCreateSellableMutation();
  const { mutate: makeApproval } = useApprovalSellableMutation();

  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreateSellable = (formData: SellableFormData, cb?: () => void) => {
    let payload = {
      ...formData,
      start: formData.start ? convertFormatDate(formData.start) : undefined,
      end: formData.end ? convertFormatDate(formData.end) : undefined,
      valid: formData.valid ? convertFormatDate(formData.valid) : undefined,
      validTo: formData.validTo ? convertFormatDate(formData.validTo) : undefined,
      closeDate: formData.closeDate ? convertFormatDate(formData.closeDate) : undefined,
    };
    const exclusiveDateFormated = formData.exclusives.reduce<{ from?: string; to?: string }[]>((acc, item) => {
      acc = [
        ...acc,
        {
          from: item.from ? convertFormatDate(item.from) : undefined,
          to: item.to ? convertFormatDate(item.to) : undefined,
        },
      ];
      return acc;
    }, []);
    payload = {
      ...payload,
      exclusives: exclusiveDateFormated,
    };
    makeCreateSellable(payload, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_SELLABLE_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };
  const onApprovalSellable = (formData: SellableConfirmFormData, cb?: () => void) => {
    const sellablePayload = corectSellablePayload(formData);

    makeApproval(sellablePayload, {
      onSuccess: (data, variables) => {
        message.success(`Duyệt thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_SELLABLE_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_SELLABLE_DETAIL],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };
  const corectSellablePayload = (formData: SellableConfirmFormData): SellableConfirmPayload => {
    const {
      extraInventories,

      extraStocks,
      stocks,
      inventories,
      recId,
      cap,
      closeDate,
      valid,
      validTo,
      start,
      end,
    } = formData;

    const extraInventoriesPayload = extraInventories.reduce<SellableConfirmPayload["extraInventories"]>((acc, inv) => {
      return [...acc, { qty: inv.qty, recId: inv.inventory.recId }];
    }, []);
    const inventoriesPayload = inventories.reduce<SellableConfirmPayload["inventories"]>((acc, inv) => {
      return [...acc, { qty: inv.qty, recId: inv.inventory.recId }];
    }, []);

    const extraStocksPayload = extraStocks.reduce<SellableConfirmPayload["extraStocks"]>((acc, inv) => {
      return [...acc, { qty: inv.qty, recId: inv.stock.recId }];
    }, []);

    const stocksPayload = stocks.reduce<SellableConfirmPayload["stocks"]>((acc, inv) => {
      return [...acc, { qty: inv.qty, recId: inv.stock.recId }];
    }, []);
    // const otherSellablesPayload = otherSellables.reduce<SellableConfirmPayload["otherSellables"]>((acc, inv) => {
    //   return [...acc, { qty: inv.qty, recId: inv.sellable.recId }];
    // }, []);

    return {
      recId,
      cap,
      closeDate: closeDate ? convertFormatDate(closeDate) : undefined,
      valid: valid ? convertFormatDate(valid) : undefined,
      validTo: validTo ? convertFormatDate(validTo) : undefined,
      start: start ? convertFormatDate(start) : undefined,
      end: end ? convertFormatDate(end) : undefined,
      extraInventories: extraInventoriesPayload,
      inventories: inventoriesPayload,
      extraStocks: extraStocksPayload,
      stocks: stocksPayload,
    };
  };
  const convertFormatDate = (dateStr: string) => {
    return dayjs(dateStr).locale("en").format(DATE_TIME_FORMAT);
  };
  return {
    onCreate: onCreateSellable,
    onApproval: onApprovalSellable,
  };
};
export default useCRUDSellable;
