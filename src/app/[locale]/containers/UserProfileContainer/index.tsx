"use client";
import React, { useEffect } from "react";
import { EUserActions } from "../../store/actions/userAction";
import { useUser } from "../../hooks/useUser";
import { Session } from "next-auth";
import { useGetUserProfile } from "@/queries/fe/customer";
import { signOut } from "next-auth/react";
import useMessage from "@/hooks/useMessage";

interface UserProfileContainerProps {
  session?: Session | null;
  accessToken?: string;
}
const UserProfileContainer: React.FC<UserProfileContainerProps> = ({ session, accessToken }) => {
  const [_, dispatch] = useUser();

  const { data, isLoading } = useGetUserProfile({ enable: !!session, token: session?.user.accessToken });
  const message = useMessage();
  // console.log(data, isLoading);

  useEffect(() => {
    if (session && !isLoading) {
      if (data) {
        dispatch({
          type: EUserActions.INIT_PROFILE,
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
  return null;
};
export default UserProfileContainer;
