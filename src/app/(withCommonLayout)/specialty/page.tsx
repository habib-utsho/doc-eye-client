import ErrorBoundary from "@/src/components/ErrorBoundary";
import { title } from "@/src/components/primitives";
import Container from "@/src/components/ui/Container";
import React, { Suspense } from "react";
import SpecialtySection from "./_components/SpecialtySection";
import SpecialtyLoadingCard from "./_components/SpecialtyLoadingCard";
import SpecialtyErrorCard from "./_components/SpecialtyErrorCard";

const SpecialtyPage = async () => {
  return (
    <div className="py-8">
      <Container className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary drop-shadow-lg md:mb-4">
          Select a specialty
        </h2>
        <ErrorBoundary fallback={<SpecialtyErrorCard />}>
          <Suspense fallback={<SpecialtyLoadingCard />}>
            <SpecialtySection />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </div>
  );
};

export default SpecialtyPage;
