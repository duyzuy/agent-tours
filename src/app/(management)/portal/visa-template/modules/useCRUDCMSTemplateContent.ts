// import useMessage from "@/hooks/useMessage";

// import {
//     useUpdateCMSTemplateContentMutation,
//     useUpdateStatusCMSTemplateContentMutation,
//     useDeleteCMSTemplateContentMutation,
// } from "@/mutations/managements/cmsTemplate";

// import { useQueryClient } from "@tanstack/react-query";
// import { queryCMS } from "@/queries/var";
// import { CMSTemplateContentFormData } from "./cmsTemplate.interface";
// import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

// import { useRouter } from "next/navigation";

// const useCRUDCMSTemplateContent = () => {
//     const { mutate: makeUpdateTemplateContent } =
//         useUpdateCMSTemplateContentMutation();

//     const { mutate: makeUpdateStatus } =
//         useUpdateStatusCMSTemplateContentMutation();

//     const { mutate: makeDelete } = useDeleteCMSTemplateContentMutation();
//     useDeleteCMSTemplateContentMutation;

//     const router = useRouter();
//     const queryClient = useQueryClient();
//     const message = useMessage();

//     const onUpdateTemplateContent = (
//         formData: CMSTemplateContentFormData,
//         cb?: () => void,
//     ) => {
//         makeUpdateTemplateContent(formData, {
//             onSuccess: (data, variables) => {
//                 message.success(`Cập nhật thành công`);
//                 queryClient.invalidateQueries({
//                     queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST],
//                 });
//                 queryClient.invalidateQueries({
//                     queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
//                 });
//                 cb?.();
//             },
//             onError: (error, variables) => {
//                 console.log({ error, variables });
//                 message.error(error.message);
//             },
//         });
//     };

//     const onUpdateStatus = (
//         data: { id: number; status: PageContentStatus },
//         cb?: () => void,
//     ) => {
//         makeUpdateStatus(data, {
//             onSuccess: (data, variables) => {
//                 message.success(
//                     variables.status === PageContentStatus.PUBLISH
//                         ? "Kích hoạt thành công."
//                         : "Huỷ kích hoạt thành công.",
//                 );
//                 queryClient.invalidateQueries({
//                     queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST],
//                 });
//                 queryClient.invalidateQueries({
//                     queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
//                 });
//                 cb?.();
//             },
//             onError: (error, variables) => {
//                 console.log({ error, variables });
//                 message.error(error.message);
//             },
//         });
//     };

//     const onDeleteTemplateContent = (id?: number, cb?: () => void) => {
//         makeDelete(id, {
//             onSuccess: (data, variables) => {
//                 message.success(`Xoá bài viết thành công`);
//                 queryClient.invalidateQueries({
//                     queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
//                 });
//                 queryClient.invalidateQueries({
//                     queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST],
//                 });
//                 cb?.();
//             },
//             onError: (error, variables) => {
//                 console.log({ error, variables });
//                 message.error(error.message);
//             },
//         });
//     };

//     return {
//         onUpdateTemplateContent,
//         onUpdateStatus,
//         onDeleteTemplateContent,
//     };
// };
// export default useCRUDCMSTemplateContent;
