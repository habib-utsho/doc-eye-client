import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Radio, RadioGroup } from "@heroui/radio";
import { Slider } from "@heroui/slider";
import React from "react";
import { Sidebar } from "react-pro-sidebar";

type TDoctorFilterSidebar = {
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
  availability: string;
  setAvailability: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};
const DoctorFilerSidebar = ({
  selectedGender,
  setSelectedGender,
  availability,
  setAvailability,
  sort,
  setSort,
}: TDoctorFilterSidebar) => {
  return (
    <div className="col-span-12 sm:col-span-4 lg:col-span-3 bg-slate-100 dark:bg-slate-900 p-4 rounded-md space-y-3 md:space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="flat"
          className="text-primary-500 dark:text-white font-semibold"
          onPress={() => {
            setSelectedGender([]);
            setAvailability("default");
            setSort("default");
          }}
        >
          RESET
        </Button>
      </div>

      {/* TODO: Add price slider */}
      {/* <Slider /> */}

      <RadioGroup
        label="Availability"
        defaultValue="default"
        onChange={(e) => setAvailability(e.target.value)}
        value={availability}
      >
        <Radio value="default"> All Time (Default)</Radio>
        <Radio value="available_today">Available Today</Radio>
        <Radio value="available_in_next_three_days">
          Available in next 3 days
        </Radio>
        <Radio value="available_in_next_seven_days">
          Available in next 7 days
        </Radio>
        <Radio value="online_now" isDisabled>
          Online Now <span className="text-primary font-bold">[upcoming]</span>
        </Radio>
      </RadioGroup>

      <CheckboxGroup label="Filter by Doctor Gender" value={selectedGender}>
        <Checkbox
          value="Female"
          // isSelected={selectedGender?.includes("Female")}
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
          // isSelected={selectedGender?.includes("Male")}
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

      <RadioGroup
        label="Sort By"
        onChange={(e) => setSort(e.target.value)}
        value={sort}
        defaultValue="default"
      >
        <Radio value="default">Relevance (Default)</Radio>
        <Radio value="-patientAttended">Popularity</Radio>
        <Radio value="consultationFee">Low to High (Fees)</Radio>
        <Radio value="-consultationFee">High to Low (Fees)</Radio>
        <Radio value="-totalExperienceYear">Experience</Radio>
      </RadioGroup>
    </div>
  );
};

export default DoctorFilerSidebar;
