import { settingAPIs } from "@/services/management/cms/settings";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useUpdateSettingEmailMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { email: string; appPassword: string }) => settingAPIs.updateEmailSetting(payload),
  });
};
