import React, { useState } from "react";
import Link from "next/link";
import { Button, Divider, Drawer, Progress, Space, Tag } from "antd";
import { IDocument } from "@/models/management/core/document.interface";
import { LinkOutlined, RightOutlined } from "@ant-design/icons";
import { mediaConfig } from "@/configs";
import UpdateDocumentButton from "./UpdateDocumentButton";
import CreateDocumentButton from "./CreateDocumentButton";
import { useThemeMode } from "@/context";

interface DocumentCheckListProps {
  documents?: IDocument[];
  paxId?: number;
  paxLastname?: string;
  paxMiddleFirstName?: string;
}

const DocumentCheckList = ({ documents, paxId, paxLastname, paxMiddleFirstName }: DocumentCheckListProps) => {
  const [themeMode] = useThemeMode();
  const finishedDocumentCount = documents?.filter((doc) => doc.status === "FINISHED").length || 0;
  const totalDocumentCount = documents?.length || 0;
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div className="document">
      <div className="document__head flex gap-x-3 mb-3 justify-between">
        <span className="font-semibold">Hồ sơ giấy tờ cần nộp</span>
        {paxId ? <CreateDocumentButton paxId={paxId} /> : null}
      </div>
      <div className="flex gap-x-2">
        <div className="flex items-center gap-x-2">
          <Space className="font-semibold">
            <span className="text-green-600">{finishedDocumentCount}</span>
            <span>/</span>
            <span>{totalDocumentCount}</span>
          </Space>
          đã nộp theo yêu cầu
        </div>
        <Button type="text" size="small" className="!text-blue-600" onClick={() => setShowDrawer(true)}>
          <span className="flex items-center gap-x-1">
            Chi tiết <RightOutlined className="w-3 h-3 text-[10px]" />
          </span>
        </Button>
      </div>
      <Progress percent={Math.round(((finishedDocumentCount * 100) / totalDocumentCount) * 100) / 100} />
      <Drawer
        width={550}
        title={`${paxLastname || "--"}, ${paxMiddleFirstName || "--"} - Hồ sơ giấy tờ cần nộp`}
        open={showDrawer}
        push={false}
        maskClosable={false}
        onClose={() => setShowDrawer(false)}
        className={themeMode === "dark" ? "text-gray-100" : "text-gray-900"}
      >
        <div
          className="document-list flex flex-col gap-y-3"
          style={{ scrollbarGutter: "stable", scrollbarWidth: "thin" }}
        >
          {documents?.map((data, _index) => (
            <React.Fragment key={data.documentCheckListId}>
              {_index !== 0 ? <Divider /> : null}
              <DocumentCardItem data={data} />
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
export default DocumentCheckList;

interface DocumentCardItemProps {
  data: IDocument;
}
function DocumentCardItem({ data }: DocumentCardItemProps) {
  const { status, documentDescription, documentName, attachedMedias, remark } = data;

  return (
    <div className="document-item">
      <div className="head-title mb-2">
        <div className="font-semibold inline-block">{documentName}</div>
        <Tag
          bordered={false}
          color={
            status === "NEW"
              ? "blue"
              : status === "FINISHED"
              ? "green"
              : status === "HANDOVERED"
              ? "lime"
              : status === "NOT_FINISHED"
              ? "red"
              : "default"
          }
          className="float-right"
        >
          {status === "NEW"
            ? "Mới"
            : status === "FINISHED"
            ? "Đã nộp"
            : status === "HANDOVERED"
            ? "Đã bàn giao"
            : status === "NOT_FINISHED"
            ? "Chưa nộp"
            : "Unknown"}
        </Tag>
      </div>
      <div className="mb-3">
        <div className="text-xs text-gray-500">Mô tả</div>
        <div dangerouslySetInnerHTML={{ __html: documentDescription || "--" }}></div>
      </div>
      <div className="mb-3">
        <div className="text-xs text-gray-500">Ghi chú</div>
        <div dangerouslySetInnerHTML={{ __html: remark || "--" }}></div>
      </div>
      <div className="mb-3">
        <div className="text-xs text-gray-500">File đính kèm</div>
        {attachedMedias && attachedMedias.length
          ? attachedMedias.map((item) => (
              <div key={item.id}>
                <Link
                  href={`${mediaConfig.rootApiPath}/${item.fullPath}`}
                  target="_blank"
                  className="inline-flex gap-x-1 items-start"
                >
                  <LinkOutlined className="mt-1" />
                  <span>{item.path}</span>
                </Link>
              </div>
            ))
          : "--"}
      </div>
      <UpdateDocumentButton data={data} />
    </div>
  );
}
