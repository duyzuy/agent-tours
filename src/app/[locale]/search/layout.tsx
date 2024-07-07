import { SITE_NAME } from "@/configs/site";
import { LangCode } from "@/models/management/cms/language.interface";
interface PageProps {
  params: { locale: LangCode };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  return {
    title: `Search | ${SITE_NAME}`,
  };
}

export default async function SearchLayout({ children }: { children: React.ReactNode; params: Record<string, any> }) {
  return <>{children}</>;
}
