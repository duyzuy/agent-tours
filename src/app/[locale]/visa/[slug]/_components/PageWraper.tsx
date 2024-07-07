import { VisaDetailsByLangResponse } from "@/models/fe/visa.interface";
import BlockPanels from "@/components/frontend/TabsBlockContentPanel/BlockPanels";
import AreaContentHtml from "@/components/frontend/AreaContentHtml";
import BoxSearchTourFe from "@/app/[locale]/_components/BoxSearchTourFe";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
interface PageWraperProps {
  data: VisaDetailsByLangResponse["result"][0];
}
const PageWraper: React.FC<PageWraperProps> = ({ data }) => {
  const panelItems = data.visaContent.metaContent.reduce<{ key: string; name: string; content: string }[]>(
    (acc, pItem, _index) => {
      return [...acc, { key: (_index + 1).toString(), name: pItem.title, content: pItem.content }];
    },
    [],
  );
  return (
    <div className="single__page">
      <div className="py-8 bg-gray-100 mb-6">
        <div className="search">
          <BoxSearchTourFe />
        </div>
      </div>
      <div className="single__page-inner visa container mx-auto pb-12 pt-4 px-4 lg:px-8 md:px-6">
        <BreadCrumb
          items={[
            {
              title: data.name,
            },
          ]}
        />
        <div className="post__page-head py-4">
          <h1 className="text-xl text-primary-default font-[500]">{data.name}</h1>
        </div>
        <div className="post__page-body">
          <div className="flex flex-wrap -mx-3">
            <div className="col-left w-7/12 px-3">
              {/* <AreaContentHtml content={data.subContent} /> */}
              <div className="content-block">
                <BlockPanels descriptions={data.visaContent.content} items={panelItems} />
              </div>
            </div>
            <div className="col-left w-5/12 px-3">
              <div>
                <div className="box border rounded-lg px-4 py-4">
                  <div className="head py-3">
                    <p className="text-red-600 font-[500]">Vì sao chọn An Thái Travel</p>
                  </div>
                  <ul className="list-disc pl-5">
                    <li>Thủ tục đơn giản.</li>
                    <li>Thông tin minh bạch, công khai.</li>
                    <li>Dịch vụ tận tâm, hỗ trợ nhiệt tình sau làm visa.</li>
                    <li>Dịch vụ tận tâm, hỗ trợ nhiệt tình sau làm visa.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageWraper;
