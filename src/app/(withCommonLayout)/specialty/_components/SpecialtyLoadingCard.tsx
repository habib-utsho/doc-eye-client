import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const SpecialtyLoadingCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
        return <Skeleton className="h-[132px] shadow rounded-md" />;
      })}
    </div>
  );
};

export default SpecialtyLoadingCard;
