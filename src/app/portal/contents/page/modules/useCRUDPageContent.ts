import useMessage from "@/hooks/useMessage";

import {
    useCreatePageContentMutation,
    useUpdatePageContentMutation,
    useUnPublishPageContentMutation,
    usePublishPageContentMutation,
} from "@/mutations/managements/pageContent";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { PageContentFormData } from "./pageContent.interface";

import { useRouter } from "next/navigation";

const useCRUDPageContent = () => {
    const { mutate: makeCreate } = useCreatePageContentMutation();
    const { mutate: makeUpdate } = useUpdatePageContentMutation();
    const { mutate: makeUnPublish } = useUnPublishPageContentMutation();
    const { mutate: makePublish } = usePublishPageContentMutation();

    const router = useRouter();
    const queryClient = useQueryClient();
    const message = useMessage();

    const onCreate = (formData: PageContentFormData, cb?: () => void) => {
        makeCreate(
            { ...formData },
            {
                onSuccess: (data, variables) => {
                    message.success(`Tạo trang thành công`);
                    queryClient.invalidateQueries({
                        queryKey: [queryCMS.GET_PAGE_LIST],
                    });
                    queryClient.invalidateQueries({
                        queryKey: [queryCMS.GET_PAGE_DETAIL],
                    });
                    router.push(
                        `./portal/contents/page/${data.result.originId}`,
                    );
                    cb?.();
                },
                onError: (error, variables) => {
                    console.log({ error, variables });
                    message.error(error.message);
                },
            },
        );
    };

    const onUpdate = (formData: PageContentFormData, cb?: () => void) => {
        makeUpdate(
            { ...formData },
            {
                onSuccess: (data, variables) => {
                    message.success(`Cập nhật thành công`);
                    queryClient.invalidateQueries({
                        queryKey: [queryCMS.GET_PAGE_LIST],
                    });
                    queryClient.invalidateQueries({
                        queryKey: [queryCMS.GET_PAGE_DETAIL],
                    });
                    cb?.();
                },
                onError: (error, variables) => {
                    console.log({ error, variables });
                    message.error(error.message);
                },
            },
        );
    };

    const onPublish = (id: number, cb?: () => void) => {
        makePublish(id, {
            onSuccess: (data, variables) => {
                message.success(`Cập nhật thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_PAGE_LIST],
                });
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_PAGE_DETAIL],
                });
                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };

    const onUnPublish = (id: number, cb?: () => void) => {
        makeUnPublish(id, {
            onSuccess: (data, variables) => {
                message.success(`Cập nhật thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_PAGE_LIST],
                });
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_PAGE_DETAIL],
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
        onUpdate,
        onPublish,
        onUnPublish,
    };
};
export default useCRUDPageContent;
