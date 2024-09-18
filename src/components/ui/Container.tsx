import React from "react";

type TContainer = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<TContainer> = ({ children, className }) => {
  return (
    <div
      className={`container mx-auto max-w-7xl px-6 2xl::px-0 flex-grow ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
