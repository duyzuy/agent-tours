import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { DATA } from "./data";

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
