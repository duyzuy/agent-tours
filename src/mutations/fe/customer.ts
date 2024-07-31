import { customerAPIs } from "@/services/fe/customer";
import { useCustomMutation } from "../useCustomMutation";
import { CustomerProfilePayload } from "@/models/fe/profile.interface";
import { useSession } from "next-auth/react";

export const useCustomerUpdateProfileMutation = () => {
  const session = useSession();

  return useCustomMutation({
    mutationFn: (payload: CustomerProfilePayload) =>
      customerAPIs.updateProfile({ payload, token: session.data?.user.accessToken }),
  });
};
