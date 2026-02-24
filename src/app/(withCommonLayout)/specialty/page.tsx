import ErrorBoundary from "@/src/components/ErrorBoundary";
import Container from "@/src/components/ui/Container";
import React, { Suspense } from "react";
import SpecialtySection from "./_components/SpecialtySection";
import SpecialtyLoadingCard from "./_components/SpecialtyLoadingCard";
import SpecialtyErrorCard from "./_components/SpecialtyErrorCard";
import { getSpecialties } from "@/src/services/specialty";
import MyInp from "@/src/components/ui/Form/MyInp";
import SpecialtySearchInp from "./_components/SpecialtySearchInp";

const SpecialtyPage = async ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  const searchParamsRes = await searchParams;
  console.log({ searchParamsRes });

  const specialties = await getSpecialties([
    { name: "limit", value: 500000 },
    { name: "isDeleted", value: false },
    ...(searchParamsRes?.searchTerm
      ? [{ name: "searchTerm", value: searchParamsRes?.searchTerm }]
      : []),
  ]);
  return (
    <div className="py-8">
      <Container className="space-y-8">
        <div className="flex justify-between flex-wrap flex-col sm:flex-row gap-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary drop-shadow-lg md:mb-4">
            Select a specialty
          </h2>
          <SpecialtySearchInp />
        </div>

        {searchParamsRes?.searchTerm && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Showing results for:</span>
            <span className="font-semibold">{searchParamsRes?.searchTerm}</span>
          </div>
        )}

        <ErrorBoundary fallback={<SpecialtyErrorCard />}>
          <Suspense fallback={<SpecialtyLoadingCard />}>
            <SpecialtySection specialties={specialties?.data} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </div>
  );
};

export default SpecialtyPage;
