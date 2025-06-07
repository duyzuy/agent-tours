import {
  flagVi,
  flagVn,
  flagKr,
  flagJp,
  flagGbEng,
  flagFr,
  flagGe,
  flagCa,
  flagUs,
  flagEg,
  flagCu,
  flagMr,
  flagSa,
  flagSd,
  flagNe,
  flagAu,
  flagMl,
} from "@/assets/flags";
export const DATA = [
  {
    key: "asia",
    name: "Châu Á",
    items: [
      {
        key: "vietnam",
        name: "Visa Việt Nam",
        thumbnail: flagVn,
      },
      {
        key: "korean",
        name: "Visa Hàn Quốc",
        thumbnail: flagKr,
      },
      {
        key: "japan",
        name: "Visa Nhật Bản",
        thumbnail: flagJp,
      },
    ],
  },
  {
    key: "eu",
    name: "Châu Âu",
    items: [
      {
        key: "anhquoc",
        name: "Visa Anh Quốc",
        thumbnail: flagGbEng,
      },
      {
        key: "phap",
        name: "Visa Pháp",
        thumbnail: flagFr,
      },
      {
        key: "duc",
        name: "Visa Đức",
        thumbnail: flagGe,
      },
    ],
  },
  {
    key: "chaumy",
    name: "Châu Mỹ",
    items: [
      {
        key: "anhquoc",
        name: "Visa Mỹ",
        thumbnail: flagEg,
      },
      {
        key: "canada",
        name: "Visa Canada",
        thumbnail: flagCa,
      },
      {
        key: "cuba",
        name: "Visa Cuba",
        thumbnail: flagCu,
      },
    ],
  },
  {
    key: "chauphi",
    name: "Châu Phi",
    items: [
      {
        key: "maroc",
        name: "Visa Maroc",
        thumbnail: flagMr,
      },
      {
        key: "namphi",
        name: "Visa Nam Phi",
        thumbnail: flagSa,
      },
      {
        key: "sudan",
        name: "Visa Sudan",
        thumbnail: flagSd,
      },
    ],
  },
  {
    key: "chauuc",
    name: "Châu Úc",
    items: [
      {
        key: "newzeland",
        name: "Visa Newzealand",
        thumbnail: flagNe,
      },
      {
        key: "ucc",
        name: "Visa Úc",
        thumbnail: flagAu,
      },
      {
        key: "marryland",
        name: "Visa Marryland",
        thumbnail: flagMl,
      },
    ],
  },
];
