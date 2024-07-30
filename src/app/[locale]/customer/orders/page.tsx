import { getTranslations } from "next-intl/server";
import { getOrderList } from "../_actions/customer";
import dayjs from "dayjs";
import { Link } from "@/utils/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import type { Metadata, ResolvingMetadata } from "next";

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
        <div className="mb-6">
          <h1 className="text-xl flex items-center font-[500]">
            <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
            {c("subPage.orders.title")}
          </h1>
        </div>
        <div className="orders-list">
          {orderList?.map((order) => (
            <div className="order-item border mb-3 px-4 py-3 rounded-md" key={order.recId}>
              <div className="order-item__inner">
                <div className="order-item__top flex items-center gap-4 lg:gap-6 mb-3 pb-3 border-b">
                  <div className="w-16">
                    <span className="block text-xs text-gray-500">#ID</span>
                    <span className="block font-[500]">{order.recId}</span>
                  </div>
                  <div className="w-16">
                    <span className="block text-xs text-gray-500">Mã tour</span>
                    <span className="block">{order.template_minimal.code}</span>
                  </div>
                  <div className="flex-1">
                    <span className="block text-xs text-gray-500">Tên tour</span>
                    <span className="block">{order.template_minimal.name}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Ngày đặt</span>
                    <span className="block">{dayjs(order.sysFstUpdate).format("DD/MM/YYYY")}</span>
                  </div>
                </div>
                <div className="order-item__bottom">
                  <div className="flex items-center gap-x-6">
                    <div>
                      <div>Khởi hành</div>
                      <span>{dayjs(order.sellable_minimal.startDate).format("DD/MM/YYYY")}</span>
                    </div>
                    <div>
                      <div>Ngày về</div>
                      <span>{dayjs(order.sellable_minimal.endDate).format("DD/MM/YYYY")}</span>
                    </div>
                  </div>
                  <Link href={"/"}>
                    <span className="text-primary-default">Chi tiết</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
