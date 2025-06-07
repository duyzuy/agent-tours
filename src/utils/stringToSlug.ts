import { removeVietnameseTones } from "./helper";
export const stringToSlug = (str: string) => {
  const strNoneVietNamese = removeVietnameseTones(str);
  return strNoneVietNamese
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
