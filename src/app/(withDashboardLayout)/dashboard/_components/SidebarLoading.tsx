import { Link } from "@heroui/link";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const SidebarLoading = () => {
  return (
    <div className="h-screen bg-gray-100 rounded-r-md w-[200px] sticky top-0 left-0">
      <Link href={"/"} className="text-lg text-center pt-4 pb-2 block">
        Doc Eye
      </Link>
      {
        <ul className="rounded mt-4 mb-2 px-2">
          {[1, 2, 3, 4, 5, 6, 7].map((elem) => {
            return (
              <li
                key={elem}
                className="bg-gray-200 hover:bg-primary hover:text-white transition-all duration-500 text-black border-y border-gray-50 text-sm "
              >
                <Skeleton className={"block p-5 px-3 rounded-md"} />
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default SidebarLoading;
