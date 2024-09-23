import React from "react";

const Empty = ({ description }: { description: string }) => {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <div className=" shadow dark:shadow-white text-center p-4 rounded-md w-[250px] mx-auto font-semibold">
        {description}
      </div>
    </div>
  );
};

export default Empty;
