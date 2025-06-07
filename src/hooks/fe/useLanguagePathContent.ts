import { useLanguageSelector } from "@/store";
import { usePathname, useParams } from "next/navigation";
import { Locale } from "@/models/management/cms/language.interface";
import { isArray } from "lodash";

enum PageContentType {
  Page = "page",
  Information = "information",
  News = "news",
  Tour = "tour",
  Post = "post",
  Category = "category",
}

const useLanguagePathContent = () => {
  const { page: pageContent, tour: tourContent, category: categoryContent, post: postContent } = useLanguageSelector();

  const pathname = usePathname();
  const params = useParams();

  const getPathname = (locale: Locale): string => {
    const langCode = locale.key;

    let newPathname = "";
    const pageContentType = pathname.split("/").slice(2, 3).join() as PageContentType;

    switch (pageContentType) {
      case PageContentType.Page: {
        const itemNextLang = pageContent.find((item) => item.lang === langCode);
        if (itemNextLang) {
          newPathname = [PageContentType["Page"], itemNextLang.slug].join("/");
        }
        break;
      }

      case PageContentType.Tour: {
        const templateContentslug = isArray(params.slug) ? params.slug.slice(0, 2).join("/") : params.slug;
        const itemTourContent = tourContent.find((item) => item.lang === langCode);
        if (itemTourContent) {
          newPathname = PageContentType["Tour"].concat("/", `${templateContentslug}/${itemTourContent.slug}`);
        }
        break;
      }
      case PageContentType.Category: {
        const itemNextLang = categoryContent.find((item) => item.lang === langCode);
        if (itemNextLang) {
          newPathname = PageContentType["Category"].concat("/", itemNextLang.slug);
        }
      }
      case PageContentType.Post: {
        const itemNextLang = postContent.find((item) => item.lang === langCode);

        if (itemNextLang) {
          newPathname = PageContentType["Post"].concat("/", itemNextLang.slug);
        }
      }
    }

    newPathname = langCode.concat("/", newPathname);
    return newPathname;
  };
  return {
    getPathname,
  };
};
export { useLanguagePathContent };
