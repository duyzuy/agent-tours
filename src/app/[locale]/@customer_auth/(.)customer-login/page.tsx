"use client";
import { Drawer, DrawerProps } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "@/modules/fe/auth/components/AuthModal";

const MediaDrawerPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    router.back();
  };
  useEffect(() => {
    console.log("mounted");
    if (!pathname.includes("customer-login")) return;
    if (!open) {
      setOpen(true);
    }
    return () => {
      console.log("unmounted");
    };
  }, [pathname]);

  return <AuthModal open />;
};
export default MediaDrawerPage;
