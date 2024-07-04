import useMessage from "@/hooks/useMessage";
import {
    useCreateCMSTemplateMetaContentIncludeAndNodeMutation,
    useCreateCMSTemplateMetaContentItineraryMutation,
    useUpdateCMSTemplateMetaContentItineraryMutation,
    useUpdateCMSTemplateMetaContentIncludeAndNodeMutation,
} from "@/mutations/managements/cmsTemplate";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { VisaTemplateContentMetaDataForm } from "./visaTemplate.interface";

import { useRouter } from "next/navigation";

const useCRUDCMSTemplateContentMetadata = () => {
    const { mutate: makeCreateContentAndNote } =
        useCreateCMSTemplateMetaContentIncludeAndNodeMutation();

    const { mutate: makeUpdateContentAndNode } =
        useUpdateCMSTemplateMetaContentIncludeAndNodeMutation();

    const { mutate: makeCreateItinerary } =
        useCreateCMSTemplateMetaContentItineraryMutation();

    const { mutate: makeUpdateItinerary } =
        useUpdateCMSTemplateMetaContentItineraryMutation();
    const router = useRouter();
    const queryClient = useQueryClient();
    const message = useMessage();

    const onCreateMetaContentAndIncludeAndNote = (
        formData: VisaTemplateContentMetaDataForm,
        cb?: () => void,
    ) => {
        makeCreateContentAndNote(formData, {
            onSuccess: (data, variables) => {
                message.success(`Tạo thành công`);
                console.log(data);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
                });

                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };

    const onUpdateMetaContentAndIncludeAndNote = (
        formData: VisaTemplateContentMetaDataForm,
        cb?: () => void,
    ) => {
        makeUpdateContentAndNode(formData, {
            onSuccess: (data, variables) => {
                message.success(`Cập nhật công`);
                console.log(data);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
                });

                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };
    const onCreateMetaContentItinerary = (
        formData: VisaTemplateContentMetaDataForm,
        cb?: () => void,
    ) => {
        makeCreateItinerary(formData, {
            onSuccess: (data, variables) => {
                message.success(`Tạo thành công`);
                console.log(data);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
                });

                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };

    const onUpdateMetaContentItinerary = (
        formData: VisaTemplateContentMetaDataForm,
        cb?: () => void,
    ) => {
        makeUpdateItinerary(formData, {
            onSuccess: (data, variables) => {
                message.success(`Cập nhật thành công`);
                console.log(data);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL],
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
        onCreateMetaContentAndIncludeAndNote,
        onUpdateMetaContentAndIncludeAndNote,
        onCreateMetaContentItinerary,
        onUpdateMetaContentItinerary,
    };
};
export default useCRUDCMSTemplateContentMetadata;
