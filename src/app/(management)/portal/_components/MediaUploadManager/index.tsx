"use client";
import React, { useCallback, useState } from "react";
import MediaUploadDrawler from "../../media/_components/MediaUploadDrawler";
import { useMediaManager } from "../../media/hooks/useMediaManager";
// import MediaContainer from "@/components/admin/MediaContainer";

const MediaUploadManager: React.FC = () => {
    const { isOpen, onClose, onConfirm } = useMediaManager();
    return (
        <MediaUploadDrawler
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
};
export default MediaUploadManager;
