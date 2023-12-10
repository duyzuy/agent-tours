import React from "react";
import classNames from "classnames";
import TourCard from "@/components/frontend/TourCard";
import SliderTourItems from "@/components/frontend/SliderTourItems";

interface Props {
    className?: string;
}
const TourRelateds: React.FC<Props> = ({ className = "" }) => {
    return (
        <div
            className={classNames("tour", {
                [className]: className,
            })}
        >
            <div className="header py-3 mb-3">
                <h4 className="text-2xl font-semibold text-primary-default">
                    Tour Liên Quan
                </h4>
            </div>
            <div className="tour-list">
                <SliderTourItems />
            </div>
        </div>
    );
};
export default TourRelateds;
