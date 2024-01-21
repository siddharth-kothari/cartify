import ThankYou from "@/Components/ThankYou";
import VerifyPayment from "@/utils/VerifyPayment";
import React from "react";

const SuccessPage = async ({ searchParams }: any) => {
  const { order_id: orderno } = searchParams;
  // ////console.log("status", orderno);
  const status = await VerifyPayment(orderno);

  // ////console.log("status", status);
  return <ThankYou orderno={orderno} status={status} />;
};

export default SuccessPage;
