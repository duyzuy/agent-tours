"use client";
import React, { useState, useEffect } from "react";
import TitleRow from "@/components/admin/TitleRow";

import { Avatar, Button, Form, Input, List, Skeleton, Space, Switch, Table } from "antd";

import { useGetPostListLangQuery } from "@/queries/cms/post";

import { Select } from "antd";
import TableListPage from "@/components/admin/TableListPage";
import { PostListResponse } from "@/models/management/post.interface";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import { LINKS } from "@/constants/links.constant";
import { columns } from "./columns";
interface DataType {
  key: React.Key;
  name: string;
  category: string;
  tag: string;
  status: "publish" | "unpublish";
}

const PostPage = () => {
  const router = useRouter();

  const { data, isLoading } = useGetPostListLangQuery();

  return (
    <PageContainer
      name="Bài viết"
      modelName="Bài viết"
      onClick={() => router.push(LINKS.PostCreate)}
      breadCrumItems={[{ title: "Danh sách bài viết" }]}
    >
      <div className="post-page">
        <div className="space h-6"></div>
        <div className="post-tool py-4 flex justify-between">
          <div className="filter">
            <Space>
              <Select defaultValue="all" style={{ width: 180 }} onChange={() => {}} options={[]} />
              <Button type="primary" ghost>
                Lọc
              </Button>
            </Space>
          </div>
          <div className="search">
            <Form layout="inline">
              <Form.Item name="searchPost">
                <Input placeholder="Nhập tên bài viết..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" ghost>
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <TableListPage<PostListResponse["result"][0]>
          scroll={{ x: 1000 }}
          modelName="Bài viết"
          dataSource={data?.list || []}
          rowKey={"id"}
          columns={columns}
          isLoading={isLoading}
          onEdit={({ originId }) => router.push(`/portal/contents/post/${originId}`)}

          // pagination={{
          //   total: data?.totalItems,
          //   pageSize: data?.pageSize,
          //   current: data?.pageCurrent,
          //   onChange: (page) =>
          //     setQueryParams((params) => ({
          //       ...params,
          //       pageCurrent: page,
          //     })),
          // }}
        />
      </div>
    </PageContainer>
  );
};
export default PostPage;
