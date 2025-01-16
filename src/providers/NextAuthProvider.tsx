"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import UserProfileContainer from "@/containers/UserProfileContainer";
import { UserManagerProvider } from "@/store/providers/UserManagerProvider";
type Props = {
  children?: React.ReactNode;
  session?: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <UserManagerProvider>
        <UserProfileContainer session={session} />
        {children}
      </UserManagerProvider>
    </SessionProvider>
  );
};
