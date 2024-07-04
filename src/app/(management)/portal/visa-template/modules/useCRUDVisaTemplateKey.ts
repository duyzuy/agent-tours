import useMessage from "@/hooks/useMessage";

import { useCreateVisaTempalateKeyMutation } from "@/mutations/managements/visaTemplate";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
// import {
//     CMSTemplateContentFormData,
//     CMSTemplateFormData,
// } from "./cmsTemplate.interface";
import { VisaTemplateKeyFormData } from "./visaTemplate.interface";

import { useRouter } from "next/navigation";

const useCRUDVisaTemplateKey = () => {
    const { mutate: makeCreateVisaTemplateKey } =
        useCreateVisaTempalateKeyMutation();
    // const { mutate: makeUpdateTemplate } = useUpdateCMSTemplateMutation();

    const router = useRouter();
    const queryClient = useQueryClient();
    const message = useMessage();

    const createTemplateKey = (
        formData: VisaTemplateKeyFormData,
        cb?: () => void,
    ) => {
        makeCreateVisaTemplateKey(formData, {
            onSuccess: (data, variables) => {
                message.success(`Tạo thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_VISA_TEMPLATE_LIST],
                });
                // router.push(`./portal/cms-template/${variables.code}`);
                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };

    // const onUpdateTemplate = (
    //     formData: CMSTemplateFormData,
    //     cb?: () => void,
    // ) => {
    //     makeUpdateTemplate(formData, {
    //         onSuccess: (data, variables) => {
    //             message.success(`Cập nhật thành công`);
    //             queryClient.invalidateQueries({
    //                 queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST],
    //             });
    //             cb?.();
    //         },
    //         onError: (error, variables) => {
    //             console.log({ error, variables });
    //             message.error(error.message);
    //         },
    //     });
    // };

    return {
        createTemplateKey,
        // onUpdateTemplate,
    };
};
export default useCRUDVisaTemplateKey;
