import { useSession } from "next-auth/react";
import { useSignIn, useSignUp } from "../(auth)/modules/useAuth";

const useAuth = () => {
    const session = useSession();

    return {
        session,
    };
};
export default useAuth;
