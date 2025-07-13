import dynamic from "next/dynamic";
import { IconScrollText, IconCalendarCheck, IconBookMark, IconFileText } from "@/assets/icons";
import BlockPanels, { BlockPanelsProps } from "@/components/frontend/TabsBlockContentPanel/BlockPanels";
import { FeTemplateContentResponse } from "@/models/fe/templateContent.interface";
import { getVisaTemplateDetail } from "@/actions/visa.action";
import { getTranslations } from "next-intl/server";
import { getPageContentDetail } from "@/actions/pageContent";
import { LangCode } from "@/models/management/cms/language.interface";
import { getTravelInformationNotice } from "@/actions/product.action";
import IconDock from "@/assets/icons/IconDock";

const CustomTabsDynamic = dynamic(() => import("@/components/frontend/CustomTabs"), {
  loading: () => <ProductTourInformationsSkeleton />,
  ssr: false,
});

interface TourInformationsProps {
  data?: FeTemplateContentResponse["result"][0];
  locale: LangCode;
  templateId: number;
  log?: any;
}
export default async function TourInformations({ data, log, locale, templateId }: TourInformationsProps) {
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

  /**
   * GET visa
   */
  if (visaTemplates && visaTemplates.length) {
    const visaTemplateDetailResponse = await getVisaTemplateDetail({
      lang: visaTemplates[0].lang,
      id: visaTemplates[0].id,
    });

    const { result } = visaTemplateDetailResponse || {};
    const visaContent = result && result.length ? result[0].visaContent : undefined;

    const blockVisaItems = visaContent?.metaContent.reduce<Required<BlockPanelsProps>["items"]>((acc, item, _index) => {
      return [...acc, { content: item.content, name: item.title, key: (_index + 1).toString() }];
    }, []);

    tabPanels = [
      ...tabPanels,
      {
        label: "Thủ tục xin Visa",
        key: "visaService",
        icon: <IconDock />,
        children: <BlockPanels descriptions={visaContent?.content} items={blockVisaItems ?? []} />,
      },
    ];
  }

  /**
   * GET page detail rule
   * page id in vn 1124 - en 1125
   *
   */

  const pageContentDetailRule = await getPageContentDetail({ id: locale === LangCode.VI ? 1124 : 1125 });

  if (pageContentDetailRule) {
    tabPanels = [
      ...tabPanels,
      {
        label: "Điều kiện hoàn huỷ",
        key: "pageContentRule",
        icon: <IconFileText />,
        children: <BlockPanels descriptions={pageContentDetailRule.descriptions} items={[]} />,
      },
    ];
  }

  const travelInformation = await getTravelInformationNotice(templateId, locale);

  if (travelInformation && travelInformation.length) {
    tabPanels = [
      ...tabPanels,
      {
        label: "Lưu ý",
        key: "travelInformationNotice",
        icon: <IconBookMark />,
        children: (
          <BlockPanels
            items={travelInformation.map((item, _index) => ({
              key: (_index + 1).toString(),
              name: item.name,
              content: item.descriptions,
            }))}
          />
        ),
      },
    ];
  }

  return (
    <div className="tour-informations flex flex-col gap-6">
      {tabPanels.map((tab) => (
        <div className="panel-item">
          <div className="panel-item__head flex items-center gap-4 text-primary-default mb-4">
            <div className="w-10 h-10 bg-primary-default/10 rounded-full inline-flex items-center justify-center">
              {tab.icon}
            </div>
            <h3 className="text-2xl font-[500]">{tab.label}</h3>
          </div>
          <div className="panel-item__content">{tab.children}</div>
        </div>
      ))}
    </div>
  );
}

export const ProductTourInformationsSkeleton = () => {
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
