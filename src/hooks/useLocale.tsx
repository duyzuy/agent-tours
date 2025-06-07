import { Locale } from "@/models/management/cms/language.interface";
import { useState } from "react";

export const useLocale = (defaultLc?: Locale) => {
  const [locale, setLocale] = useState<Locale | undefined>(defaultLc);

  return { locale, setLocale };
};
