// app/specialty/[slug]/_components/FilteredDoctorList.tsx
"use client";

import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { TDoctor } from "@/src/types/user";
import { getAllDoctors } from "@/src/services/doctor";
import DoctorFilerSidebar from "./DoctorFilterSidebar";

interface Props {
  initialDoctors: TDoctor[];
  specialtySlug: string;
}

const FilteredDoctorList = ({ initialDoctors, specialtySlug }: Props) => {
  const [doctors, setDoctors] = useState<TDoctor[]>(initialDoctors);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>("default");

  useEffect(() => {
    const fetchFilteredDoctors = async () => {
      const filters = [
        { name: "medicalSpecialties", value: specialtySlug },
        ...(selectedGender.length == 1
          ? [{ name: "gender", value: selectedGender[0] }]
          : []),
        ...(availability != "default"
          ? [{ name: "availability", value: availability }]
          : []),
      ];


      const res = await getAllDoctors(filters);
      setDoctors(res?.data || []);
    };

    fetchFilteredDoctors();
  }, [selectedGender, availability, specialtySlug]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <DoctorFilerSidebar
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        availability={availability}
        setAvailability={setAvailability}
      />
      <div className="col-span-12 sm:col-span-8 lg:col-span-9 flex flex-col gap-4">
        {doctors?.length === 0 ? (
          <div className="text-gray-500 font-semibold">
            No doctors found for the selected filters.
          </div>
        ) : (
          doctors.map((doctor, i) => <DoctorCard key={i} doctor={doctor} />)
        )}
      </div>
    </div>
  );
};

export default FilteredDoctorList;
