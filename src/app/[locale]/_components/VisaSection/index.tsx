"use client";
import React from "react";
import Image from "next/image";
import classNames from "classnames";
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

const DATA = [
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
interface VisaSectionProps {
  label?: string;
}
const VisaSection = ({ label }: VisaSectionProps) => {
  return (
    <section className="visa container mx-auto px-3 md:px-6 lg:px-8">
      <div className="bg-white rounded-lg">
        <div className="head-section pt-6 px-4 mb-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-[500] uppercase">{label}</h3>
        </div>

        <div className="visa-list flex flex-wrap pb-6 px-4">
          {DATA.map((visa, _index) => (
            <div
              className={classNames("visa-group md:w-1/3 w-1/2 lg:mb-0 lg:w-1/5", {
                "mb-6": DATA.length - 1 !== _index,
              })}
              key={visa.key}
            >
              <div className="group-head mb-3">
                <h4 className="font-semibold text-red-600">{visa.name}</h4>
              </div>
              <ul className="group-items">
                {visa.items.map((item, _index) => (
                  <li
                    className={classNames("flex items-center py-2 hover:bg-slate-100 cursor-pointer px-2 rounded-md", {
                      "mt-2": _index === 0,
                    })}
                    key={_index}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      width={30}
                      height={30}
                      className="w-6 h-6 mr-2 rounded-full"
                    />
                    <span className="font-[500]">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default VisaSection;
