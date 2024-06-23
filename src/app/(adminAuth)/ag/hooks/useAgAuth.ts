import { useMutation, useQuery } from "@tanstack/react-query";
import { agAuthAPIs } from "@/services/management/auth";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
import { removeAgToken, removeLocalUserName } from "@/utils/common";
import {
    IAgLoginErr,
    IAgLoginPayload,
    IAgLoginRs,
} from "@/models/management/localAuth.interface";

const useLoginPortal = () => {
    return useMutation<IAgLoginRs, IAgLoginErr, IAgLoginPayload, unknown>({
        mutationFn: (payload: IAgLoginPayload) => {
            return agAuthAPIs.login<IAgLoginRs>(
                "99",
                payload.username,
                payload.password,
            );
        },
    });
};

const useLogoutPortal = () => {
    const router = useRouter();
    const onLogoutPortal = () => {
        removeAgToken();
        removeLocalUserName();
        router.push(LINKS.PortalLogin);
    };
    return onLogoutPortal;
};

export { useLoginPortal, useLogoutPortal };
