"use client";
import { LINKS } from "@/constants/links.constant";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAgToken } from "@/utils/common";
/** USE CHECK AUTH FOR LOGIN PAGE / REGISTER PAGE **/

const Auth = ({ children }: any) => {
  const isAuth = !!getAgToken();
  const router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isAuth) {
      router.push(LINKS.DashBoard);
    } else {
      setShow(true);
    }
  }, [isAuth]);

  if (show) {
    return children;
  }

  return null;
};

export default Auth;
