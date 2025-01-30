"use client";
import { SessionProvider, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { CustomerProvider } from "@/store";
import useMessage from "@/hooks/useMessage";
import { useEffect, useReducer } from "react";
import { useGetUserProfile } from "@/queries/fe/customer";
import { useAppManager } from "@/store/appContext";
type Props = {
  children?: React.ReactNode;
  session?: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  const [_, dispatch] = useAppManager();
  const { data, isLoading } = useGetUserProfile({ enable: !!session, token: session?.user.accessToken });
  const message = useMessage();

  useEffect(() => {
    if (session && !isLoading) {
      if (data) {
        dispatch({
          type: "SET_PROFILE",
          payload: data.result,
        });
      } else {
        signOut({ redirect: true }).then((data) => {
          message.info("Phiên đăng nhập hết hạn.");
          console.log(data);
        });
      }
    }
  }, [data, isLoading, session]);

  return (
    <SessionProvider session={session}>
      <CustomerProvider session={session}>{children}</CustomerProvider>
    </SessionProvider>
  );
};
