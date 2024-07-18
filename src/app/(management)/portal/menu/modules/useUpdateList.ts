import { useQueryClient } from "@tanstack/react-query";
import { useUpdateMenuListMutation } from "@/mutations/managements/menu";
import useMessage from "@/hooks/useMessage";
import { queryCMS } from "@/queries/var";
import { IMenuItem, MenuItemFormData, MenuPositionType } from "@/models/management/cms/menu.interface";
import { LangCode } from "@/models/management/cms/language.interface";

const useUpdateList = () => {
  const queryClient = useQueryClient();
  const message = useMessage();

  const { mutate: makeUpdateList, isPending: isPendingCreate } = useUpdateMenuListMutation();

  const makeUpdate = (
    { items, position, lang }: { items: IMenuItem[]; position: MenuPositionType; lang: LangCode },
    cb?: () => void,
  ) => {
    makeUpdateList(items, {
      onSuccess(data, variables, context) {
        message.success("Cập nhật thành công.");
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MENU_POSITION_LIST, { menuPosition: position, lang: lang }],
        });
      },
      onError(error, variables, context) {
        message.error(error.message);
      },
    });
  };

  return {
    onUpdate: makeUpdate,
    isPending: isPendingCreate,
  };
};
export default useUpdateList;
