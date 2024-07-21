import { MenuPositionType } from "@/models/management/cms/menu.interface";

export const MENU_POSITION_LIST: { name: string; key: MenuPositionType }[] = [
  {
    key: "primary",
    name: "Header",
  },
  {
    key: "secondary",
    name: "Header secondary",
  },
  {
    key: "footer",
    name: "Footer",
  },
  {
    key: "mobile",
    name: "Mobile menu",
  },
  {
    key: "footer-info",
    name: "Footer information",
  },
];
