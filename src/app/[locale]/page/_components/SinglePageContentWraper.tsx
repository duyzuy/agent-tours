import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { isEmpty } from "lodash";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { Link } from "@/utils/navigation";
import AreaContentHtml from "@/components/frontend/AreaContentHtml";
interface SinglePageContentWraperProps {
  children?: React.ReactNode;
  title?: string;
  desctiption?: string;
  data?: IPageContentDetail;
}
const SinglePageContentWraper: React.FC<SinglePageContentWraperProps> = ({ data }) => {
  return (
    <div className="single-page">
      <BreadCrumb
        classname="container mx-auto max-w-[1040px] px-4 md:px-6 lg:px-8 py-4"
        items={[{ title: data?.name }]}
      />
      <div className="single-page__inner container mx-auto max-w-[1040px] px-4 md:px-6 lg:px-8">
        <div className="sing-page__head mb-6">
          {data?.heroBanner ? (
            <div className="single-page__hero-image mb-6">
              <Image src={`${mediaConfig.rootApiPath}/${data?.heroBanner}`} alt="thumbnail" width={1000} height={400} />
            </div>
          ) : null}
          <h1 className="text-xl md:text-2xl lg:text-3xl">{data?.name}</h1>
        </div>
        <div className="single-page__body mb-16">
          <AreaContentHtml content={data?.descriptions} />

          {data?.children && data.children.length ? (
            <>
              <div className="line mb-6 mt-6 bg-gray-100 h-[1px]"></div>
              <div className="single-page__childs grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {data.children.map((pContent) => (
                  <div className="content-card" key={pContent.id}>
                    <div className="content-card__inner">
                      <div className="content-card__thumbnail relative w-full pt-[55.25%] overflow-hidden rounded-md">
                        {pContent.thumbnail.small && !isEmpty(pContent.thumbnail.small) ? (
                          <Image
                            src={`${mediaConfig.rootApiPath}/${pContent.thumbnail.small}`}
                            alt={pContent.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="no-image">no image</div>
                        )}
                      </div>
                      <div className="pt-3">
                        <Link href={`/page/${pContent.slug}`}>
                          <h3 className="text-gray-600 font-[500] hover:text-primary-default">{pContent.name}</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SinglePageContentWraper;
