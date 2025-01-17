import { Spinner } from "@heroui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen bg-slate-900/10 z-[999] fixed inset-0 backdrop-blur flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
