import { TSpecialty } from "@/src/types/specialty";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { spec } from "node:test/reporters";
import React from "react";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getSpecialty = async () => {
  await delay(6000);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/specialty`);
  return res.json();
};

const SpecialtySection = async () => {
  const specialty = await getSpecialty();

  console.log(specialty);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {specialty.data?.map((item: TSpecialty) => {
        return (
          <Link
            href={`/specialty/${item?._id}`}
            className="flex justify-between items-center gap-5 shadow p-4 rounded-md"
          >
            <div>
              <Image
                src={item.logo}
                alt={item.name}
                width={260}
                height={80}
                isBlurred
              />
            </div>
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
  );
};

export default SpecialtySection;
