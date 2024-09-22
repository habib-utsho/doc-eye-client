import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const SpecialtyLoadingCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {[...Array(9)].map(() => {
        return (
          <div className="flex items-center gap-5 shadow dark:shadow-white p-4 rounded-md">
            <Skeleton className="w-[70px] h-[80px] shadow rounded-md" />
            <div className="space-y-2">
              <Skeleton className="w-[80px] h-[15px] shadow rounded-md" />
              <Skeleton className="w-[150px] h-[25px] shadow rounded-md" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialtyLoadingCard;
