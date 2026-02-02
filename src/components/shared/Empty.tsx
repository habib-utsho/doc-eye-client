import React from "react";
import { Inbox } from "lucide-react";

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
      className={`${className} h-[300px] flex items-center justify-center px-4`}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-dashed border-gray-300 bg-gradient-to-b from-white to-gray-50 p-6 text-center shadow-sm transition dark:border-gray-700 dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Inbox className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {description}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          There is nothing to show here right now.
        </p>
      </div>
    </div>
  );
};

export default Empty;