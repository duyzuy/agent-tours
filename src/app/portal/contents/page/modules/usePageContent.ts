import { IMediaFolderPayload } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";

import { useCreatePageContentMutation } from "@/mutations/managements/pageContent";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { PageContentFormData } from "./pageContent.interface";

export type TMediaFolderErrorsField = Partial<
    Record<keyof Pick<IMediaFolderPayload, "folderName" | "folderSlug">, string>
>;
const usePageContent = () => {
    const { mutate: makeCreate } = useCreatePageContentMutation();

    const queryClient = useQueryClient();

    const message = useMessage();
    const onCreate = (formData: PageContentFormData, cb?: () => void) => {
        makeCreate(formData, {
            onSuccess: (data, variables) => {
                message.success(`Tạo trang thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_PAGE_LIST],
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
export default usePageContent;
