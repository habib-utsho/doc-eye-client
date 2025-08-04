import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Radio, RadioGroup } from "@heroui/radio";
import { Slider } from "@heroui/slider";
import React from "react";

type TDoctorFilterSidebar = {
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
  availability: string;
  setAvailability: React.Dispatch<React.SetStateAction<string>>;
};
const DoctorFilerSidebar = ({
  selectedGender,
  setSelectedGender,
  availability,
  setAvailability,
}: TDoctorFilterSidebar) => {
  return (
    <div className="col-span-12 sm:col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 p-4 rounded-md space-y-3 md:space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="flat"
          className="text-primary-500 dark:text-white font-semibold"
        >
          RESET
        </Button>
      </div>

      <Slider />
      <RadioGroup
        label="Availability"
        defaultValue="default"
        onChange={(e) => setAvailability(e.target.value)}
        value={availability}
      >
        <Radio value="default"> All Time (Default)</Radio>
        <Radio value="online_now">Online Now</Radio>
        <Radio value="available_today">Available Today</Radio>
        <Radio value="available_in_next_three_days">
          Available in next 3 days
        </Radio>
        <Radio value="available_in_next_seven_days">
          Available in next 7 days
        </Radio>
      </RadioGroup>

      <CheckboxGroup label="Filter by Doctor Gender">
        <Checkbox
          value="Female"
          isSelected={selectedGender?.includes("Female")}
          onChange={(e) =>
            selectedGender.includes(e.target.value)
              ? setSelectedGender(
                  selectedGender.filter((g) => g !== e.target.value)
                )
              : setSelectedGender([...selectedGender, e.target.value])
          }
        >
          Female Doctors Only
        </Checkbox>
        <Checkbox
          value="Male"
          isSelected={selectedGender?.includes("Male")}
          onChange={(e) =>
            selectedGender.includes(e.target.value)
              ? setSelectedGender(
                  selectedGender.filter((g) => g !== e.target.value)
                )
              : setSelectedGender([...selectedGender, e.target.value])
          }
        >
          Male Doctors Only
        </Checkbox>
      </CheckboxGroup>

      <RadioGroup label="Sort By" defaultValue="relevance">
        <Radio value="relevance">Relevance (Default)</Radio>
        <Radio value="popularity">Popularity</Radio>
        <Radio value="low_to_high">Low to High (Fees)</Radio>
        <Radio value="high_to_low">High to Low (Fees)</Radio>
        <Radio value="rating">Rating</Radio>
        <Radio value="experience">Experience</Radio>
      </RadioGroup>
    </div>
  );
};

export default DoctorFilerSidebar;
