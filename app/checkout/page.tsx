import Checkout from "@/Components/Checkout";
import { getAddresses } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Cartify",
  description: "",
};

const CheckoutPage = async () => {
  const session = await getServerSession();
  // ////console.log("session", session);

  if (session == null) {
    redirect("/");
  }

  const addresses = await getAddresses(session?.user.email);
  return <Checkout addresses={addresses} />;
};

export default CheckoutPage;
