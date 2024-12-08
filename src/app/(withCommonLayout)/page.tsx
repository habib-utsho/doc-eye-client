import AboutUs from "@/src/components/modules/homepage/AboutUs";
import Banner from "@/src/components/modules/homepage/Banner";
import WhyUseDocEye from "@/src/components/modules/homepage/WhyUseDocEye";

export default function Home() {
  return (
    <section className="flex flex-col justify-center ">
      <Banner />
      <WhyUseDocEye />
      <AboutUs />
    </section>
  );
}
