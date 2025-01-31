"use client";
import { SessionProvider, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import useMessage from "@/hooks/useMessage";
import { useEffect } from "react";
import { useGetUserProfile } from "@/queries/fe/customer";
import { useAppDispatch } from "@/store/appContext";
type Props = {
  children?: React.ReactNode;
  session?: Session | null;
};

export const NextSessionProvider = ({ children, session }: Props) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserProfile({ enable: !!session, token: session?.user.accessToken });
  const message = useMessage();

  useEffect(() => {
    if (!session) return;

    if (isLoading) return;

    if (!data) {
      signOut({ redirect: true }).then((data) => {
        message.info("Phiên đăng nhập hết hạn.");
      });
      return;
    }

    dispatch({
      type: "SET_PROFILE",
      payload: data.result,
    });
  }, [data, isLoading, session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
