import React from "react";
import {
  subtitle as mySubtitle,
  title as myTitle,
} from "../../components/primitives";

interface TProps {
  subTitle?: string;
  title: string;
}
const CommonSectionTitle = ({ subTitle, title }: TProps) => {
  return (
    <div className="space-y-3">
      {subTitle && (
        <p className="text-primary pl-11 font-bold relative before:w-10 before:h-[2px] before:bg-[#09528C] before:absolute before:left-0 before:top-1/2">
          {subTitle}
        </p>
      )}
      <h2 className={`${myTitle()}`}>{title}</h2>
    </div>
  );
};

export default CommonSectionTitle;
