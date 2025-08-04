import Container from "@/src/components/ui/Container";
import { getAllDoctors } from "@/src/services/doctor";
import React from "react";
import FilteredDoctorList from "../_components/FilteredDoctorList";

const SpecialtyPage = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug, "slug");

  // TODO: Need here pagination or infinite scroll
  const doctors = await getAllDoctors([
    { name: "medicalSpecialties", value: params.slug },
  ]);

  console.log(doctors, "doctors");

  return (
    <div className="py-8">
      <Container>
        <FilteredDoctorList
          initialDoctors={doctors?.data || []}
          specialtySlug={params.slug}
        />
      </Container>
    </div>
  );
};

export default SpecialtyPage;
