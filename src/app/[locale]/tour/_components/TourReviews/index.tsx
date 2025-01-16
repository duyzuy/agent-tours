"use client";
import React from "react";
import classNames from "classnames";
import { Rate, Progress, Button, Form, Input, Row, Col, List, Avatar } from "antd";
import styled from "styled-components";
import FormItem from "@/components/base/FormItem";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

interface Props {
  className?: string;
}
const TourReviews: React.FC<Props> = ({ className = "" }) => {
  const rates = [
    {
      id: 5,
      percent: 80,
      rateNum: 5,
    },

    {
      id: 4,
      percent: 20,
      rateNum: 4,
    },

    {
      id: 3,
      percent: 0,
      rateNum: 3,
    },

    {
      id: 2,
      percent: 30,
      rateNum: 2,
    },
    {
      id: 1,
      percent: 20,
      rateNum: 1,
    },
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Minh Khôi",
      review: "Mùa thu hàn quốc đẹp quá. Mình đi 6 người có giá ưu đãi không shop",
      date: "28/08/2023 09:30",
    },
    {
      id: 2,
      reviewer: "Hoàng thì Khôi",
      review: "Mùa thu hàn quốc đẹp quá. Mình đi 6 người có giá ưu đãi không shop",
      date: "28/08/2023 09:30",
    },
    {
      id: 3,
      reviewer: "Minh Tú",
      review: "Mùa thu hàn quốc đẹp quá. Mình đi 6 người có giá ưu đãi không shop",
      date: "28/08/2023 09:30",
    },
  ];
  return (
    <div
      className={classNames("tour-reviews", {
        [className]: className,
      })}
    >
      <div className="rating-summary border p-4 rounded-lg mb-6">
        <div className="title">
          <div className="flex items-center justify-between py-2 mb-4">
            <p className="text-lg font-semibold text-red-600">Đánh giá sản phẩm</p>
            <Button type="primary" className="bg-primary-default">
              Đánh giá ngay
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="rating text-center">
              <span className="text-5xl font-bold text-red-600">4,1</span>
              <div>
                <StyledRate value={3} disabled={true} allowHalf />
                <p className="py-2">20 Đánh giá</p>
              </div>
            </div>
            <div className="rate-breakdown w-60">
              {rates.map((rate) => (
                <div className="flex items-center justify-center" key={rate.id}>
                  <span className="rate block mr-2">{rate.rateNum}</span>
                  <Progress percent={rate.percent} size="small" strokeColor="#FFC107" status="normal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-summary border p-4 rounded-lg">
        <div className="reviews-title py-2 mb-3">
          <p className="font-bold text-lg">2 bình luận</p>
        </div>
        <div className="review-form">
          <Form size="large">
            <FormItem>
              <TextArea rows={3} placeholder="Nhận xét" style={{ resize: "none" }} />
            </FormItem>
            <Row gutter={{ xs: 8, md: 16 }}>
              <Col span="24" sm={24} md={10}>
                <FormItem required>
                  <Input
                    placeholder="Họ tên"
                    prefix={
                      <span className="text-gray-400">
                        <UserOutlined className="site-form-item-icon mr-1" />
                      </span>
                    }
                  />
                </FormItem>
              </Col>
              <Col span="24" sm={24} md={10}>
                <FormItem>
                  <Input
                    placeholder="Họ tên"
                    prefix={
                      <span className="text-gray-400">
                        <MailOutlined className="site-form-item-icon mr-1 " />
                      </span>
                    }
                  />
                </FormItem>
              </Col>
              <Col span="24" sm={24} md={4}>
                <Button type="primary" block>
                  Gửi
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="reivew-list">
          <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  // avatar={
                  //     <Avatar
                  //         src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  //     />
                  // }
                  title={<span className="font-semibold text-primary-default">{item.reviewer}</span>}
                  description={
                    <div className="description">
                      <div className="text-gray-900 mb-2">
                        <p>{item.review}</p>
                      </div>
                      <p className="text-xs">{item.date}</p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default TourReviews;

const StyledRate = styled(Rate)`
  && {
    font-size: 16px;
  }
  &&.travel-rate .travel-rate-star {
    margin-inline-end: 6px;
  }
`;
