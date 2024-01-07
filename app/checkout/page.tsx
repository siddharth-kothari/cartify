import Checkout from "@/Components/Checkout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const CheckoutPage = async () => {
  const session = await getServerSession();
  // //console.log("session", session);

  if (session == null) {
    redirect("/");
  }
  return <Checkout />;
};

export default CheckoutPage;
