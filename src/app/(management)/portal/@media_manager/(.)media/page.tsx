"use client";
import MediaManagerContainer from "@/modules/admin/manageMedia/components/MediaManagerContainer";
import { Drawer, DrawerProps } from "antd";
import { useState } from "react";

const MediaDrawerPage = () => {
  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} placement="bottom" onClose={onClose} height={"90vh"}>
      <MediaManagerContainer />
    </Drawer>
  );
};
export default MediaDrawerPage;
