import Empty from "@/src/components/shared/Empty";
import { getSpecialty } from "@/src/services/specialty";
import { TSpecialty } from "@/src/types/specialty";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import React from "react";

const SpecialtySection = async () => {
  const specialty = await getSpecialty();

  return (
    <>
      {specialty?.data?.length === 0 ? (
        <Empty description="No specialty found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {specialty.data?.map((item: TSpecialty) => {
            return (
              <Link
                href={`/specialty/${item?._id}`}
                className="flex items-center gap-5 shadow dark:shadow-white p-4 rounded-md"
              >
                <figure className="">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    isBlurred
                    className="max-w-[50px] rounded-md"
                  />
                </figure>
                <div>
                  <h2 className={`text-lg font-bold`}>{item.name}</h2>
                  <Tooltip content={item.description}>
                    <p className="line-clamp-3">{item.description}</p>
                  </Tooltip>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SpecialtySection;
