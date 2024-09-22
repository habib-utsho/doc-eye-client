import Empty from "@/src/components/shared/Empty";
import { TSpecialty } from "@/src/types/specialty";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import React from "react";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getSpecialty = async () => {
  //   throw new Error("Something went wrong!");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/specialty?page=1&limit=9`
  );
  return res.json();
};

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
                    src={item.logo}
                    alt={item.name}
                    isBlurred
                    width={200}
                    height={80}
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
