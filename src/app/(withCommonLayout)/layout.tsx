import Footer from "@/src/components/shared/Footer";
import { Navbar } from "@/src/components/shared/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
