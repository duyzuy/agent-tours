import useMessage from "@/hooks/useMessage";

import { useCreateCMSTemplateMutation } from "@/mutations/managements/cmsTemplate";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { CMSTemplateFormData } from "./cmsTemplate.interface";

import { useRouter } from "next/navigation";
import { CMSTemplatePayload } from "@/models/management/cms/cmsTemplate.interface";

const useCreateCMSTemplate = () => {
    const { mutate: makeCreate } = useCreateCMSTemplateMutation();

    const router = useRouter();
    const queryClient = useQueryClient();
    const message = useMessage();

    const onCreate = (formData: CMSTemplateFormData, cb?: () => void) => {
        const { images, ...restData } = formData;

        const galleriesPath = images?.listImage.reduce<string[]>(
            (acc, item) => {
                return (acc = [...acc, item.fullPath]);
            },
            [],
        );
        const payload: CMSTemplatePayload = {
            ...restData,
            images: {
                listImage: galleriesPath || [],
            },
        };
        makeCreate(payload, {
            onSuccess: (data, variables) => {
                message.success(`Tạo thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST],
                });

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
    };
};
export default useCreateCMSTemplate;
