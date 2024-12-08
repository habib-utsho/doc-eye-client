import { ErrorIcon } from "@/src/components/ui/icons";
import React from "react";

const SpecialtyErrorCard = () => {
  return (
    <div className="h-[180px] w-full rounded-md shadow-md bg-red-50 text-red-500 flex items-center justify-center gap-2">
      <ErrorIcon />
      Something went wrong!
    </div>
  );
};

export default SpecialtyErrorCard;
