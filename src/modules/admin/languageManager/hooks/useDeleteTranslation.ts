import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { TRANSLATION_QUERY } from "@/constants/query-var.constant";
import { translationAPIs } from "@/services/management/cms/transtation";

export const useDeleteTranslation = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: translationAPIs.delete,
    onSuccess: (data, variables) => {
      message.success(`Xoá thành công.`);
      queryClient.invalidateQueries({
        queryKey: [TRANSLATION_QUERY.GET_TRANSLATION_LIST],
      });
    },
    onError: (error, variables) => {
      console.log({ error, variables });
      message.error(error.message);
    },
  });
};

// import {
//   useCreateTranslationMutation,
//   useUpdateTranslationMutation,
//   useDeleteTranslationMutation,
// } from "@/mutations/managements/translation";
// import { TranslationFormData } from "./language.interface";
// import useMessage from "@/hooks/useMessage";
// import { useQueryClient } from "@tanstack/react-query";
// import { queryCMS } from "@/queries/var";
// const useCreateTranslation = () => {
//   const { mutate: makeCreate } = useCreateTranslationMutation();
//   const { mutate: makeUpdate } = useUpdateTranslationMutation();
//   const { mutate: makeDelete } = useDeleteTranslationMutation();
//   const message = useMessage();
//   const queryClient = useQueryClient();

//   const onCreate = (formData: TranslationFormData, cb?: () => void) => {
//     makeCreate(formData, {
//       onSuccess(data, variables, context) {
//         message.success("Tạo bản dịch thành công");
//         queryClient.invalidateQueries({
//           queryKey: [queryCMS.GET_TRANSLATION_LIST_FE],
//         });
//         cb?.();
//       },
//       onError(error, variables, context) {
//         message.error(error.message);
//       },
//     });
//   };

//   const onUpdate = (id: number, formData: TranslationFormData, cb?: () => void) => {
//     makeUpdate(
//       { ...formData, id },
//       {
//         onSuccess(data, variables, context) {
//           message.success("Tạo bản dịch thành công");
//           queryClient.invalidateQueries({
//             queryKey: [queryCMS.GET_TRANSLATION_LIST_FE],
//           });
//           cb?.();
//         },
//         onError(error, variables, context) {
//           message.error(error.message);
//         },
//       },
//     );
//   };

//   const onDelete = (id: number, cb?: () => void) => {
//     makeDelete(id, {
//       onSuccess(data, variables, context) {
//         message.success(`Xoá bản dịch thành công.`);
//         queryClient.invalidateQueries({
//           queryKey: [queryCMS.GET_TRANSLATION_LIST_FE],
//         });
//         cb?.();
//       },
//       onError(error, variables, context) {
//         message.error(error.message);
//       },
//     });
//   };

//   return {
//     onCreate,
//     onUpdate,
//     onDelete,
//   };
// };
// export default useCreateTranslation;
