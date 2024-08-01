import dynamic from "next/dynamic";
import { IconScrollText, IconCalendarCheck, IconCalendarPlus, IconClipboard } from "@/assets/icons";
import BlockPanels, { BlockPanelsProps } from "@/components/frontend/TabsBlockContentPanel/BlockPanels";
import { FeTemplateContentResponse } from "@/models/fe/templateContent.interface";
import { getVisaTemplateDetail } from "@/app/[locale]/visa/_actions/getVisaTemplateDetail";
import { getTranslations } from "next-intl/server";

const CustomTabsDynamic = dynamic(() => import("@/components/frontend/CustomTabs"), {
  loading: () => <ProductTourTabsContentSkeleton />,
  ssr: false,
});

interface ProductContentProps {
  data?: FeTemplateContentResponse["result"][0];
  log?: any;
}
export default async function ProductContent({ data, log }: ProductContentProps) {
  const t = await getTranslations("String");

  const { visaTemplates } = data || {};

  const tourInformationsListContent = data?.includeAndNotes?.metaContent.reduce<
    { content: string; key: string; name: string }[]
  >((acc, item, _index) => {
    return [
      ...acc,
      {
        name: item.title,
        content: item.content,
        key: (_index + 1).toString(),
      },
    ];
  }, []);

  const tourScheduleContent = data?.itineraries?.metaContent.reduce<{ content: string; key: string; name: string }[]>(
    (acc, item, _index) => {
      return [
        ...acc,
        {
          name: item.title,
          content: item.content,
          key: (_index + 1).toString(),
        },
      ];
    },
    [],
  );

  let tabPanels = [
    {
      label: `Thông tin tour`,
      key: "tourInformation",
      icon: <IconScrollText />,
      children: <BlockPanels descriptions={data?.includeAndNotes?.content} items={tourInformationsListContent ?? []} />,
    },
    {
      label: "Lịch trình tour",
      key: "tourSchedule",
      icon: <IconCalendarCheck />,
      children: <BlockPanels descriptions={data?.itineraries?.content} items={tourScheduleContent ?? []} />,
    },
  ];

  console.log({ visaTemplates });
  if (visaTemplates && visaTemplates.length) {
    const visaTemplateDetailResponse = await getVisaTemplateDetail({
      lang: visaTemplates[0].lang,
      slug: visaTemplates[0].slug,
    });

    const { result } = visaTemplateDetailResponse || {};
    const visaContent = result && result.length ? result[0].visaContent : undefined;

    const blockVisaItems = visaContent?.metaContent.reduce<BlockPanelsProps["items"]>((acc, item, _index) => {
      return [...acc, { content: item.content, name: item.title, key: (_index + 1).toString() }];
    }, []);

    tabPanels = [
      ...tabPanels,
      {
        label: "Thủ tục xin Visa",
        key: "visaService",
        icon: <IconClipboard />,
        children: <BlockPanels descriptions={visaContent?.content} items={blockVisaItems ?? []} />,
      },
    ];
  }

  return <CustomTabsDynamic defaultActiveKey="tourInformation" tabBarGutter={30} items={tabPanels} />;
}

export const ProductTourTabsContentSkeleton = () => {
  return (
    <div className="tour-skeleton-tabs-content mt-6">
      <div className="animate-pulse">
        <div className="gap-3 space-y-3">
          <div className="bg-slate-100 rounded-md h-3 w-full"></div>
          <div className="bg-slate-100 rounded-md h-3 w-full"></div>
          <div className="bg-slate-100 rounded-md h-3 w-full"></div>
          <div className="bg-slate-100 rounded-md h-3 w-[85%]"></div>
        </div>
      </div>
    </div>
  );
};
