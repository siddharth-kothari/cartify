import ThankYou from "@/Components/ThankYou";
import React from "react";

const SuccessPage = ({ searchParams }: any) => {
  const { order_id: orderno } = searchParams;
  //console.log("data", orderno);
  return <ThankYou orderno={orderno} />;
};

export default SuccessPage;
