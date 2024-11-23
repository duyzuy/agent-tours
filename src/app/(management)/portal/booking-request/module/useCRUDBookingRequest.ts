import useMessage from "@/hooks/useMessage";
import {
  useCreateBookingRequestMutation,
  useUpdateBookingRequestMutation,
} from "@/mutations/managements/bookingRequest";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { BookingRequestFormData } from "./bookingRequest.interface";
import { queryCore } from "@/queries/var";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";
import {
  BookingRequestPayload,
  BookingRequestResponse,
  BookingRequestUpdateStatusPayload,
} from "@/models/management/bookingRequest/bookingRequest.interface";
import { BaseResponse } from "@/models/common.interface";

type UseCRUDBookingRequestType = {
  onCreate: (
    data: BookingRequestFormData,
    options?: MutateOptions<BookingRequestResponse, BaseResponse<null>, BookingRequestPayload, unknown>,
  ) => void;
  onUpdate: (
    data: BookingRequestFormData,
    options?: MutateOptions<BookingRequestResponse, BaseResponse<null>, BookingRequestPayload, unknown>,
  ) => void;
  onUpdateStatus: (
    data: BookingRequestUpdateStatusPayload,
    options?: MutateOptions<BookingRequestResponse, BaseResponse<null>, BookingRequestPayload, unknown>,
  ) => void;
};

const useCRUDBookingRequest = () => {
  const { mutate: create } = useCreateBookingRequestMutation();
  const { mutate: update } = useUpdateBookingRequestMutation();

  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate: UseCRUDBookingRequestType["onCreate"] = (formData, options) => {
    const correctDataPayload = {
      ...formData,
      startDate: dayjs(formData.startDate).locale("en").format(DATE_TIME_FORMAT),
      endDate: dayjs(formData.endDate).locale("en").format(DATE_TIME_FORMAT),
    };
    create(
      { ...correctDataPayload },
      {
        onSuccess(data, variables, context) {
          options?.onSuccess?.(data, variables, context);
          queryClient.invalidateQueries({ queryKey: [queryCore.GET_BOOKING_REQUEST_LIST] });
          message.success("Tạo thành công");
        },
        onError(error, variables, context) {
          options?.onError?.(error, variables, context);
          message.error(error.message);
        },
      },
    );
  };
  const onUpdate: UseCRUDBookingRequestType["onUpdate"] = (formData, options) => {
    const correctDataPayload = {
      ...formData,
      startDate: dayjs(formData.startDate).locale("en").format(DATE_TIME_FORMAT),
      endDate: dayjs(formData.endDate).locale("en").format(DATE_TIME_FORMAT),
    };
    update(
      { ...correctDataPayload },
      {
        onSuccess(data, variables, context) {
          options?.onSuccess?.(data, variables, context);
          queryClient.invalidateQueries({ queryKey: [queryCore.GET_BOOKING_REQUEST_DETAIL] });
          message.success("Cập nhật thành công");
        },
        onError(error, variables, context) {
          options?.onError?.(error, variables, context);
          message.error(error.message);
        },
      },
    );
  };
  const onUpdateStatus: UseCRUDBookingRequestType["onUpdateStatus"] = (payload, options) => {
    update(payload, {
      onSuccess(data, variables, context) {
        options?.onSuccess?.(data, variables, context);
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_BOOKING_REQUEST_DETAIL] });
        message.success("Cập nhật trạng thái thành công");
      },
      onError(error, variables, context) {
        options?.onError?.(error, variables, context);
        message.error(error.message);
      },
    });
  };

  return {
    onCreate,
    onUpdate,
    onUpdateStatus,
  };
};
export default useCRUDBookingRequest;
