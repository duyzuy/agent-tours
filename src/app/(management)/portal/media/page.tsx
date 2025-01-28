"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import MediaManagerContainer from "@/modules/admin/manageMedia/components/MediaManagerContainer";

const MediaPage = () => {
  return (
    <PageContainer
      name="Quản lý Media"
      className="h-full"
      modelName="mục"
      hideAddButton={true}
      breadCrumItems={[{ title: "Media" }]}
    >
      <MediaManagerContainer />
    </PageContainer>
  );
};
export default MediaPage;
