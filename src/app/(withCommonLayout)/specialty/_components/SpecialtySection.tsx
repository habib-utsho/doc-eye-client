import Empty from "@/src/components/shared/Empty";
import { TSpecialty } from "@/src/types/specialty";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import Link from "next/link";
import React from "react";
import MyMotion from "@/src/components/ui/MyMotion";

const SpecialtySection = ({ specialties }: { specialties: TSpecialty[] }) => {
  return (
    <>
      {specialties?.length === 0 ? (
        <Empty description="No specialty found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {specialties.map((item: TSpecialty, index: number) => (
            <MyMotion
              key={item._id}
              y={25}
              delay={0.05 + index * 0.04}
              aria-label={`${item.name} specialty card`}
            >
              <Link
                href={`/specialty/${item._id}`}
                className="h-full group flex items-center gap-5 border p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition duration-400 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <figure>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    isBlurred
                    className="w-[52px] h-[52px] object-cover rounded-md ring-1 ring-primary/20 group-hover:ring-primary/40 transition"
                  />
                </figure>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-primary line-clamp-1">
                    {item.name}
                  </h2>
                  <Tooltip content={item.description}>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </Tooltip>
                </div>
              </Link>
            </MyMotion>
          ))}
        </div>
      )}
    </>
  );
};

export default SpecialtySection;
