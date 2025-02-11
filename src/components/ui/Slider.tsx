"use client";
import { Slider as HeroSlider } from "@heroui/slider";
import { cn } from "@heroui/theme";
import React from "react";

const Slider = () => {
  return (
    <HeroSlider
      classNames={{
        base: "max-w-md gap-3",
        filler:
          "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
      }}
      defaultValue={[100, 3000]}
      formatOptions={{ style: "currency", currency: "BDT" }}
      label="Consultation Fee"
      minValue={100}
      maxValue={5000}
      renderThumb={({ index, ...props }) => (
        <div
          {...props}
          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
        >
          <span
            className={cn(
              "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
              index === 0
                ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600"
                : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800"
            )}
          />
        </div>
      )}
      size="md"
      step={100}
    />
  );
};

export default Slider;
