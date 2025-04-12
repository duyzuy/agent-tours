import { ElementType } from "react";

export enum LangCode {
  VI = "vi",
  EN = "en",
}
export interface Locale {
  key: LangCode;
  name: string;
  nativeName: string;
  shortName: string;
  icon: ElementType;
}
