import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { translationAPIs } from "@/services/management/cms/transtation";
import { getAgToken } from "@/utils/common";

export const useGetTranslationFeQuery = (queryString: string) => {
  const token = getAgToken() || "";
  return useQuery({
    queryKey: [queryCMS.GET_TRANSLATION_LIST_FE, { queryString }],
    queryFn: () => translationAPIs.getList(queryString),
    select: (data) => {
      return data.result;
    },
    enabled: Boolean(token),
  });
};
