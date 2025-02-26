import React from "react";

const DoctorCheckout = ({ params }: { params: { slug: string } }) => {
  console.log({ params });
  return <div>This is doctor checkout page</div>;
};

export default DoctorCheckout;
