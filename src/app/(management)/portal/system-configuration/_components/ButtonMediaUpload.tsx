"use client";
import { Button } from "antd";
import { useDrawerMedia } from "@/modules/admin/drawerMedia/useDrawerMedia";
import { useEffect } from "react";
const ButtonMediaUpload = () => {
  const drawerMedia = useDrawerMedia({ isMultiple: true });

  const handleSelectMedia = () => [
    drawerMedia.open({
      onSelect: (items) => {
        console.log(items);
      },
    }),
  ];
  return <Button onClick={handleSelectMedia}>Upload file</Button>;
};
export default ButtonMediaUpload;
