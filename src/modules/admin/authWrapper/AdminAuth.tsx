"use client";
import { LINKS } from "@/constants/links.constant";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAdminAuth from "@/modules/admin/auth/hooks/useAdminAuth";
/** USE CHECK AUTH FOR LOGIN PAGE / REGISTER PAGE **/
interface AuthProps {
  children?: React.ReactNode;
}
const AdminAuth = ({ children }: AuthProps) => {
  const { isAuth } = useAdminAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push(LINKS.DashBoard);
    }
  }, [isAuth]);

  return children;
};

export default AdminAuth;
