import { Spinner } from "@heroui/spinner";
import React from "react";

const Loading = ({
  message,
  icon,
}: {
  message?: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  return (
    <div className="h-screen bg-slate-900/10 z-[999] fixed inset-0 backdrop-blur flex items-center justify-center flex-col gap-2 font-bold">
      {message && message} {icon || <Spinner size="lg" />}
    </div>
  );
};

export default Loading;
