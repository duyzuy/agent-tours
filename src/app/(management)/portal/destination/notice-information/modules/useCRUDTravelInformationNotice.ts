import {
  useCreateTravelNoticeMutation,
  useUpdateTravelNoticeMutation,
  useUpdateStatusTravelNoticeMutation,
  useDeleteTravelNoticeMutation,
} from "@/mutations/managements/travelNotice";
import { TravelInformationNoticeData } from "./travelInformationNotice";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { useRouter } from "next/navigation";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { TravelInformationNoticeListResponse } from "@/models/management/cms/cmsStateProvinceNotice";
const useCRUDTravelInformationNotice = () => {
  const { mutate: makeCreate, isPending: isPendingCreate } = useCreateTravelNoticeMutation();
  const { mutate: makeUpdate, isPending: isPendingUpdate } = useUpdateTravelNoticeMutation();
  const { mutate: makeUpdateStatus, isPending: isPendingUpdateStatus } = useUpdateStatusTravelNoticeMutation();
  const { mutate: makeDelete, isPending: isPendingDelete } = useDeleteTravelNoticeMutation();

  const message = useMessage();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onCreate = (formData: TravelInformationNoticeData, cb?: () => void) => {
    makeCreate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        router.push(`/portal/destination/notice-information/${data.result.originId}`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_DETAIL, { originId: data.result.originId }],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdate = (formData: TravelInformationNoticeData, cb?: () => void) => {
    makeUpdate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_DETAIL, { originId: data.result.originId }],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdateStatus = (formData?: { id?: number; status?: PageContentStatus }, cb?: () => void) => {
    makeUpdateStatus(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật trạng thái thành công.`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_DETAIL, { originId: data.result.originId }],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };
  const onDelete = (id: number, cb?: () => void) => {
    makeDelete(id, {
      onSuccess: (data, variables) => {
        message.success(`Xoá thành công.`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_LIST],
        });

        queryClient.setQueryData(
          [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_DETAIL, { originId: data.result.originId }],
          (oldData: TravelInformationNoticeListResponse) => {
            let newResult = [...oldData.result];
            const indexItem = newResult.findIndex((item) => item.id === data.result.id);
            newResult.splice(indexItem, 1);

            return {
              ...oldData,
              result: newResult,
            };
          },
        );

        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  return {
    onCreate,
    onUpdate,
    onUpdateStatus,
    onDelete,
  };
};
export default useCRUDTravelInformationNotice;
