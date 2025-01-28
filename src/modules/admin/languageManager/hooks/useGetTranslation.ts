import { translationAPIs } from "@/services/management/cms/transtation";
import { useTQuery } from "@/lib/reactQueryHooks";
import { TranslationQueryParams } from "@/models/management/cms/translations.interface";
import { TRANSLATION_QUERY } from "@/constants/query-var.constant";

export const useGetTranslations = ({
  queryParams,
  enabled,
}: {
  queryParams: TranslationQueryParams;
  enabled?: boolean;
}) => {
  return useTQuery({
    queryKey: [TRANSLATION_QUERY.GET_TRANSLATION_LIST, { queryParams }],
    queryFn: () => translationAPIs.getList(queryParams),
    select: (data) => ({
      list: data.result,
      pageCurrent: data.pageCurrent,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
    }),
    enabled: enabled,
  });
};
