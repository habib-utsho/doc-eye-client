import Container from "@/src/components/ui/Container";
import Slider from "@/src/components/ui/Slider";
import { getAllDoctors } from "@/src/services/doctor";
import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";
import DoctorCard from "../_components/DoctorCard";
import { TDoctor } from "@/src/types/user";

const SpecialtyPage = async ({ params }: { params: { slug: string } }) => {
  // console.log(params.slug, "slug");
  const doctors = await getAllDoctors([
    // { name: "specialty", value: params.slug },
  ]);

  // console.log(doctors, "doctors");

  return (
    <div className="py-8">
      <Container className="grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-slate-100 dark:bg-slate-900 p-4 rounded-md space-y-3 md:space-y-4">
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
          <CheckboxGroup
            label="Availability"
            defaultValue={[
              "online_now",
              "available_today",
              "available_in_next_three_days",
            ]}
          >
            <Checkbox value="online_now">Online Now</Checkbox>
            <Checkbox value="available_today">Available Today</Checkbox>
            <Checkbox value="available_in_next_three_days">
              Available in next 3 days
            </Checkbox>
            <Checkbox value="available_in_next_seven_days">
              Available in next 7 days
            </Checkbox>
            <Checkbox value="female_doctors_only">Female Doctors Only</Checkbox>
            <Checkbox value="male_doctors_only">Male Doctors Only</Checkbox>
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
        <div className="col-span-12 md:col-span-9 flex flex-col gap-4">
          {doctors?.data?.map((doctor: TDoctor, ind: number) => (
            <DoctorCard key={ind} doctor={doctor} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SpecialtyPage;
