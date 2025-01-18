import {
  useCreateSellableMutation,
  useApprovalSellableMutation,
  useDelete,
  useUpdateStatus,
} from "@/mutations/managements/sellable";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import {
  ISellablePayload,
  SellableApprovalPayload,
  SellableFormData,
} from "@/models/management/core/sellable.interface";
import { SellableApprovalFormData } from "./sellable.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";

const useCRUDSellable = () => {
  const { mutate: makeCreateSellable } = useCreateSellableMutation();
  const { mutate: makeApproval } = useApprovalSellableMutation();
  const { mutate: makeDelete } = useDelete();
  const { mutate: makeUpdateStatus } = useUpdateStatus();

  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreateSellable = (formData: SellableFormData, cb?: () => void) => {
    let payload: ISellablePayload = {
      ...formData,
      start: formData.start ? convertFormatDate(formData.start) : undefined,
      end: formData.end ? convertFormatDate(formData.end) : undefined,
      valid: formData.valid ? convertFormatDate(formData.valid) : undefined,
      validTo: formData.validTo ? convertFormatDate(formData.validTo) : undefined,
      closeDate: formData.closeDate ? convertFormatDate(formData.closeDate) : undefined,
      fromValidTo: formData.fromValidTo ? convertFormatDate(formData.fromValidTo) : undefined,
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

  const onApprovalSellable = (formData: SellableApprovalFormData, cb?: () => void) => {
    const sellablePayload = getSellableApprovalPayload(formData);

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

  const onDelete = (recId: number, cb?: () => void) => {
    makeDelete(recId, {
      onSuccess: (data, variables) => {
        message.success(`Xoá thành công.`);
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

  const onUpdateStatus = (recId: number, cb?: () => void) => {
    makeUpdateStatus(recId, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công.`);

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

  const getSellableApprovalPayload = (formData: SellableApprovalFormData): SellableApprovalPayload => {
    const { extraInventories, extraStocks, recId, cap, closeDate, valid, validTo, start, end, stocks, inventories } =
      formData;

    const extraInventoriesPayload = extraInventories?.reduce<SellableApprovalFormData["extraInventories"]>(
      (acc, item) => {
        return [...(acc || []), { qty: item.qty, recId: item.recId }];
      },
      [],
    );

    const extraStocksPayload = extraStocks?.reduce<SellableApprovalFormData["extraStocks"]>((acc, item) => {
      return [...(acc || []), { qty: item.qty, recId: item.recId }];
    }, []);

    const stocksPayload = stocks?.reduce<SellableApprovalFormData["stocks"]>((acc, item) => {
      return [...(acc || []), { qty: item.qty, recId: item.recId }];
    }, []);
    const inventoriesPayload = inventories?.reduce<SellableApprovalFormData["inventories"]>((acc, item) => {
      return [...(acc || []), { qty: item.qty, recId: item.recId }];
    }, []);

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
    onUpdateStatus,
    onDelete,
  };
};
export default useCRUDSellable;
