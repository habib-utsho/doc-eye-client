import React from "react";

const Empty = ({
  description,
  className,
  onClick,
}: {
  description: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} h-[300px] flex items-center justify-center`}
    >
      <div className=" shadow dark:shadow-white text-center p-4 rounded-md w-[250px] mx-auto font-semibold">
        {description}
      </div>
    </div>
  );
};

export default Empty;
