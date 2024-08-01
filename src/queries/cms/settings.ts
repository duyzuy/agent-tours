import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { settingAPIs } from "@/services/management/cms/settings";

export const useGetSettingEmailQuery = () => {
  return useQuery({
    queryKey: [queryCMS.GET_SETTING_EMAIL],
    queryFn: () => settingAPIs.getEmailSetting(),
    select(data) {
      return data.result;
    },
  });
};
