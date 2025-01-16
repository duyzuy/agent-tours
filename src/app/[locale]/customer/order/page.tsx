import { getTranslations } from "next-intl/server";
import { getOrderList } from "../_actions/customer";
import dayjs from "dayjs";
import { Link } from "@/utils/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import type { Metadata, ResolvingMetadata } from "next";
import { PaymentStatus } from "@/models/common.interface";
import { Space, Tag } from "antd";
import { moneyFormatVND } from "@/utils/helper";
import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/date";
import { IconArrowRightCircle } from "@/assets/icons";

export async function generateMetadata(
  { params }: { params: { locale: LangCode } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data

  return {
    title: "Orders",
    // keywords: pageContent?.metaKeyword,
    // description: pageContent?.metaDescription,
    // openGraph: {
    //   images: nextImage,
    //   description: pageContent?.metaDescription,
    // },
  };
}

export default async function CustomerOrdersPage({ params }: { params: { locale: LangCode } }) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("String");
  const c = await getTranslations("Customer");

  const orderList = await getOrderList();

  return (
    <>
      <div className="box-info mb-6">
        <h1 className="text-xl flex items-center font-[500] mb-6">
          <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
          {c("subPage.orders.title")}
        </h1>
        <div className="orders-list flex flex-col gap-6">
          {orderList?.map((order) => (
            <div className="order-item border-b pb-3 hover:bg-slate-50" key={order.recId}>
              <h4 className="text-[16px] font-[500] mb-3">
                <Space>
                  {`#${order.recId} - ${order.template.name}`}{" "}
                  {order.paymentStatus === PaymentStatus.DEPOSITED ? (
                    <Tag color="blue" bordered={false}>
                      Đã cọc
                    </Tag>
                  ) : order.paymentStatus === PaymentStatus.NOTPAID ? (
                    <Tag color="red" bordered={false}>
                      Chưa thanh toán
                    </Tag>
                  ) : order.paymentStatus === PaymentStatus.PAID ? (
                    <Tag color="green" bordered={false}>
                      Đã Thanh toán
                    </Tag>
                  ) : (
                    "Unknown"
                  )}
                </Space>
              </h4>
              <div className="order-item__top flex items-center gap-3 lg:gap-6 mb-3">
                <div className="flex-1">
                  <span className="block text-xs text-gray-500">Mã tour</span>
                  <span className="block">{order.sellable.code}</span>
                </div>
                <div className="w-32">
                  <span className="block text-xs text-gray-500">Ngày đặt</span>
                  <span className="block">{formatDate(order.sysFstUpdate)}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Giá tiền</span>
                  <span className="block text-red-600 font-[500]">{moneyFormatVND(order.totalAmount)}</span>
                </div>
                <div className="w-40 text-right hidden">
                  {order.paymentStatus === PaymentStatus.DEPOSITED ? (
                    <Tag color="blue" bordered={false}>
                      Đã cọc
                    </Tag>
                  ) : order.paymentStatus === PaymentStatus.NOTPAID ? (
                    <Tag color="red" bordered={false}>
                      Chưa thanh toán
                    </Tag>
                  ) : order.paymentStatus === PaymentStatus.PAID ? (
                    <Tag color="green" bordered={false}>
                      Đã Thanh toán
                    </Tag>
                  ) : (
                    "Unknown"
                  )}
                </div>
              </div>
              <div className="order-item__bottom flex justify-between">
                <div className="flex items-center gap-x-6">
                  <div className="depart-colcation">
                    <span className="block text-xs text-gray-500">Điểm khởi hành</span>
                    <span className="block">{order.template?.depart?.name_vi}</span>
                  </div>
                  <div className="depart-date flex gap-x-6 mr-6">
                    <div>
                      <span className="block text-xs text-gray-500">Ngày khởi hành</span>
                      <span>{dayjs(order.sellable.startDate).format("DD/MM/YYYY")}</span>
                    </div>
                    <SwapOutlined />
                    <div>
                      <span className="block text-xs text-gray-500">Ngày về</span>
                      <span>{dayjs(order.sellable.endDate).format("DD/MM/YYYY")}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/customer/order/${order.recId}`} className="text-blue-600">
                  <Space>
                    Chi tiết <IconArrowRightCircle className="w-4 h-4" />
                  </Space>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
