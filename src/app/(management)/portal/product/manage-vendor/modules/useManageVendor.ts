import {
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useApprovalVendorMutation,
  useUpdateVendorMutation,
  useDeactiveVendorMutation,
  useActiveVendorMutation,
} from "@/mutations/managements/vendor";
import { queryCore } from "@/queries/var";
import { useQueryClient } from "@tanstack/react-query";
import { VendorFormData } from "./manageVendor.interface";
import useMessage from "@/hooks/useMessage";
import { Status } from "@/models/common.interface";
import { IVendor } from "@/models/management/vendor.interface";

export interface UseManageVendor {
  onCreate: (formData: VendorFormData, cb?: () => void) => void;
  onUpdate: (formData: VendorFormData, cb?: () => void) => void;
  onDelete: (recId: number, cb?: () => void) => void;
  onApproval: (recId: number, cb?: (data: IVendor) => void) => void;
  onDeactive: (recId: number, cb?: (data: IVendor) => void) => void;
  onActive: (recId: number, cb?: (data: IVendor) => void) => void;
}
const useManageVendor = (): UseManageVendor => {
  const queryClient = useQueryClient();
  const { mutate: doCreateVendor } = useCreateVendorMutation();
  const { mutate: doDelete } = useDeleteVendorMutation();
  const { mutate: doApproval } = useApprovalVendorMutation();
  const { mutate: doUpdate } = useUpdateVendorMutation();
  const { mutate: doDeactive } = useDeactiveVendorMutation();
  const { mutate: doActive } = useActiveVendorMutation();

  const message = useMessage();

  const onCreate = (formData: VendorFormData, cb?: () => void) => {
    const { typeList, status, ...restData } = formData;

    if (status !== Status.OK && status !== Status.QQ) {
      throw new Error("Status of vendor invalid");
    }

    const venvorPayload = {
      typeList: typeList,
      status: status,
      ...restData,
    };

    doCreateVendor(venvorPayload, {
      onSuccess: (data, variables) => {
        message.success(`Tạo Vendor thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_LIST],
        });
        cb?.();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const onUpdate = (formData: VendorFormData, cb?: () => void) => {
    const { typeList, status, ...restData } = formData;

    if (status !== Status.OK && status !== Status.QQ) {
      throw new Error("Status of vendor invalid");
    }

    const venvorPayload = {
      typeList: typeList,
      status: status,
      ...restData,
    };

    doUpdate(venvorPayload, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật Vendor #${variables.recId} thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_DETAIL, variables.recId],
        });
        cb?.();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const onDelete = (recId: number, cb?: () => void) => {
    doDelete(recId, {
      onSuccess: (data, variables) => {
        message.success(`Xoá Vendor #${recId} thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_LIST],
        });
        cb?.();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const onApproval = (recId: number, cb?: (data: IVendor) => void) => {
    doApproval(recId, {
      onSuccess: (data, variables) => {
        message.success(`Duyệt Vendor #${recId} thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_DETAIL, recId],
        });

        cb?.(data.result);
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const onDeactive = (recId: number, cb?: (data: IVendor) => void) => {
    doDeactive(recId, {
      onSuccess: (data, variables) => {
        message.success(`Huỷ kích hoạt Vendor #${recId} thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_DETAIL],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_DETAIL, recId],
        });
        cb?.(data.result);
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const onActive = (recId: number, cb?: (data: IVendor) => void) => {
    doActive(recId, {
      onSuccess: (data, variables) => {
        message.success(`Kích hoạt Vendor #${recId} thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_DETAIL],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_VENDOR_DETAIL, recId],
        });
        cb?.(data.result);
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return { onCreate, onDelete, onApproval, onUpdate, onDeactive, onActive };
};
export default useManageVendor;
