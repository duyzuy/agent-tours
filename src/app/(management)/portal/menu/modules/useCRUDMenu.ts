import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} from "@/mutations/managements/menu";
import useMessage from "@/hooks/useMessage";
import { queryCMS } from "@/queries/var";
import { MenuItemFormData, MenuPositionType } from "@/models/management/cms/menu.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { useCallback } from "react";

const useCRUDMenu = () => {
  const queryClient = useQueryClient();
  const message = useMessage();

  const { mutate: makeCreate, isPending: isPendingCreate } = useCreateMenuItemMutation();
  const { mutate: makeDelete, isPending: isPendingDelete } = useDeleteMenuItemMutation();
  const { mutate: makeUpdate, isPending: isPendingUpdate } = useUpdateMenuItemMutation();

  const deleteItem = (payload: { id: number; position: MenuPositionType; lang: LangCode }, cb?: () => void) => {
    makeDelete(Number(payload.id), {
      onSuccess(data, variables, context) {
        message.success("Xoá thành công");
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MENU_POSITION_LIST, { menuPosition: payload.position, lang: payload.lang }],
        });
        cb?.();
      },
      onError(error, variables, context) {
        message.error(error.message);
      },
    });
  };

  const createItem = (
    {
      data,
      position,
      lang,
    }: {
      data: MenuItemFormData[];
      position: MenuPositionType;
      lang: LangCode;
    },
    cb?: () => void,
  ) => {
    makeCreate(data, {
      onSuccess(data, variables, context) {
        message.success("Thêm thành công");
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MENU_POSITION_LIST, { menuPosition: position, lang: lang }],
        });
        cb?.();
      },
      onError(error, variables, context) {
        message.error(error.message);
      },
    });
  };

  const updateItem = useCallback(
    (
      payload: {
        data: MenuItemFormData & { id: number };
        menuPosition: MenuPositionType;
        lang: LangCode;
      },
      cb?: () => void,
    ) => {
      const { data, menuPosition, lang } = payload;
      makeUpdate(
        { ...data },
        {
          onSuccess(data, variables, context) {
            message.success("Cập nhật menu thành công");
            queryClient.invalidateQueries({
              queryKey: [queryCMS.GET_MENU_POSITION_LIST, { menuPosition: menuPosition, lang: lang }],
            });
            cb?.();
          },
          onError(error, variables, context) {
            message.error(error.message);
          },
        },
      );
    },
    [],
  );

  return {
    onDelete: deleteItem,
    onCreate: createItem,
    onUpdate: updateItem,
    isPendingCreate,
    isPendingUpdate,
    isPendingDelete,
  };
};
export default useCRUDMenu;
