import React from "react";

type TContainer = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<TContainer> = ({ children, className }) => {
  return (
    <div
      className={`max-w-[1250px] mx-4 sm:mx-8 md:mx-12 xl:mx-auto px-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
