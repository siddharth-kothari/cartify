import React from "react";

const AddressesPage = ({ params }: any) => {
  const { slug } = params;
  return <div>{slug}</div>;
};

export default AddressesPage;
