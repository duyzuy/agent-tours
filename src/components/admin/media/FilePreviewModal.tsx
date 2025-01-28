import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import FormItem from "@/components/base/FormItem";
import Image from "next/image";

interface FilePreviewModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  thumbUrl?: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ isOpen, onClose, thumbUrl }) => {
  return (
    <Modal open={isOpen} onCancel={onClose} footer={false} destroyOnClose={true} width={650}>
      <div className="image w-full h-[450px] relative bg-slate-50">
        {thumbUrl ? <Image src={thumbUrl} alt="preview" fill style={{ objectFit: "contain" }} /> : null}
      </div>
    </Modal>
  );
};
export default FilePreviewModal;
