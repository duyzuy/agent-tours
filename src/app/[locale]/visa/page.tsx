import { redirect } from "next/navigation";
import { localeDefault } from "@/constants/locale.constant";
export default async function page() {
  redirect(`/${localeDefault.key}`);
}
