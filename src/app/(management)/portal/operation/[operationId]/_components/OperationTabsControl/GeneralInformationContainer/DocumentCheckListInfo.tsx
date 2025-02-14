import { mediaConfig } from "@/configs";
import { IDocument } from "@/models/management/core/document.interface";
import { LinkOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Popover, PopoverProps, Progress, Space, Tag } from "antd";
import Link from "next/link";
import { useState } from "react";

interface DocumentCheckListInfoProps {
  items: IDocument[];
}
const DocumentCheckListInfo: React.FC<DocumentCheckListInfoProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const totalDocumentCount = items?.length || 0;
  const finishedDocumentCount = items?.filter(({ status }) => status === "FINISHED").length || 0;
  const handleOpenChange: PopoverProps["onOpenChange"] = (visible) => {
    setOpen(visible);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <Space className="font-semibold">
            <span className="text-green-600">{finishedDocumentCount}</span>
            <span>/</span>
            <span>{totalDocumentCount}</span>
          </Space>
          hồ sơ giấy tờ đã nộp
        </div>
        <Popover
          open={open}
          onOpenChange={handleOpenChange}
          trigger="click"
          content={
            <div className="w-full max-w-[400px]">
              <ul className="flex flex-col gap-y-1">
                {items?.map(({ documentName, status, documentCheckListId, attachedMedias }, _index) => (
                  <li key={documentCheckListId}>
                    <div className="flex gap-x-1 justify-between items-start">
                      <div className="w-20 text-right">
                        <Tag
                          className="text-xs !mr-0"
                          color={
                            status === "FINISHED"
                              ? "green"
                              : status === "NOT_FINISHED"
                              ? "red"
                              : status === "NEW"
                              ? "blue"
                              : "default"
                          }
                          bordered={false}
                        >
                          {status === "FINISHED"
                            ? "Đã nộp"
                            : status === "HANDOVERED"
                            ? "Đã bàn giao"
                            : status === "NEW"
                            ? "Mới"
                            : status === "NOT_FINISHED"
                            ? "Chưa nộp"
                            : "Unknown"}
                        </Tag>
                      </div>
                      <div className="flex-1 flex gap-x-1">
                        <div className="w-6 inline-block text-center">{`${_index + 1}.`}</div>
                        <div className="flex-1">
                          <div className="">{documentName}</div>
                          {attachedMedias?.map((item) => (
                            <div className="flex-1" key={item.id}>
                              <Link
                                href={`${mediaConfig.rootApiPath}/${item.fullPath}`}
                                className="inline-flex items-start gap-x-1"
                                target="_blank"
                              >
                                <LinkOutlined className="mt-[6px]" />
                                <span>{item.path}</span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                )) || "--"}
              </ul>
            </div>
          }
          title="Danh sách hồ sơ giấy tờ"
        >
          <Button type="text" size="small" className="!text-blue-600 !inline-flex !items-center">
            <span>Chi tiết</span>
            <RightOutlined className="text-[10px] !ml-1" />
          </Button>
        </Popover>
      </div>
      <Progress percent={Math.round(((finishedDocumentCount * 100) / totalDocumentCount) * 100) / 100} size="small" />
    </>
  );
};
export default DocumentCheckListInfo;
