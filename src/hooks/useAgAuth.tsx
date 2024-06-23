import { useCallback, useState } from "react";
import {
    getAgToken,
    removeAgToken,
    setAgToken,
    setLocalUserName,
    removeLocalUserName,
} from "@/utils/common";

const useAuth = () => {
    const [tokenState, setStateToken] = useState(getAgToken());

    const setToken = useCallback(
        (newToken: string) => {
            setAgToken(newToken);
        },
        [setAgToken],
    );

    return {
        token: tokenState,
        setToken,
        isAuth: !!tokenState,
        clearToken: removeAgToken,
        setLocalUserName,
        removeLocalUserName,
    };
};

export default useAuth;
