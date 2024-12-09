import AboutUs from "@/src/components/modules/homepage/AboutUs";
import AppSection from "@/src/components/modules/homepage/AppSection";
import Banner from "@/src/components/modules/homepage/Banner";
import EasyStep from "@/src/components/modules/homepage/EasyStep";
import FAQ from "@/src/components/modules/homepage/FAQ";
import Services from "@/src/components/modules/homepage/Services";
import WhyChooseUs from "@/src/components/modules/homepage/WhyChooseUs";
import WhyUseDocEye from "@/src/components/modules/homepage/WhyUseDocEye";

export default function Home() {
  return (
    <section className="flex flex-col justify-center ">
      <Banner />
      <WhyUseDocEye />
      <AboutUs />
      <WhyChooseUs />
      <Services />
      <AppSection />
      <EasyStep />
      <FAQ />
    </section>
  );
}
