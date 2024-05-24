import {
    useCreateSupplierMutation,
    useApprovalSupplierMutation,
    useDeleteSupplierMutation,
    useUpdateSupplierMutation,
    useDeactiveSupplierMutation,
    useActiveSupplierMutation,
} from "@/mutations/managements/supplier";
import { queryCore } from "@/queries/var";
import { useQueryClient } from "@tanstack/react-query";
import { SupplierFormData } from "./manageSupplier.interface";
import useMessage from "@/hooks/useMessage";
import { Status } from "@/models/management/common.interface";
import { ISupplier } from "@/models/management/supplier.interface";

export interface UseManageSupplier {
    onCreate: (formData: SupplierFormData, cb?: () => void) => void;
    onUpdate: (formData: SupplierFormData, cb?: () => void) => void;
    onDelete: (recId: number, cb?: () => void) => void;
    onApproval: (recId: number, cb?: (data: ISupplier) => void) => void;
    onDeactive: (recId: number, cb?: (data: ISupplier) => void) => void;
    onActive: (recId: number, cb?: (data: ISupplier) => void) => void;
}

const useManageSupplier = (): UseManageSupplier => {
    const queryClient = useQueryClient();
    const { mutate: doCreate } = useCreateSupplierMutation();
    const { mutate: doApproval } = useApprovalSupplierMutation();
    const { mutate: doDelete } = useDeleteSupplierMutation();
    const { mutate: doUpdate } = useUpdateSupplierMutation();
    const { mutate: doDeactive } = useDeactiveSupplierMutation();
    const { mutate: doActive } = useActiveSupplierMutation();

    const message = useMessage();

    const onCreate: UseManageSupplier["onUpdate"] = (formData, cb) => {
        const { status, ...restData } = formData;
        if (status !== Status.OK && status !== Status.QQ) {
            throw new Error("Status of vendor invalid");
        }

        const supplierPayload = {
            status: status,
            ...restData,
        };
        doCreate(supplierPayload, {
            onSuccess: (data, variables) => {
                message.success(`Tạo Supplier thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SUPPLIER_LIST],
                });
                cb?.();
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };

    const onUpdate: UseManageSupplier["onUpdate"] = (formData, cb) => {
        const { status, ...restData } = formData;

        if (status !== Status.OK && status !== Status.QQ) {
            throw new Error("Status of vendor invalid");
        }

        const supplierPayload = {
            status: status,
            ...restData,
        };

        doUpdate(supplierPayload, {
            onSuccess: (data, variables) => {
                message.success(
                    `Cập nhật Vendor ${variables.recId} thành công`,
                );
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SUPPLIER_LIST],
                });
                cb?.();
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };
    const onDelete: UseManageSupplier["onDelete"] = (recId, cb) => {
        doDelete(recId, {
            onSuccess: (data, variables) => {
                message.success(`Xoá Supplier ${recId} thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SUPPLIER_LIST],
                });
                cb?.();
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };

    const onApproval: UseManageSupplier["onApproval"] = (recId, cb) => {
        doApproval(recId, {
            onSuccess: (data, variables) => {
                message.success(`Duyệt Supplier ${recId} thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SUPPLIER_LIST],
                });
                cb?.(data.result);
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };
    const onDeactive: UseManageSupplier["onDeactive"] = (recId, cb) => {
        doDeactive(recId, {
            onSuccess: (data, variables) => {
                message.success(`Huỷ Supplier ${recId} thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SUPPLIER_LIST],
                });
                cb?.(data.result);
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };
    const onActive: UseManageSupplier["onActive"] = (recId, cb) => {
        doActive(recId, {
            onSuccess: (data, variables) => {
                message.success(`Kích hoạt Supplier ${recId} thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SUPPLIER_LIST],
                });
                cb?.(data.result);
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };

    return { onCreate, onApproval, onDelete, onUpdate, onDeactive, onActive };
};
export default useManageSupplier;
