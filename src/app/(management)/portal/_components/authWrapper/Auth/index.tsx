"use client";
import { LINKS } from "@/constants/links.constant";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAgToken } from "@/utils/common";
/** USE CHECK AUTH FOR LOGIN PAGE / REGISTER PAGE **/
interface AuthProps {
  children?: React.ReactNode;
}
const Auth = ({ children }: AuthProps) => {
  const isAuth = !!getAgToken();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push(LINKS.DashBoard);
    }
  }, [isAuth]);

  return children;
};

export default Auth;
