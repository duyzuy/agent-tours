import React from "react";
import Image from "next/image";
import classNames from "classnames";
const DATA = [
  {
    key: "asia",
    name: "Châu Á",
    items: [
      {
        key: "vietnam",
        name: "Visa Việt Nam",
        thumbnail: "/assets/images/flag-vietnam.png",
      },
      {
        key: "korean",
        name: "Visa Hàn Quốc",
        thumbnail: "/assets/images/flag-korean.png",
      },
      {
        key: "japan",
        name: "Visa Nhật Bản",
        thumbnail: "/assets/images/flag-japan.png",
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
        thumbnail: "/assets/images/flag-anhquoc.png",
      },
      {
        key: "phap",
        name: "Visa Pháp",
        thumbnail: "/assets/images/flag-phap.png",
      },
      {
        key: "duc",
        name: "Visa Đức",
        thumbnail: "/assets/images/flag-duc.png",
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
        thumbnail: "/assets/images/flag-anhquoc.png",
      },
      {
        key: "canada",
        name: "Visa Canada",
        thumbnail: "/assets/images/flag-canada.png",
      },
      {
        key: "cuba",
        name: "Visa Cuba",
        thumbnail: "/assets/images/flag-cuba.png",
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
        thumbnail: "/assets/images/flag-maroc.png",
      },
      {
        key: "namphi",
        name: "Visa Nam Phi",
        thumbnail: "/assets/images/flag-namphi.png",
      },
      {
        key: "sudan",
        name: "Visa Sudan",
        thumbnail: "/assets/images/flag-sudan.png",
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
        thumbnail: "/assets/images/flag-newzeland.png",
      },
      {
        key: "ucc",
        name: "Visa Úc",
        thumbnail: "/assets/images/flag-uc.png",
      },
      {
        key: "marryland",
        name: "Visa Marryland",
        thumbnail: "/assets/images/flag-marryland.png",
      },
    ],
  },
];
const VisaSection = () => {
  return (
    <section className="visa container mx-auto px-4 md:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="head-section pt-6 px-4 mb-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-[500]">Danh mục Visa / Passport</h3>
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
                    <Image src={item.thumbnail} alt={item.name} width={30} height={30} className="w-6 h-6 mr-2" />
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
