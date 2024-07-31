"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { UserManagerProvider } from "@/app/[locale]/store/providers/UserManagerProvider";
import UserProfileContainer from "@/app/[locale]/containers/UserProfileContainer";
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
