import { getTranslations } from "next-intl/server";
import { getOrderDetail } from "../../_actions/customer";
import { unstable_setRequestLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import type { Metadata, ResolvingMetadata } from "next";
import { PaymentStatus } from "@/models/common.interface";
import { Tag } from "antd";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { notFound } from "next/navigation";

import PassengerOrderInformation from "../../_components/PassengerOrderInformation";
import DepositeTimeLine from "./_components/DepositeTimeLine";
import ContactInformationBox from "./_components/ContactInformationBox";
import FormOfPaymentList from "../../_components/FormOfPaymentList";
import InvoiceBox from "./_components/InvoiceBox";

export async function generateMetadata(
  { params }: { params: { locale: LangCode; orderId: number } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const orderDetail = await getOrderDetail(params.orderId);
  return {
    title: orderDetail?.bookingOrder?.template?.name,
    // keywords: pageContent?.metaKeyword,
    // description: pageContent?.metaDescription,
    // openGraph: {
    //   images: nextImage,
    //   description: pageContent?.metaDescription,
    // },
  };
}

export default async function CustomerOrderDetailPage({ params }: { params: { locale: LangCode; orderId: number } }) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("String");
  const c = await getTranslations("Customer");

  const orderDetail = await getOrderDetail(params.orderId);

  if (!orderDetail) {
    notFound();
  }

  const { bookingOrder, passengers, bookingOrderId, ssrBookings } = orderDetail;

  return (
    <>
      <div className="box-info mb-6">
        <h1 className="text-xl flex items-center font-[500] mb-6">{`#${bookingOrderId} - ${bookingOrder.template.name}`}</h1>
        <div className="customer-info mb-3">
          <h3 className="font-[500] text-[16px] mb-3">Thông tin tour</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs">Mã tour</div>
              <div>{`#${bookingOrder.sellable.code}`}</div>
            </div>
            <div>
              <div className="text-xs">Thời gian đặt</div>
              <div>{formatDate(bookingOrder.sysFstUpdate)}</div>
            </div>
            <div>
              {bookingOrder.paymentStatus === PaymentStatus.DEPOSITED ? (
                <Tag color="blue" bordered={false}>
                  Đã cọc
                </Tag>
              ) : bookingOrder.paymentStatus === PaymentStatus.NOTPAID ? (
                <Tag color="red" bordered={false}>
                  Chưa thanh toán
                </Tag>
              ) : bookingOrder.paymentStatus === PaymentStatus.PAID ? (
                <Tag color="green" bordered={false}>
                  Đã Thanh toán
                </Tag>
              ) : (
                "Unknown"
              )}
            </div>
            <div>
              <div className="text-xs">Điểm khởi hành</div>
              <div>{bookingOrder.template.depart?.name_vi}</div>
            </div>
            <div>
              <div className="text-xs">Ngày khởi hành</div>
              <div>{formatDate(bookingOrder.sellable.startDate)}</div>
            </div>
            <div>
              <div className="text-xs">Ngày về</div>
              <div>{formatDate(bookingOrder.sellable.endDate)}</div>
            </div>

            <div>
              <div className="text-xs">Tổng tiền</div>
              <div className="text-red-600 font-[500]">{moneyFormatVND(bookingOrder.totalAmount)}</div>
            </div>
            <div>
              <div className="text-xs">Đã thanh toán</div>
              <div className="text-emerald-600 font-[500]">{moneyFormatVND(bookingOrder.totalPaid)}</div>
            </div>
          </div>
        </div>
        <DepositeTimeLine
          title="Các giai đoạn cần thực hiện thanh toán"
          items={orderDetail.rulesAndPolicies.depositTimelimits}
          paymentStatus={orderDetail.bookingOrder.paymentStatus}
        />

        <ContactInformationBox
          bookingOrderId={bookingOrder.recId}
          custAddress={bookingOrder.custAddress}
          custEmail={bookingOrder.custEmail}
          custPhoneNumber={bookingOrder.custPhoneNumber}
          custName={bookingOrder.custName}
          rmk={bookingOrder.rmk}
          className="border-b mb-3 pb-3"
        />

        <InvoiceBox
          title="Thông tin xuất hoá đơn"
          bookingOrderId={bookingOrder.recId}
          invoiceName={bookingOrder.invoiceName}
          invoiceCompanyName={bookingOrder.invoiceCompanyName}
          invoiceAddress={bookingOrder.invoiceAddress}
          invoiceTaxCode={bookingOrder.invoiceTaxCode}
          invoiceEmail={bookingOrder.invoiceEmail}
          className="border-b mb-3 pb-3"
        />
        <PassengerOrderInformation
          bookingOrderId={bookingOrder.recId}
          title="Thông tin khách"
          items={passengers}
          className="mb-6"
          startDate={bookingOrder.sellable.startDate}
        />
        {/* <OrderServiceList title="Thông tin dịch vụ" items={ssrBookings} className="mb-6" /> */}
        <FormOfPaymentList title="Thông tin thanh toán" items={orderDetail.fops} />
      </div>
    </>
  );
}
