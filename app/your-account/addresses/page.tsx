import Address from "@/Components/Address";
import { getAddresses } from "@/utils/functions";
import { getServerSession } from "next-auth";
import React from "react";

const AddressesPage = async () => {
  const session = await getServerSession();
  // //console.log("session", session);

  const addresses = await getAddresses(session?.user.email);
  return <Address addresses={addresses} />;
};

export default AddressesPage;
